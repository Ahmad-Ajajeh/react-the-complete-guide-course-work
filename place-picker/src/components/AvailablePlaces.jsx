import { useState, useEffect } from "react";

import Places from "./Places.jsx";
import Error from "./Error.jsx";

import { useFetch } from "../hooks/useFetch.js";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from "../http.js";

async function fetchSortedPlaces() {
  const places = await fetchAvailablePlaces();

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        places,
        position.coords.latitude,
        position.coords.longitude
      );
      resolve(sortedPlaces);
    });
  });
}

export default function AvailablePlaces({ onSelectPlace }) {
  const {
    isFetching,
    error,
    fetchedData: availablePlaces,
  } = useFetch(fetchSortedPlaces, []);

  if (error) {
    return <Error title="An error occurred!" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching places data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}

// // when fetching data , it is SUPER COMMON to have
// // these following three states working together .
// const [availablePlaces, setAvailablePlaces] = useState([]);
// const [isFetching, setIsFetching] = useState(false);
// const [error, setError] = useState();

// // useEffect executes each time after this component
// // is re-rendered ONLY if its dependencies changed .
// useEffect(() => {
//   async function fetchPlaces() {
//     setIsFetching(true);

//     try {
//       const places = await fetchAvailablePlaces();

//       navigator.geolocation.getCurrentPosition((position) => {
//         const sortedPlaces = sortPlacesByDistance(
//           places,
//           position.coords.latitude,
//           position.coords.longitude
//         );
//         setAvailablePlaces(sortedPlaces);
//         setIsFetching(false);
//       });
//     } catch (error) {
//       setError({
//         message:
//           error.message || "Could not fetch places , please try again later",
//       });
//       setIsFetching(false);
//     }
//   }

//   fetchPlaces();

//   // or do this :
//   // fetch("http://localhost:3000/places")
//   //   .then((response) => {
//   //     return response.json();
//   //   })
//   //   .then((data) => {
//   //     setAvailablePlaces(data.places);
//   //   });
// }, []);
