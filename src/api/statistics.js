import userReq from "./axios-config";

export const getStatisticsOverview = (params = {}) => {
  return userReq.get("/statistics/overview", { params });
};

export const getRevenueByStatus = (params = {}) => {
  return userReq.get("/statistics/revenue-by-status", { params });
};

export const getRevenueOverTime = (params = {}) => {
  return userReq.get("/statistics/revenue-over-time", { params });
};

export const getInvoicesByStatus = (params = {}) => {
  return userReq.get("/statistics/invoices-by-status", { params });
};

export const getTopCustomers = (params = {}) => {
  return userReq.get("/statistics/top-customers", { params });
};

export const getRecentInvoices = (params = { limit: 10 }) => {
  return userReq.get("/statistics/recent-invoices", { params });
};

export const getInvoiceTrends = (params = {}) => {
  return userReq.get("/statistics/invoice-trends", { params });
};

