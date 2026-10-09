import express from "express";
import { sendWhatsAppText } from "../services/whatsappService.js";
import dotenv from "dotenv";
dotenv.config();
const router = express.Router();



router.post("/test", async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({
        success: false,
        message: "Phone number is required"
      });
    }

    const result = await sendWhatsAppText(phone, "This is a test message.");

    res.json({
      success: true,
      message: "WhatsApp message sent",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to send WhatsApp message",
      error: error.response?.data || error.message
    });
  }
});

 export default router;