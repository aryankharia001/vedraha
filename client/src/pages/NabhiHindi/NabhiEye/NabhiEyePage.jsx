import React from "react";
import ProductPage from "../shared/ProductPage";
import { relatedProducts } from "../relatedProducts";
import { nabhiEyeConfig } from "./nabhiEyeConfig";
 
export default function NabhiEyeH() {
  return <ProductPage config={nabhiEyeConfig} relatedProducts={relatedProducts} />;
}