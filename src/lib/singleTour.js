export async function getSingleTour(id) {
  const res = await fetch("http://localhost:3000/tourData.json");
  const tours = await res.json();

  return tours.find((tour) => tour.id === parseInt(id));
}