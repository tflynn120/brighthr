/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { screen, render, fireEvent } from "@testing-library/react";
import App from "../App";

describe("sort document functionality", () => {
  beforeEach(() => {
    render(<App />);
  });

  it("displays a list of the documents", () => {
    expect(screen.getByTestId("documents-table")).toBeInTheDocument();
  });

  it("does not sort by name until click of name header", () => {
    expect(screen.getByTestId("documents-table-row-0")).not.toHaveTextContent(
      "Cost centres"
    );
  });

  it("sorts by name on click of name header", () => {
    fireEvent.click(screen.getByTestId("thead-name"));
    expect(screen.getByTestId("documents-table-row-0")).toHaveTextContent(
      "Cost centres"
    );
  });

  it("does not sort by type until click of type header", () => {
    expect(screen.getByTestId("documents-table-row-0")).not.toHaveTextContent(
      "csv"
    );
  });

  it("sorts by type on click of type header", () => {
    fireEvent.click(screen.getByTestId("thead-type"));
    expect(screen.getByTestId("documents-table-row-0")).toHaveTextContent(
      "csv"
    );
  });

  it("does not sort by date until click of date header", () => {
    expect(screen.getByTestId("documents-table-row-0")).not.toHaveTextContent(
      "N/A"
    );
  });

  it("by date", () => {
    fireEvent.click(screen.getByTestId("thead-date"));
    expect(screen.getByTestId("documents-table-row-0")).toHaveTextContent(
      "N/A"
    );
  });
});

describe("showing files within folders", () => {
  beforeEach(() => {
    render(<App />);
  });

  it("does not show documents within the folder", () => {
    expect(screen.getByTestId("documents-table")).not.toHaveTextContent(
      "Fuel allowances"
    );
  });

  it("show documents within the folder", () => {
    fireEvent.click(
      screen.getByTestId("documents-table-row-folder-button-Expenses")
    );

    expect(screen.getByTestId("documents-table")).toHaveTextContent(
      "Fuel allowances"
    );
  });
});

describe("Filter by filename", () => {
  beforeEach(() => {
    render(<App />);
  });
  it("renders the search bar", () => {
    expect(screen.getByRole("searchbox")).toHaveTextContent("");
  });

  it("does not filter any document when no input has being input", () => {
    expect(screen.getByTestId("documents-table")).toHaveTextContent(
      "Employee Handbook"
    );
  });

  it("does not display a document that does not contain the search value", () => {
    const searchInput = screen.getByRole("searchbox");

    fireEvent.change(searchInput, { target: { value: "Misc" } });
    expect(screen.getByTestId("documents-table")).not.toHaveTextContent(
      "Fuel allowances"
    );
  });

  it("finds a document containing the search value", () => {
    const searchInput = screen.getByRole("searchbox");

    fireEvent.change(searchInput, { target: { value: "Misc" } });
    expect(screen.getByTestId("documents-table")).toHaveTextContent(
      "NameTypeDateMiscfolderN/AOpen Folder"
    );
  });

  it("when opening a folder, it finds a document within the folder containing the search value", () => {
    const searchInput = screen.getByRole("searchbox");

    fireEvent.click(
      screen.getByTestId("documents-table-row-folder-button-Expenses")
    );

    fireEvent.change(searchInput, { target: { value: "Fuel" } });
    expect(screen.getByTestId("documents-table")).toHaveTextContent(
      "NameTypeDateFuel allowancesdoc2017-05-03"
    );
  });
});
