import express from "express";

const router = express.Router();

import {
  verifyWebhook,
  receiveWebhook
} from "../controllers/whatsappWebhookController.js";

// GET → Meta verification
router.get("/", verifyWebhook);

// POST → WhatsApp events
router.post("/", receiveWebhook);

export default router;