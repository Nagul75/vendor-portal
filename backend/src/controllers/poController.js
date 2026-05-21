import sapService from "../services/sapService.js";

export const getPurchaseOrders = async (req, res, next) => {
  try {
    const { vendorId } = req.params;
    const poList = await sapService.getPo(vendorId);

    return res.json({ success: true, data: poList });
  } catch (error) {
    next(error);
  }
};
