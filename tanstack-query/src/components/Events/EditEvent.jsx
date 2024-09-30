import {
  Link,
  redirect,
  useNavigate,
  useParams,
  useSubmit,
  useNavigation,
} from "react-router-dom";

// optimistic updating .

import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchEvent, updateEvent, queryClient } from "../../util/http.js";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";

export default function EditEvent() {
  const navigate = useNavigate();
  const { id } = useParams();

  // if you want to use router action .
  // const { state } = useNavigation();
  // const submit = useSubmit();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["events", { id }],
    queryFn: ({ signal }) => fetchEvent({ signal, id }),
    staleTime: 10000,
  });

  const { mutate } = useMutation({
    mutationFn: updateEvent,
    onMutate: async (data) => {
      const newEvent = data.event;
      // onMutate executes once mutating and before getting back a response

      await queryClient.cancelQueries({ queryKey: ["events", id] });
      // cancel queries that are fetching the this resource
      // in order not to clash with our optimistic updating .

      // get the previous event
      const oldEvent = queryClient.getQueryData(["events", id]);

      queryClient.setQueryData(["events", id], newEvent);
      // manipulate already stored data without waiting for response

      return { oldEvent }; // this object that will be in the context obj .
    },
    onError: (error, data, context) => {
      queryClient.setQueryData(["events", id], context.oldEvent);
    },
    onSettled: () => {
      // whenever the mutation is done
      // does not matter if it succedded or failed .
      queryClient.invalidateQueries(["events", id]);
      // event though we made optimistic update
      // and roled back if an error occurred
      // we still invalidate the event in order to get fresh data
    },
  });

  function handleSubmit(formData) {
    mutate({ id, event: formData });
    navigate("../");

    // if we want to use router action .
    // submit(formData, { method: "PUT" });
  }

  function handleClose() {
    navigate("../");
  }

  let content;

  if (isPending) {
    content = (
      <div className="center">
        <LoadingIndicator />
      </div>
    );
  }

  if (isError) {
    content = (
      <>
        <ErrorBlock
          title="Failed to load event"
          message={
            error.info?.message ||
            "Failed to load event. Please check your inputs and try again later ."
          }
        />
        <div className="form-actions">
          <Link to="../" className="button">
            Okay
          </Link>
        </div>
      </>
    );
  }

  if (data) {
    content = (
      <EventForm inputData={data} onSubmit={handleSubmit}>
        <Link to="../" className="button-text">
          Cancel
        </Link>
        <button type="submit" className="button">
          Update
        </button>
      </EventForm>
    );
  }

  return <Modal onClose={handleClose}>{content}</Modal>;
}

export function loader({ params }) {
  const { id } = params;
  return queryClient.fetchQuery({
    queryKey: ["events", { id }],
    queryFn: ({ signal, queryKey }) => fetchEvent({ signal, ...queryKey[1] }),
  });
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const updatedEvent = Object.fromEntries(formData);
  await updateEvent({ id: params.id, event: updatedEvent });
  await queryClient.invalidateQueries(["events"]);
  return redirect("../");
}
