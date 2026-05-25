import React from "react";
import ProductPage from "../shared/ProductPage";
import { nabhiJointConfig } from "./nabhiJointConfig";
import { relatedProducts } from "../relatedProducts";
 
export default function NabhiJointH() {
  return <ProductPage config={nabhiJointConfig} relatedProducts={relatedProducts} />;
}