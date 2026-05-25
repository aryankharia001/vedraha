import React from "react";
import ProductPage from "../shared/ProductPage";
import { relatedProducts } from "../relatedProducts";
import { nabhiSleepEngConfig } from "./nabhiSleepEngConfig";
 
export default function NabhiEyeH() {
  return <ProductPage config={nabhiSleepEngConfig} relatedProducts={relatedProducts} />;
}