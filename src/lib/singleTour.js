export async function getSingleTour(id) {
  const res = await fetch("https://tour-management-system-team-ultimat-lovat.vercel.app/tourData.json");
  const tours = await res.json();

  return tours.find((tour) => tour.id === parseInt(id));
}