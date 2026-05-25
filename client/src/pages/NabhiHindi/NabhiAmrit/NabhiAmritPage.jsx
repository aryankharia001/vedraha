import React from "react";
import ProductPage from "../shared/ProductPage";
import { nabhiAmritConfig } from "./nabhiAmritConfig";
import { relatedProducts } from "../relatedProducts"; // your existing file

export default function NabhiAmritPage() {
  return <ProductPage config={nabhiAmritConfig} relatedProducts={relatedProducts} />;
}