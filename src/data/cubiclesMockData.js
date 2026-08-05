export const cubiclesMockData = [
  {
    id: 1,
    name: "Oceania",
    location: "Planta baja",
    capacity: 8,
    status: "available",
    currentSchedule: null,
    nextReservation: "13:00 - 14:00",
  },
  {
    id: 2,
    name: "Asia",
    location: "Planta baja",
    capacity: 8,
    status: "occupied",
    currentSchedule: "10:00 - 11:30",
    nextReservation: null,
  },
  {
    id: 3,
    name: "Africa",
    location: "Planta baja",
    capacity: 8,
    status: "reserved",
    currentSchedule: null,
    nextReservation: "11:30 - 13:00",
  },
  {
    id: 4,
    name: "America",
    location: "Planta baja",
    capacity: 8,
    status: "maintenance",
    currentSchedule: null,
    nextReservation: null,
  },
];

export function getCubicleOccupancy(cubicles = cubiclesMockData) {
  return cubicles.reduce(
    (summary, cubicle) => {
      const status = String(cubicle.status).toLowerCase();

      if (Object.hasOwn(summary, status)) {
        summary[status] += 1;
      }

      return summary;
    },
    {
      occupied: 0,
      reserved: 0,
      available: 0,
      maintenance: 0,
    },
  );
}
