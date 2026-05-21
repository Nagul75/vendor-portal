import sapService from "../services/sapService.js";

export const getProfile = async (req, res, next) => {
  try {
    const { vendorId } = req.params;
    const profile = await sapService.getProfile(vendorId);

    return res.json({ success: true, data: profile });
  } catch (error) {
    next(error);
  }
};
