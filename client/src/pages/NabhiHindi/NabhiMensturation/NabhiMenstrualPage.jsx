import React from "react";
import ProductPage from "../shared/ProductPage";
import { relatedProducts } from "../relatedProducts";
import { nabhiMenstrualConfig } from "./nabhiMenstrualConfig";
 
export default function NabhiMenstrualH() {
  return <ProductPage config={nabhiMenstrualConfig} relatedProducts={relatedProducts} />;
}