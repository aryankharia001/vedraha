import React from "react";
import ProductPage from "../shared/ProductPage";
import { nabhiMenstrualTeluguConfig } from "./nabhiMenstrualTeluguConfig";
import { relatedProducts } from "../relatedProducts"; // your existing file

export default function NabhiAmritPage() {
  return <ProductPage config={nabhiMenstrualTeluguConfig} relatedProducts={relatedProducts} />;
}