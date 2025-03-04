import { Button } from "@/components/ui/button";
import useQueryHook from "@/customhooks/useQuery";
import ProductCard from "@/practice/card";
// import { api2 } from "@/utils/axios";
// import { useQuery } from "@tanstack/react-query";
import  { useState } from "react";

const Pagination = () => {
    const [page,setPage]=useState(1)
  // const fetchProducts = async (page) => {
  
  //   const res = await fetch(
  //     `http://localhost:5000/pagination?page=${page}&productPerPage=3`
  //   );
  //   if (!res.ok) throw new Error("Failed to fetch products");
  //   const data = await res.json();  
  // console.log("Backend Response:", data);
  //   return data
  
  // };

 const {data,isLoading, error }=useQueryHook({
  endpoint: "pagination",
  querykey: ["product", page],
  queryParam: { page, productPerPage: 3 }
})

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Pagination</h1>
      <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">Our Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
        {data.products.map((product) => (
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
    <div>
    <Button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
          Previous
        </Button>
        <span> Page {page} </span>
        {/* {console.log("data.products.currentPage===data.products.totalpages",data.currentPage===data.totalpages,data.currentPage,data.totalPages)} */}
        
        <Button onClick={() => setPage((prev) => prev + 1)} disabled={page===data.totalPages}>
          Next
        </Button>

      </div>
    </div>

  );
};

export default Pagination;
