import sapAxios from "../config/sapConfig.js";

const parseODataResponse = (odataResponse) => {
  if (!odataResponse || typeof odataResponse !== "object") {
    return null;
  }

  if (odataResponse.d?.results) {
    return odataResponse.d.results;
  }

  if (odataResponse.d) {
    return odataResponse.d;
  }

  return odataResponse;
};

const handleAxiosError = (error) => {
  if (error.response) {
    const status = error.response.status;
    const message = error.response.data?.error?.message?.value || error.response.statusText || "SAP service returned an error.";
    const err = new Error(message);
    err.status = status;
    return err;
  }

  if (error.request) {
    const err = new Error("Unable to connect to SAP OData services.");
    err.status = 502;
    return err;
  }

  const err = new Error(error.message || "Unexpected SAP request error.");
  err.status = 500;
  return err;
};

const login = async (vendorId, password) => {
  try {
    const endpoint = `LoginSet(Lifnr='${vendorId}',Password='${password}')`;
    const response = await sapAxios.get(endpoint);
    const data = parseODataResponse(response.data);

    if (!data) {
      const error = new Error("Invalid login response from SAP.");
      error.status = 401;
      throw error;
    }

    return data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

const getProfile = async (vendorId) => {
  try {
    const endpoint = `ProfileSet(Lifnr='${vendorId}')`;
    const response = await sapAxios.get(endpoint);
    return parseODataResponse(response.data);
  } catch (error) {
    throw handleAxiosError(error);
  }
};

const getRfq = async (vendorId) => {
  try {
    const endpoint = `RFQSet?$filter=Lifnr eq '${vendorId}'`;
    const response = await sapAxios.get(endpoint);
    return parseODataResponse(response.data);
  } catch (error) {
    throw handleAxiosError(error);
  }
};

const getPo = async (vendorId) => {
  try {
    const endpoint = `POSet?$filter=Lifnr eq '${vendorId}'`;
    const response = await sapAxios.get(endpoint);
    return parseODataResponse(response.data);
  } catch (error) {
    throw handleAxiosError(error);
  }
};

const getGr = async (vendorId) => {
  try {
    const endpoint = `GRSet?$filter=Lifnr eq '${vendorId}'`;
    const response = await sapAxios.get(endpoint);
    return parseODataResponse(response.data);
  } catch (error) {
    throw handleAxiosError(error);
  }
};

const getInvoice = async (vendorId) => {
  try {
    const endpoint = `InvoiceSet?$filter=VendorId eq '${vendorId}'`;
    const response = await sapAxios.get(endpoint);
    return parseODataResponse(response.data);
  } catch (error) {
    throw handleAxiosError(error);
  }
};

const getPaymentAging = async (vendorId) => {
  try {
    const endpoint = `PaymentAgingSet?$filter=VendorId eq '${vendorId}'`;
    const response = await sapAxios.get(endpoint);
    return parseODataResponse(response.data);
  } catch (error) {
    throw handleAxiosError(error);
  }
};

const getMemo = async (vendorId) => {
  try {
    const endpoint = `MemoSet?$filter=VendorId eq '${vendorId}'`;
    const response = await sapAxios.get(endpoint);
    return parseODataResponse(response.data);
  } catch (error) {
    throw handleAxiosError(error);
  }
};

const getInvoicePdf = async (invoiceDoc) => {
  try {
    const endpoint = `InvoicePdfSet(InvoiceDoc='${invoiceDoc}')/$value`;
    const response = await sapAxios.get(endpoint, {
      responseType: "stream",
      headers: {
        Accept: "application/pdf",
      },
    });
    return response;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export default {
  login,
  getProfile,
  getRfq,
  getPo,
  getGr,
  getInvoice,
  getPaymentAging,
  getMemo,
  getInvoicePdf,
};
