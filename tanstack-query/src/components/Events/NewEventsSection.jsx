import { useQuery } from "@tanstack/react-query";

import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import EventItem from "./EventItem.jsx";
import { fetchEvents } from "../../util/http.js";

export default function NewEventsSection() {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ["events", { max: 3 }],
    queryFn: ({ signal, queryKey }) => fetchEvents({ signal, ...queryKey[1] }),
    // staleTime: 5000, after this duration, the new request will be sent (when rerendering)
    // gcTime: 0, // after this duration, cached data will be deleted
  });

  let content;

  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock
        title="An error occurred"
        message={error.info?.message || "Failed to fetch events"}
      />
    );
  }

  if (data) {
    content = (
      <ul className="events-list">
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="content-section" id="new-events-section">
      <header>
        <h2>Recently added events</h2>
      </header>
      {content}
    </section>
  );
}

// const [data, setData] = useState();
// const [error, setError] = useState();
// const [isLoading, setIsLoading] = useState(false);

// useEffect(() => {
//   fetchEvents()
//     .then((events) => {
//       setData(events);
//     })
//     .catch((error) => {
//       setError(error);
//     })
//     .finally(() => {
//       setIsLoading(false);
//     });
// }, []);
