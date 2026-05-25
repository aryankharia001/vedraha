import React from "react";
import ProductPage from "../shared/ProductPage";
import { nabhiJointTamilConfig } from "./nabhiJointTamilConfig";
import { relatedProducts } from "../relatedProducts"; // your existing file

export default function NabhiAmritPage() {
  return <ProductPage config={nabhiJointTamilConfig} relatedProducts={relatedProducts} />;
}