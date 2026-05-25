import React from "react";
import ProductPage from "../shared/ProductPage";
import { nabhiAmritTamilConfig } from "./nabhiAmritTamilConfig";
import { relatedProducts } from "../relatedProducts"; // your existing file

export default function NabhiAmritPage() {
  return <ProductPage config={nabhiAmritTamilConfig} relatedProducts={relatedProducts} />;
}