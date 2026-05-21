import sapService from "../services/sapService.js";

export const login = async (req, res, next) => {
  try {
    const { vendorId, password } = req.body;

    if (!vendorId || !password) {
      return res.status(400).json({ success: false, message: "vendorId and password are required." });
    }

    await sapService.login(vendorId, password);

    return res.json({ success: true, data: { vendorId } });
  } catch (error) {
    next(error);
  }
};
