import React from "react";
import ProductPage from "../shared/ProductPage";
import { nabhiEyeTamilConfig } from "./nabhiEyeTamilConfig";
import { relatedProducts } from "../relatedProducts"; // your existing file

export default function NabhiAmritPage() {
  return <ProductPage config={nabhiEyeTamilConfig} relatedProducts={relatedProducts} />;
}