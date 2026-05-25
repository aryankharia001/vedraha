import React from "react";
import ProductPage from "../shared/ProductPage";
import { nabhiAmritEngConfig } from "./nabhiAmritEngConfig";
import { relatedProducts } from "../relatedProducts"; // your existing file

export default function NabhiAmritPage() {
  return <ProductPage config={nabhiAmritEngConfig} relatedProducts={relatedProducts} />;
}