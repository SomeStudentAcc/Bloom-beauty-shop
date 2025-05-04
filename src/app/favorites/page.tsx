import React from "react";
import FovoriteGrid from "./FovoriteGrid";

export default function Favorite() {
  return (
    <div className="container mx-auto px-5 md:px-0 py-12">
      <h4 className="text-3xl mb-8 lg:mb-12">Избранное</h4>
      <FovoriteGrid/>
    </div>
  );
}
