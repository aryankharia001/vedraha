import React from "react";
import ProductPage from "../shared/ProductPage";
import { nabhiHairTeluguConfig } from "./nabhiHairTeluguConfig";
import { relatedProducts } from "../relatedProducts"; // your existing file

export default function NabhiAmritPage() {
  return <ProductPage config={nabhiHairTeluguConfig} relatedProducts={relatedProducts} />;
}