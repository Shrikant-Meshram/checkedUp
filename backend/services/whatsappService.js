// import axios from "axios";
// import dotenv from "dotenv";
// dotenv.config();

// const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
// const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;

// const GRAPH_API_VERSION = "v25.0";

// export const sendWhatsAppTemplate = async (to) => {
//   const url = `https://graph.facebook.com/${GRAPH_API_VERSION}/${PHONE_NUMBER_ID}/messages`;

//   try {
//     const response = await axios.post(
//       url,
//       {
//         messaging_product: "whatsapp",
//         to,
//         type: "template",
//         template: {
//           name: "hello_world",
//           language: {
//             code: "en_US"
//           }
//         }
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${ACCESS_TOKEN}`,
//           "Content-Type": "application/json"
//         }
//       }
//     );

//     console.log("WhatsApp message sent:", response.data);

//     return response.data;
//   } catch (error) {
//     console.error(
//       "WhatsApp API error:",
//       error.response?.data || error.message
//     );

//     throw error;
//   }
// }


import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;

const GRAPH_API_VERSION = "v26.0";

export const sendWhatsAppText = async (to, message) => {
  const url =
    `https://graph.facebook.com/${GRAPH_API_VERSION}` +
    `/${PHONE_NUMBER_ID}/messages`;

  try {
    const response = await axios.post(
      url,
      {
        messaging_product: "whatsapp",
        to: to,
        type: "text",
        text: {
          body: message
        }
      },
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("WhatsApp text sent:", response.data);

    return response.data;

  } catch (error) {
    console.error(
      "WhatsApp API error:",
      error.response?.data || error.message
    );

    throw error;
  }
};