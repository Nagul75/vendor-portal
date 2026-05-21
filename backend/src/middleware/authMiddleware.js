const validateVendorId = (req, res, next) => {
  const vendorId = req.params.vendorId || req.body.vendorId;

  if (!vendorId) {
    return res.status(400).json({ success: false, message: "Vendor ID is required." });
  }

  if (typeof vendorId !== "string" || !vendorId.trim()) {
    return res.status(400).json({ success: false, message: "Vendor ID must be a non-empty string." });
  }

  next();
};

export default validateVendorId;
