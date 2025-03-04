import React from "react";
import ProductCard from "../practice/card";
import useQueryHook from "@/customhooks/useQuery";

const Products = () => {
  const { data: products, isLoading, error } = useQueryHook({
    endpoint: "products",
    querykey: ["products"]
  });

  if (isLoading) {
    return (
      <div className="text-center text-lg font-semibold p-6">
        Loading products...
      </div>
    );
  }




  if (error) {
    return (
      <div className="text-center text-red-600 font-semibold p-6">
        Error: {error.message}
      </div>
    );
  }

  console.log("checkkkkkkkk",products)

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
        Our Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            title={product.name}
            imageUrl={product.imageUrl}
            description={product.description}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
