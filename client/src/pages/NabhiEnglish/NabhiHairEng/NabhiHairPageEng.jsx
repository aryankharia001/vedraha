import React from "react";
import ProductPage from "../shared/ProductPage";
import { relatedProducts } from "../relatedProducts";
import { nabhiHairEngConfig } from "./nabhiHairEngConfig";
 
export default function NabhiEyeH() {
  return <ProductPage config={nabhiHairEngConfig} relatedProducts={relatedProducts} />;
}