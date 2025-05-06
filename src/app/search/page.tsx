import { Metadata } from "next";
import SearchContainer from "./SearchContainer";

export const metadata: Metadata = {
  title: 'Search'
};

export default async function Search() {

  return (
    <div className="container mx-auto px-5 md:px-0 pt-4 pb-20">
      <SearchContainer />
    </div>
  );
}
