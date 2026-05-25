import React from "react";
import ProductPage from "../shared/ProductPage";
import { nabhiHairTamilConfig } from "./nabhiHairTamilConfig";
import { relatedProducts } from "../relatedProducts"; // your existing file

export default function NabhiAmritPage() {
  return <ProductPage config={nabhiHairTamilConfig} relatedProducts={relatedProducts} />;
}