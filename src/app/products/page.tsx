import React, { Suspense } from "react";
import ProductsPage from "./ProductsPage";

const page = () => {
  
  
  return (
    <Suspense fallback={null}>
      <ProductsPage />
    </Suspense>
  );
};

export default page;