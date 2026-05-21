import sapService from "../services/sapService.js";

export const getInvoices = async (req, res, next) => {
  try {
    const { vendorId } = req.params;
    const invoices = await sapService.getInvoice(vendorId);

    return res.json({ success: true, data: invoices });
  } catch (error) {
    next(error);
  }
};

export const downloadInvoicePdf = async (req, res, next) => {
  try {
    const { invoiceDoc } = req.params;
    const sapResponse = await sapService.getInvoicePdf(invoiceDoc);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline; filename=invoice.pdf");

    sapResponse.data.pipe(res);
  } catch (error) {
    next(error);
  }
};
