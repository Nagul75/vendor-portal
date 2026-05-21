import sapService from "../services/sapService.js";

export const getMemoList = async (req, res, next) => {
  try {
    const { vendorId } = req.params;
    const memoList = await sapService.getMemo(vendorId);

    return res.json({ success: true, data: memoList });
  } catch (error) {
    next(error);
  }
};
