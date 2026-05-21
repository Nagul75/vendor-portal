import sapService from "../services/sapService.js";

export const getRfqs = async (req, res, next) => {
  try {
    const { vendorId } = req.params;
    const rfqList = await sapService.getRfq(vendorId);

    return res.json({ success: true, data: rfqList });
  } catch (error) {
    next(error);
  }
};
