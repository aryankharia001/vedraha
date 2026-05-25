import React from "react";
import ProductPage from "../shared/ProductPage";
import { relatedProducts } from "../relatedProducts";
import { nabhiShilajitEngConfig } from "./nabhiShilajitEngConfig";
 
export default function NabhiEyeH() {
  return <ProductPage config={nabhiShilajitEngConfig} relatedProducts={relatedProducts} />;
}