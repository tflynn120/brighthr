/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { screen, render, fireEvent } from "@testing-library/react";
import Documents from "../components/Documents";

describe.only("sort document functionality", () => {
  beforeEach(() => {
    render(<Documents />);
  });

  it("displays a list of the documents", () => {
    expect(screen.getByTestId("doc-list-container")).toBeInTheDocument();
  });

  it("sorts by name on click of name header", () => {
    fireEvent.click(screen.getByTestId("thead-name"));
    expect(screen.getByTestId("documents-table-row-0")).toHaveTextContent(
      "Cost centres"
    );
  });

  it("sorts by type on click of type header", () => {
    fireEvent.click(screen.getByTestId("thead-type"));
    expect(screen.getByTestId("documents-table-row-0")).toHaveTextContent(
      "csv"
    );
  });

  it("by date", () => {
    fireEvent.click(screen.getByTestId("thead-date"));
    expect(screen.getByTestId("documents-table-row-0")).toHaveTextContent(
      "N/A"
    );
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
