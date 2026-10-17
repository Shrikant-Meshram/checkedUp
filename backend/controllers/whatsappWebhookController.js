// import express from "express";
// import dotenv from "dotenv";
// dotenv.config();

// const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN;

// // Meta webhook verification
// export const verifyWebhook = (req, res) => {
//   const mode = req.query["hub.mode"];
//   const token = req.query["hub.verify_token"];
//   const challenge = req.query["hub.challenge"];

//   if (mode === "subscribe" && token === VERIFY_TOKEN) {
//     console.log("WhatsApp webhook verified successfully");

//     return res.status(200).send(challenge);
//   }

//   console.log("WhatsApp webhook verification failed");

//   return res.sendStatus(403);
// };


// // Receive WhatsApp events
// export const receiveWebhook = (req, res) => {
//   console.log(
//     "WhatsApp Webhook:",
//     JSON.stringify(req.body, null, 2)
//   );

//   // Always acknowledge Meta quickly
//   res.sendStatus(200);
// };


import dotenv from "dotenv";
import { sendWhatsAppText } from "../services/whatsappService.js";

dotenv.config();

const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN;

// GET → Meta verification
export const verifyWebhook = (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("WhatsApp webhook verified successfully");

    return res.status(200).send(challenge);
  }

  console.log("WhatsApp webhook verification failed");

  return res.sendStatus(403);
};


// POST → Receive WhatsApp messages
export const receiveWebhook = async (req, res) => {

  console.log(
    "[WhatsApp Webhook] RAW BODY:",
    JSON.stringify(req.body, null, 2)
  );

  // Always acknowledge Meta immediately
  res.sendStatus(200);

  try {

    const entry = req.body?.entry?.[0];

    const changes = entry?.changes?.[0];

    const value = changes?.value;

    const messages = value?.messages;

    // No incoming message
    if (!messages || messages.length === 0) {
      console.log("[WhatsApp Webhook] No messages in payload");
      return;
    }

    const message = messages[0];

    console.log("[WhatsApp Webhook] Message type:", message.type);

    // Only process text messages
    if (message.type !== "text") {
      console.log("[WhatsApp Webhook] Ignoring non-text message");
      return;
    }

    const from = message.from;

    const text = message.text?.body?.trim().toLowerCase();

    console.log("[WhatsApp Webhook] From:", from);
    console.log("[WhatsApp Webhook] Text:", text);

    if (!text) return;

    const reply = getAutoReply(text);

    console.log("[WhatsApp Webhook] Auto-reply:", reply ? reply.substring(0, 50) + "..." : "NONE");

    if (reply) {
      const result = await sendWhatsAppText(from, reply);
      console.log("[WhatsApp Webhook] Reply sent successfully:", JSON.stringify(result));
    }

  } catch (error) {

    console.error(
      "[WhatsApp Webhook] ERROR:",
      error.response?.data || error.message
    );

  }
};

// Auto-reply rules
const GREETING_PATTERN = /^(hi|hii+|hello+|hey+|hola|yo|namaste|namaskar|salam|salaam|good\s*(morning|afternoon|evening|night)|gm+|gn+|howdy|how\s*r(u|you)|kaise\s*ho|kya\s*haal|what's?\s*up|wassup|sup|heya+)\b[\s!.?]*$/i;

const GREETING_REPLY = "Hello! 👋 Welcome to our lab testing service.\n\nHow can I help you today?\n\nYou can:\n• Book a test\n• Check your booking status\n• Get your report\n• Ask any question";

const RULES = [
  {
    pattern: GREETING_PATTERN,
    reply: GREETING_REPLY,
  },
  {
    pattern: /^(bye+|goodbye|see\s*you|alvida|khuda\s*hafiz|take\s*care|tc)\b[\s!.?]*$/i,
    reply: "Thank you for reaching out! 😊 Stay healthy. Goodbye!",
  },
  {
    pattern: /^(thanks?|thank\s*you|shukriya|dhanyavad|thanks?\s*a\s*lot|thankyou+)\b[\s!.?]*$/i,
    reply: "You're welcome! 😊 Is there anything else I can help you with?",
  },
  {
    pattern: /^(book|booking|book\s*(a\s*)?test|test\s*book|appointment|schedule)\b/i,
    reply: "Great! To book a test:\n\n1. Open our website\n2. Go to Tests or Packages\n3. Select a test and click Book\n4. Fill in your details\n5. Confirm your booking\n\nYou will get a booking confirmation on WhatsApp. 🧪",
  },
  {
    pattern: /^(report|reports|my\s*report|result|results|download\s*report)\b/i,
    reply: "You can view and download your report here:\n\n1. Open our website\n2. Log in to your account\n3. Go to My Reports\n4. Click on your report to view or download\n\nYou will also get a WhatsApp message when your report is ready. 📄",
  },
  {
    pattern: /^(status|where|track|tracking|update|kab\s*takega|kitna\s*time|when|delivery)\b/i,
    reply: "You can check your booking status here:\n\n1. Open our website\n2. Log in to your account\n3. Go to My Bookings\n4. See the live status of your booking\n\nStatus flow: Pending → Assigned → Sample Collected → Processing → Report Ready → Completed\n\nNeed more help? Just ask! 📍",
  },
  {
    pattern: /^(price|cost|rate|fee|charges|kitna|paisa|payment|pay|upi|cash)\b/i,
    reply: "Payment is collected at your doorstep by our lab assistant.\n\nYou can pay by:\n• UPI (scan QR code)\n• Cash\n\nFor pricing, please check the test/package page on our website. 💰",
  },
  {
    pattern: /^(cancel|reschedule|change\s*date|postpone|stop)\b/i,
    reply: "To cancel or reschedule your booking:\n\n1. Open our website\n2. Log in to your account\n3. Go to My Bookings\n4. Open the booking\n5. Click Cancel or Reschedule\n\nNote: Cancellation/reschedule is not allowed after the booking is Completed.\n\nNeed help? Just ask! 📅",
  },
  {
    pattern: /^(help|support|problem|issue|error|not\s*working|madad|sahayata)\b/i,
    reply: "I'm here to help! 😊\n\nPlease tell me your issue in detail, or choose an option:\n• Booking help\n• Report help\n• Payment help\n• Other issue\n\nYou can also call our support team for urgent help. 🛟",
  },
];

const getAutoReply = (text) => {
  for (const rule of RULES) {
    if (rule.pattern.test(text)) {
      return rule.reply;
    }
  }
  // Default reply for any other message
  return "Thank you for your message! 😊\n\nI've received your message and our team will get back to you soon.\n\nIf you need immediate help, please call our support number.\n\nYou can also ask about:\n• Booking a test\n• Your report\n• Booking status\n• Payment options";
};