/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import Documents from "../components/Documents";

describe.only("sorts the documents", () => {
  beforeEach(() => {
    render(<Documents />);
  });

  it.only("displays a list of the documents", () => {
    expect(screen.getByTestId("doc-list-container")).toBeInTheDocument();
  });

  it("by name", () => {
    throw new Error();
  });

  it("by size", () => {
    throw new Error();
  });

  it("by date", () => {
    throw new Error();
  });
});

describe("Filter by filename", () => {
  beforeEach(() => {
    // setup
  });
  it("does not find a document when no document contains the search value", () => {
    throw new Error();
  });

  it("finds a document containing the search value", () => {
    throw new Error();
  });
});

describe("clicking on individual documents", () => {
  beforeEach(() => {
    // setup
  });

  it("shows the correct documents details", () => {
    throw new Error();
  });
});
