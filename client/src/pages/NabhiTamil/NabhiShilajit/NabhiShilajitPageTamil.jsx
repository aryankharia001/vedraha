import React from "react";
import ProductPage from "../shared/ProductPage";
import { nabhiShilajitTamilConfig } from "./nabhiShilajitTamilConfig";
import { relatedProducts } from "../relatedProducts"; // your existing file

export default function NabhiAmritPage() {
  return <ProductPage config={nabhiShilajitTamilConfig} relatedProducts={relatedProducts} />;
}