import React from "react";

import CatalogContainer from "../CatalogContainer";
import { Metadata } from "next";

interface Params {
  url: string;
}

export const metadata: Metadata = {
  title: 'Catalog'
};

export default async function CatalogGroup({ params }: { params: Params }) {
  const { url } = await params;

  return (
    <div className="container mx-auto px-5 md:px-0 py-20">
      <CatalogContainer url={url} />
    </div>
  );
}
