export const INVOICE_ID_PREFIX = "INV-";
export const CUSTOMER_ID_PREFIX = "CUS-";

export function sanitizeInvoiceID(id) {
  return sanitizeRecordID(INVOICE_ID_PREFIX, id);
}

export function sanitizeCustomerID(id) {
  return sanitizeRecordID(CUSTOMER_ID_PREFIX, id);
}

export function sanitizeRecordID(prefix = "", id = "") {
  try {
    let lastSectionOfUUID = id.split("-").at(-1);
    let newID = `${prefix}${lastSectionOfUUID.toUpperCase()}`;
    return newID;
  } catch {
    return null;
  }
}
