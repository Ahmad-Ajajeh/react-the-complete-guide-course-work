export async function fetchAvailablePlaces() {
  // the fetch function itself can throw an error
  // e.g if there was no network .
  const response = await fetch("http://localhost:3000/places");
  const data = await response.json();

  //ok ? 200 or 300
  //!ok ? 400 or 500
  if (!response.ok) {
    throw new Error("Failed to fetch places");
  }

  return data.places;
}

export async function updateUserPlaces(places) {
  const response = await fetch("http://localhost:3000/user-places", {
    method: "PUT",
    body: JSON.stringify({ places }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error("Failed to update user places ...");
  }

  return data.message;
}

export async function fetchUserPlaces() {
  const response = await fetch("http://localhost:3000/user-places");
  const data = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch user places");
  }

  return data.places;
}
