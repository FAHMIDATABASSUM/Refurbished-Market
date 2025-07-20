import React, { useEffect, useState } from "react";
import { getProductByStatus } from "@/Api/productApi";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const fetchProducts = async (searchQuery = "") => {
    try {
      const res = await getProductByStatus(searchQuery);
      setProducts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProducts(search);
  };

  const handleNavigate = (id) => {
    navigate(`/product-detail/${id}`);
  };

  return (
    <div className="p-6 flex justify-center">
      <div className="w-full max-w-7xl">
        {/* Search bar */}
        <form onSubmit={handleSearch} className="flex mb-6 items-center gap-4">
          <Input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64"
          />
          <Button type="submit">Search</Button>
        </form>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="border p-4 rounded-xl shadow w-full flex flex-col items-center"
            >
              {/* Image */}
              <img
                src={`http://localhost:8000/${product.image}`}
                alt={product.title}
                className="w-full h-40 object-cover rounded mb-3"
              />

              {/* Info */}
              <div className="w-full text-center">
                <h2 className="text-lg font-semibold">{product.title}</h2>
                <p className="text-gray-700 text-sm">
                  Price:{" "}
                  <span className="font-medium">{product.price || "N/A"}</span>
                </p>
                <p className="text-gray-700 text-sm">
                  Condition:{" "}
                  <span className="font-medium">
                    {product.condition || "N/A"}
                  </span>
                </p>
                <p className="text-gray-700 text-sm">
                  Seller:{" "}
                  <span className="font-medium">
                    {product.seller || "Unknown"}
                  </span>
                </p>
              </div>

              {/* Buttons */}
              <div className="mt-4 flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => handleNavigate(product._id)}
                >
                  View
                </Button>
                <Button>Buy</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
