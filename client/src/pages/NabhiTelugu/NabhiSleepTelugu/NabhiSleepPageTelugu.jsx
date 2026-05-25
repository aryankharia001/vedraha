import React from "react";
import ProductPage from "../shared/ProductPage";
import { nabhiSleepTeluguConfig } from "./nabhiSleepTeluguConfig";
import { relatedProducts } from "../relatedProducts"; // your existing file

export default function NabhiAmritPage() {
  return <ProductPage config={nabhiSleepTeluguConfig} relatedProducts={relatedProducts} />;
}