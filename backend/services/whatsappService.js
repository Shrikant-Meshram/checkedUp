import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;

const GRAPH_API_VERSION = "v26.0";

const graphPost = async (payload) => {
  const url =
    `https://graph.facebook.com/${GRAPH_API_VERSION}` +
    `/${PHONE_NUMBER_ID}/messages`;

  const response = await axios.post(url, payload, {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

/**
 * Send a free-form text message.
 * Only works inside the 24-hour customer-service window
 * (i.e. after the recipient has messaged the business first).
 */
export const sendWhatsAppText = async (to, message) => {
  try {
    const data = await graphPost({
      messaging_product: "whatsapp",
      to,
      type: "text",
      text: { body: message },
    });

    console.log("WhatsApp text sent:", data);
    return data;
  } catch (error) {
    console.error(
      "WhatsApp API error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

/**
 * Send a pre-approved template message.
 * Works outside the 24-hour window (business-initiated messages).
 * Requires the template to be created & approved in Meta App Dashboard.
 *
 * @param {string} to         - Recipient phone (with country code, e.g. "919876543210")
 * @param {string} templateName - Name of the approved template
 * @param {string[]} bodyParams - Positional body parameters ({{1}}, {{2}}, ...)
 * @param {string} languageCode - Template language (default "en")
 */
export const sendWhatsAppTemplate = async (
  to,
  templateName,
  bodyParams = [],
  languageCode = "en"
) => {
  const payload = {
    messaging_product: "whatsapp",
    to,
    type: "template",
    template: {
      name: templateName,
      language: { code: languageCode },
    },
  };

  if (bodyParams.length > 0) {
    payload.template.components = [
      {
        type: "body",
        parameters: bodyParams.map((p) => ({
          type: "text",
          text: String(p),
        })),
      },
    ];
  }

  try {
    const data = await graphPost(payload);
    console.log("WhatsApp template sent:", data);
    return data;
  } catch (error) {
    console.error(
      "WhatsApp template API error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

/**
 * Try template first (production), fall back to free-form text (dev/test).
 * Never throws — logs and returns null on total failure.
 */
export const sendWhatsAppSmart = async (
  to,
  { templateName, bodyParams = [], fallbackText, languageCode = "en" }
) => {
  if (templateName) {
    try {
      return await sendWhatsAppTemplate(
        to,
        templateName,
        bodyParams,
        languageCode
      );
    } catch (templateErr) {
      console.warn(
        `Template "${templateName}" failed (${templateErr.response?.data?.error?.message || templateErr.message}), falling back to text`
      );
    }
  }

  if (fallbackText) {
    try {
      return await sendWhatsAppText(to, fallbackText);
    } catch (textErr) {
      console.error(
        "WhatsApp text fallback also failed:",
        textErr.response?.data || textErr.message
      );
    }
  }

  return null;
};
