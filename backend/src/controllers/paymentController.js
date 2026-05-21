import sapService from "../services/sapService.js";

export const getPaymentAging = async (req, res, next) => {
  try {
    const { vendorId } = req.params;
    const agingData = await sapService.getPaymentAging(vendorId);

    return res.json({ success: true, data: agingData });
  } catch (error) {
    next(error);
  }
};
