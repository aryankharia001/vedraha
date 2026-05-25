import React from "react";
import ProductPage from "../shared/ProductPage";
import { nabhiShilajitTeluguConfig } from "./nabhiShilajitTeluguConfig";
import { relatedProducts } from "../relatedProducts"; // your existing file

export default function NabhiAmritPage() {
  return <ProductPage config={nabhiShilajitTeluguConfig} relatedProducts={relatedProducts} />;
}