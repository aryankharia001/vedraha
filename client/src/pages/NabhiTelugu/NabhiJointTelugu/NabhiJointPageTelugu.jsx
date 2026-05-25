import React from "react";
import ProductPage from "../shared/ProductPage";
import { nabhiJointTeluguConfig } from "./nabhiJointTeluguConfig";
import { relatedProducts } from "../relatedProducts"; // your existing file

export default function NabhiAmritPage() {
  return <ProductPage config={nabhiJointTeluguConfig} relatedProducts={relatedProducts} />;
}