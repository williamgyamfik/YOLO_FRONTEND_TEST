import React from "react";
import "@testing-library/jest-dom/vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { it, expect, describe } from "vitest";
import { MockedProvider } from "@apollo/client/testing";
import { act } from "react-dom/test-utils";
import { GET_DATA } from "../../constant";
import CountryTable from "../../components/CountryTable";

const mocks = [
  {
    request: {
      query: GET_DATA,
    },
    result: {
      data: {
        countries: [
          { name: "Ghana", code: "GH" },
          { name: "Estonia", code: "EE" },
        ],
      },
    },
  },
];

describe("App", () => {
  it("filters country by input", async () => {
    await act(async () => {
      render(
        <MockedProvider mocks={mocks}>
          <CountryTable countries={[{ name: "country", code: "EE" }]} />
        </MockedProvider>
      );
    });

    const searchInput = screen.getAllByTestId(
      "country-search-input"
    )[0] as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: "EE" } });

    await waitFor(() => {
      const ghCell = screen.getByText("EE");
      expect(ghCell).toBeInTheDocument();
    });

    fireEvent.change(searchInput, { target: { value: "GHH" } });

    await waitFor(() => {
      const ghCell = screen.queryByText("GH");
      expect(ghCell).not.toBeInTheDocument();
    });
  });
});
