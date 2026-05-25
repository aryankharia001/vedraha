import React from "react";
import ProductPage from "../shared/ProductPage";
import { relatedProducts } from "../relatedProducts";
import { nabhiMenstrualEngConfig } from "./nabhiMenstrualEngConfig";
 
export default function NabhiMenstrual() {
  return <ProductPage config={nabhiMenstrualEngConfig} relatedProducts={relatedProducts} />;
}