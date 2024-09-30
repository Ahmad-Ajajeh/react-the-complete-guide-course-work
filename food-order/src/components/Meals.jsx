import useHttp from "../hooks/useHttp.js";

import MealItem from "./MealItem.jsx";
import Error from "./UI/Error.jsx";

const requestConfig = {};

export default function Meals() {
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);

  // useHttp("http://localhost:3000/meals", {}, []);
  // the plain {} object will result in infinite loop because
  // it is regenrated .

  if (isLoading) {
    return <p className="center">Fetching meals ...</p>;
  }

  if (error) {
    return <Error title="Error fetching meals" message={error} />;
  }

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}

/* 
LEGACY :
const [loadedMeals, setLoadedMeals] = useState([]);

  useEffect(() => {
    // we put this function inside the useEffect , in order to not be
    // obligated to put it inside the dependencies array .
    // since it is used only here anyways .
    async function fetchMeals() {
      try {
        // this try used for handling the fetch method e.g no internet .
        // you can send an http request with the fetch function .
        const response = await fetch("http://localhost:3000/meals");

        if (!response.ok) {
          // 400 or 500 status code , so there is a response
        }
        const meals = await response.json();
        setLoadedMeals(meals);
      } catch (err) {
        console.error(err);
      }
    }

    fetchMeals();
  }, []);
*/
