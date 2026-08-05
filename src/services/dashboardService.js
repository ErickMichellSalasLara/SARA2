import { adminMockData } from "../data/adminMockData";

const useMockData = import.meta.env.VITE_USE_MOCK_DATA !== "false";

export async function getAdminDashboardData() {
  if (useMockData) {
    await new Promise((resolve) => window.setTimeout(resolve, 350));
    return adminMockData;
  }

  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  const response = await fetch("/api/dashboard/summary", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "No fue posible cargar el dashboard administrativo.",
    );
  }

  return data;
}
