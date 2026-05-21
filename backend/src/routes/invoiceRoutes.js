import express from "express";
import { getInvoices, downloadInvoicePdf } from "../controllers/invoiceController.js";
import validateVendorId from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:vendorId", validateVendorId, getInvoices);
router.get("/pdf/:invoiceDoc", downloadInvoicePdf);

export default router;
