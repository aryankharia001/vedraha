import React from "react";
import ProductPage from "../shared/ProductPage";
import { relatedProducts } from "../relatedProducts";
import {nabhiSleepConfig} from "./nabhiSleepConfig";
 
export default function NabhiSleepH() {
  return <ProductPage config={nabhiSleepConfig} relatedProducts={relatedProducts} />;
}