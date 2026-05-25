import React from "react";
import ProductPage from "../shared/ProductPage";
import { relatedProducts } from "../relatedProducts";
import { nabhiJointEngConfig } from "./nabhiJointEngConfig";
 
export default function NabhiEyeH() {
  return <ProductPage config={nabhiJointEngConfig} relatedProducts={relatedProducts} />;
}