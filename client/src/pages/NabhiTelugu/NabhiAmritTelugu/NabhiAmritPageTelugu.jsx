import React from "react";
import ProductPage from "../shared/ProductPage";
import { nabhiAmritTeluguConfig } from "./nabhiAmritTeluguConfig";
import { relatedProducts } from "../relatedProducts"; // your existing file

export default function NabhiAmritPage() {
  return <ProductPage config={nabhiAmritTeluguConfig} relatedProducts={relatedProducts} />;
}