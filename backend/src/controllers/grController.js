import sapService from "../services/sapService.js";

export const getGoodsReceipts = async (req, res, next) => {
  try {
    const { vendorId } = req.params;
    const grList = await sapService.getGr(vendorId);

    return res.json({ success: true, data: grList });
  } catch (error) {
    next(error);
  }
};
