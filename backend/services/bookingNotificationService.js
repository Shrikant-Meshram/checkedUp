import { sendWhatsAppSmart } from "./whatsappService.js";
import User from "../models/User.js";
import logger from "../Utils/logger.js";

// Booking/User phone is a bare 10-digit Indian number ([6-9]XXXXXXXXXX).
// Meta Graph API expects country code prefixed (91XXXXXXXXXX).
const formatIndiaPhone = (phone) => {
  if (!phone) return null;
  const digits = String(phone).replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) return digits;
  if (digits.length === 10) return `91${digits}`;
  return null;
};

// Fire-and-forget: a WhatsApp outage must never break a booking save/response.
const safeSend = async (phone, { templateName, bodyParams, fallbackText }) => {
  const to = formatIndiaPhone(phone);
  if (!to) {
    logger.warn(`WhatsApp skipped: invalid/missing phone "${phone}"`);
    return;
  }
  try {
    await sendWhatsAppSmart(to, { templateName, bodyParams, fallbackText });
  } catch (err) {
    logger.error(
      `WhatsApp send failed to ${to}: ${err.response?.data ? JSON.stringify(err.response.data) : err.message}`
    );
  }
};

const getAdminPhones = async () => {
  const admins = await User.find({ role: "admin" }).select("phone");
  return admins.map((a) => a.phone).filter(Boolean);
};

const bookingFields = (booking) => ({
  bookingId: String(booking.reportId || booking._id),
  patientName: booking.patientName || "N/A",
  dateTime: `${booking.bookingDate || "TBD"} ${booking.bookingTime || ""}`.trim(),
  amount: booking.totalAmount != null ? String(booking.totalAmount) : "N/A",
});

/**
 * New booking received.
 * Notifies: assigned lab owner (if any) + all admins. No patient message.
 */
export const notifyBookingCreated = async (booking, labOwnerPhone) => {
  try {
    const { bookingId, patientName, dateTime, amount } = bookingFields(booking);

    if (labOwnerPhone) {
      await safeSend(labOwnerPhone, {
        templateName: "booking_created_lab",
        bodyParams: [bookingId, patientName, dateTime, amount],
        fallbackText: `🧪 New Booking Assigned to Your Lab\n\nBooking ID: ${bookingId}\nPatient: ${patientName}\nDate: ${dateTime}\nAmount: Rs.${amount}\n\nPlease assign a lab assistant to proceed.`,
      });
    }

    const labStatus = labOwnerPhone
      ? "Auto-assigned"
      : "No lab found within 10 km — manual assignment needed";
    const adminPhones = await getAdminPhones();
    await Promise.all(
      adminPhones.map((p) =>
        safeSend(p, {
          templateName: "booking_created_admin",
          bodyParams: [bookingId, patientName, dateTime, amount, labStatus],
          fallbackText: `🆕 New Booking Received\n\nBooking ID: ${bookingId}\nPatient: ${patientName}\nDate: ${dateTime}\nAmount: Rs.${amount}\nLab: ${labStatus}`,
        })
      )
    );
  } catch (err) {
    logger.error(`notifyBookingCreated failed: ${err.message}`);
  }
};

/**
 * Admin re-assigned the booking to a different lab.
 * Notifies: new lab owner only.
 */
export const notifyLabAssigned = async (booking, labOwnerPhone, labOwnerName) => {
  try {
    const { bookingId, patientName, dateTime, amount } = bookingFields(booking);

    if (labOwnerPhone) {
      await safeSend(labOwnerPhone, {
        templateName: "lab_assigned_owner",
        bodyParams: [bookingId, patientName, dateTime, amount, labOwnerName || "Lab"],
        fallbackText: `🧪 Booking Assigned to Your Lab (${labOwnerName || "Lab"})\n\nBooking ID: ${bookingId}\nPatient: ${patientName}\nDate: ${dateTime}\nAmount: Rs.${amount}\n\nPlease assign a lab assistant to proceed.`,
      });
    }
  } catch (err) {
    logger.error(`notifyLabAssigned failed: ${err.message}`);
  }
};

/**
 * Lab assistant assigned to a booking.
 * Notifies: the assistant only.
 */
export const notifyAssistantAssigned = async (booking, assistantPhone, assistantName) => {
  try {
    const { bookingId, patientName, dateTime } = bookingFields(booking);
    const address = `${booking.address || ""}, ${booking.city || ""} - ${booking.pincode || ""}`;

    if (assistantPhone) {
      await safeSend(assistantPhone, {
        templateName: "assistant_assigned",
        bodyParams: [bookingId, patientName, dateTime, address, booking.phone || "N/A"],
        fallbackText: `👤 New Assignment!\n\nYou have been assigned a home-collection visit.\n\nBooking ID: ${bookingId}\nPatient: ${patientName}\nDate: ${dateTime}\nAddress: ${address}\nPhone: ${booking.phone || "N/A"}\n\nPlease reach on time and collect the sample.`,
      });
    }
  } catch (err) {
    logger.error(`notifyAssistantAssigned failed: ${err.message}`);
  }
};

/**
 * Report uploaded / booking completed.
 * Notifies: lab owner + all admins. No patient message.
 */
export const notifyReportReady = async (booking, labOwnerPhone) => {
  try {
    const { bookingId, patientName, dateTime } = bookingFields(booking);

    if (labOwnerPhone) {
      await safeSend(labOwnerPhone, {
        templateName: "report_ready_lab",
        bodyParams: [bookingId, patientName, dateTime],
        fallbackText: `📄 Report Uploaded\n\nBooking ID: ${bookingId}\nPatient: ${patientName}\nDate: ${dateTime}\n\nStatus: Completed`,
      });
    }

    const adminPhones = await getAdminPhones();
    await Promise.all(
      adminPhones.map((p) =>
        safeSend(p, {
          templateName: "report_ready_admin",
          bodyParams: [bookingId, patientName, dateTime],
          fallbackText: `📄 Report Ready\n\nBooking ID: ${bookingId}\nPatient: ${patientName}\nDate: ${dateTime}\n\nStatus: Completed`,
        })
      )
    );
  } catch (err) {
    logger.error(`notifyReportReady failed: ${err.message}`);
  }
};
