import {
  cubiclesMockData,
  getCubicleOccupancy,
} from "../data/cubiclesMockData";

const useMockData = import.meta.env.VITE_USE_MOCK_DATA !== "false";

export async function getStudentDashboardData() {
  if (useMockData) {
    await new Promise((resolve) => window.setTimeout(resolve, 300));

    return {
      cubicles: cubiclesMockData,
      occupancy: getCubicleOccupancy(cubiclesMockData),
      updatedAt: new Date().toISOString(),
    };
  }

  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  const response = await fetch("/api/cubicles/status", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "No fue posible consultar el estado de los cubículos.",
    );
  }

  const cubicles = Array.isArray(data.cubicles) ? data.cubicles : [];

  return {
    cubicles,
    occupancy: data.occupancy || getCubicleOccupancy(cubicles),
    updatedAt: data.updatedAt || new Date().toISOString(),
  };
}
