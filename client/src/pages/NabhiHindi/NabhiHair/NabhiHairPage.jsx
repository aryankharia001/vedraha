import React from "react";
import ProductPage from "../shared/ProductPage";
import { relatedProducts } from "../relatedProducts";
import { nabhiHairConfig } from "./nabhiHairConfig";
 
export default function NabhiHairH() {
  return <ProductPage config={nabhiHairConfig} relatedProducts={relatedProducts} />;
}