import React, { useEffect, useState } from "react";
import { getAllProduct, updateProductStatus } from "@/Api/productApi";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);

  const fetchAllProducts = async () => {
    try {
      const res = await getAllProduct();
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const handleAllow = async (productId) => {
    try {
      await updateProductStatus(productId);
      fetchAllProducts();
    } catch (error) {
      console.error("Failed to update product status:", error);
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">All Products</h2>
      <Table className="table-fixed w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="text-left w-1/3">Title</TableHead>
            <TableHead className="text-left w-1/6">Price</TableHead>
            <TableHead className="text-left w-1/6">Status</TableHead>
            <TableHead className="text-center w-1/6">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product._id} className="align-middle">
              <TableCell className="text-left py-3">{product.title}</TableCell>
              <TableCell className="text-left py-3">
                ৳ {product.price}
              </TableCell>
              <TableCell className="text-left py-3">
                {product.status ? (
                  <span className="text-green-600 font-semibold">Allowed</span>
                ) : (
                  <span className="text-yellow-600 font-semibold">Pending</span>
                )}
              </TableCell>
              <TableCell className="text-center py-3">
                <Button
                  variant="outline"
                  disabled={product.status}
                  onClick={() => handleAllow(product._id)}
                >
                  {product.status ? "Allowed" : "Allow"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminProducts;
