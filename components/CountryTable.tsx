"use client";
import React from "react";
import { useState } from "react";
import { CountryData } from "../src/App";

interface CountryTableProps {
  countries: CountryData[];
}

const CountryTable: React.FC<CountryTableProps> = ({ countries }) => {
  const [searchValue, setSearchvalue] = useState<string>("");
  const [filterValue, setFilteredValue] = useState<CountryData[]>(countries);

  const searchInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.toLowerCase().trim();
    const isNumber = !isNaN(parseFloat(inputValue));

    if (isNumber) {
      alert("Input value must be string");
      return;
    } else {
      setSearchvalue(inputValue);
    }
    const filteredText = countries.filter((value) => {
      return value.code.toLowerCase().includes(inputValue);
    });
    setFilteredValue(filteredText);
  };

  return (
    <>
      <form className="flex items-center max-w-sm mx-auto mb-5">
        <label htmlFor="simple-search" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          <input
            value={searchValue}
            onChange={searchInputHandler}
            maxLength={2}
            type="text"
            id="simple-search"
            className="ml-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search by country code..."
            required
          />
        </div>
      </form>

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Country
              </th>
              <th scope="col" className="px-6 py-3">
                Code
              </th>
            </tr>
          </thead>
          <tbody>
            {filterValue.map((country, index) => {
              return (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {country.name}
                  </th>
                  <td className="px-6 py-4">{country.code}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CountryTable;
