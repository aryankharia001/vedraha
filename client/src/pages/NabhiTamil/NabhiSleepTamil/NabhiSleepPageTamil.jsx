import React from "react";
import ProductPage from "../shared/ProductPage";
import { nabhiSleepTamilConfig } from "./nabhiSleepTamilConfig";
import { relatedProducts } from "../relatedProducts"; // your existing file

export default function NabhiAmritPage() {
  return <ProductPage config={nabhiSleepTamilConfig} relatedProducts={relatedProducts} />;
}