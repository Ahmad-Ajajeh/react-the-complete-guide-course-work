import { render, screen } from "@testing-library/react";
import Async from "./Async";

describe("<Async /> component", () => {
  test("renders posts if request succeeds", async () => {
    // arrange
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => [{ id: "p1", title: "first post" }],
    });
    render(<Async />);

    // act

    // assert
    const listItemElements = await screen.findAllByRole("listitem");
    // getByRole will fail if we have
    // more than one element with the same role .

    expect(listItemElements).not.toHaveLength(0);
  });
});
