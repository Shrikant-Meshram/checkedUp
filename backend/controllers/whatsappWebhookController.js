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
    "WhatsApp Webhook:",
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
      return;
    }

    const message = messages[0];

    // Only process text messages
    if (message.type !== "text") {
      return;
    }

    const from = message.from;

    const text = message.text?.body?.trim().toLowerCase();

    console.log("Incoming message from:", from);
    console.log("Message:", text);

    if (text === "hi" || text === "hello" || text === "hey") {

      await sendWhatsAppText(
        from,
        "Hello! 👋 How can I help you?"
      );

    }

  } catch (error) {

    console.error(
      "Webhook processing error:",
      error.response?.data || error.message
    );

  }
};