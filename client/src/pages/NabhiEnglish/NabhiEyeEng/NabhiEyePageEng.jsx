import React from "react";
import ProductPage from "../shared/ProductPage";
import { relatedProducts } from "../relatedProducts";
import { nabhiEyeEngConfig } from "./NabhiEyeEngConfig";

export default function NabhiEyeH() {
  return <ProductPage config={nabhiEyeEngConfig} relatedProducts={relatedProducts} />;
}