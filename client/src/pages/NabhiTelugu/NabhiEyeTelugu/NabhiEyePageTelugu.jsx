import React from "react";
import ProductPage from "../shared/ProductPage";
import { nabhiEyeTeluguConfig } from "./nabhiEyeTeluguConfig";
import { relatedProducts } from "../relatedProducts"; // your existing file

export default function NabhiAmritPage() {
  return <ProductPage config={nabhiEyeTeluguConfig} relatedProducts={relatedProducts} />;
}