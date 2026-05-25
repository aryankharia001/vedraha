import React from "react";
import ProductPage from "../shared/ProductPage";
import { relatedProducts } from "../relatedProducts";
import { nabhiShilajitConfig } from "./nabhiShilajitConfig";
 
export default function NabhiShilajitH() {
  return <ProductPage config={nabhiShilajitConfig} relatedProducts={relatedProducts} />;
}