import {
  cubiclesMockData,
  getCubicleOccupancy,
} from "../data/cubiclesMockData";
import { apiRequest } from "./apiClient";

const useMockData = import.meta.env.VITE_USE_MOCK_DATA === "true";

export async function getStudentDashboardData() {
  if (useMockData) {
    await new Promise((resolve) => window.setTimeout(resolve, 300));

    return {
      cubicles: cubiclesMockData,
      occupancy: getCubicleOccupancy(cubiclesMockData),
      updatedAt: new Date().toISOString(),
    };
  }

  const data = await apiRequest("/api/cubicles/status");
  const cubicles = Array.isArray(data?.cubicles) ? data.cubicles : [];

  return {
    cubicles,
    occupancy: data?.occupancy || getCubicleOccupancy(cubicles),
    updatedAt: data?.updatedAt || new Date().toISOString(),
  };
}
