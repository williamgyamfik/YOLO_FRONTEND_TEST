import React from "react";
import CountryTable from "../components/CountryTable";
import { useQuery, gql } from "@apollo/client";

const GET_DATA = gql`
  query {
    countries {
      code
      name
    }
  }
`;

export interface CountryData {
  name: string;
  code: string;
  id: number;
}

const App: React.FC = () => {
  const { loading, error, data } = useQuery(GET_DATA);

  const countries: CountryData[] = data?.countries || [];

  if (loading) {
    return <p>Loading....</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <h1 className="text-black font-semibold">
        Name : William Gyamfi Kumi .....YOLO Test
      </h1>
      <CountryTable countries={countries} />
    </>
  );
};

export default App;
