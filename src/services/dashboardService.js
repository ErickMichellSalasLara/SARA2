import { adminMockData } from "../data/adminMockData";
import { apiRequest } from "./apiClient";

const useMockData = import.meta.env.VITE_USE_MOCK_DATA === "true";

export async function getAdminDashboardData() {
  if (useMockData) {
    await new Promise((resolve) => window.setTimeout(resolve, 350));
    return adminMockData;
  }

  return apiRequest("/api/dashboard/summary");
}
