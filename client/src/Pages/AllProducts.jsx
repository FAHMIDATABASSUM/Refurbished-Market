import React, { useContext, useEffect, useState } from "react";
import { getProductByStatus, postWish } from "@/Api/productApi";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { UserContext } from "@/Context/UserContext";

const AllProducts = () => {
  const [products, setProducts] = useState([]);        // All products from API
  const [filteredProducts, setFilteredProducts] = useState([]); // Products after filtering
  const [search, setSearch] = useState("");
  const [condition, setCondition] = useState("all");
  const [sortOrder, setSortOrder] = useState("default");
  const navigate = useNavigate();
  const {userId} = useContext(UserContext)
  
  const fetchProducts = async () => {
    try {
      const res = await getProductByStatus(); // No params
      const all = res.data || [];
      setProducts(all);
      setFilteredProducts(all);
    } catch (error) {
      console.error(error);
    }
  };

  // Filter + Sort whenever search, condition, or sort changes
  useEffect(() => {
    let temp = [...products];

    // Search filter
    if (search.trim()) {
      temp = temp.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Condition filter
    if (condition !== "all") {
      temp = temp.filter(
        (p) => p.condition?.toLowerCase() === condition.toLowerCase()
      );
    }

    // Sorting
    if (sortOrder === "low-to-high") {
      temp.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortOrder === "high-to-low") {
      temp.sort((a, b) => (b.price || 0) - (a.price || 0));
    }

    setFilteredProducts(temp);
  }, [search, condition, sortOrder, products]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    
  };

  const handleNavigate = (id) => {
    navigate(`/product-detail/${id}`);
  };


  const handleWishList = async(productId)=>{
    try{
      const response = await postWish(productId,userId)
      alert("Added to wishlist")
    }catch(error){
      alert(error.response.data)
    }
    
  }

  return (
    <div className="p-6 flex justify-center">
      <div className="w-full max-w-7xl">
        {/* Search + Filters */}
        <form onSubmit={handleSearch} className="flex flex-wrap mb-6 items-center gap-4">
          <Input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64"
          />
          <Button type="submit">Search</Button>

          {/* Condition Dropdown */}
          <Select onValueChange={setCondition} value={condition}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by Condition" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="used">Used</SelectItem>
              <SelectItem value="likely-new-used">Likely New & Used</SelectItem>
            </SelectContent>
          </Select>

          {/* Price Sort Dropdown */}
          <Select onValueChange={setSortOrder} value={sortOrder}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by Price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="low-to-high">Price: Low to High</SelectItem>
              <SelectItem value="high-to-low">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </form>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
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
                  Price: <span className="font-medium">{product.price || "N/A"}</span>
                </p>
                <p className="text-gray-700 text-sm">
                  Condition: <span className="font-medium">{product.condition || "N/A"}</span>
                </p>
                <p className="text-gray-700 text-sm">
                  Seller: <span className="font-medium">{product.seller || "Unknown"}</span>
                </p>
              </div>

              {/* Buttons */}
              <div className="mt-4 flex gap-2">
                <Button variant="outline" onClick={() => handleNavigate(product._id)}>
                  View
                </Button>
                <Button onClick={()=>handleWishList(product._id)}>Add to Wishlist</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
