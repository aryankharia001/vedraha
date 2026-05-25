import React from "react";
import ProductPage from "../shared/ProductPage";
import { nabhiMenstrualTamilConfig } from "./nabhiMenstrualTamilConfig";
import { relatedProducts } from "../relatedProducts"; // your existing file

export default function NabhiAmritPage() {
  return <ProductPage config={nabhiMenstrualTamilConfig} relatedProducts={relatedProducts} />;
}