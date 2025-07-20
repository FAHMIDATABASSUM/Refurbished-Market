import React, { useContext, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getProductByUserId } from '@/Api/productApi';
import { UserContext } from '@/Context/UserContext';
import { useNavigate } from 'react-router-dom';
import { deleteProduct } from '@/Api/productApi';

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { userId } = useContext(UserContext);
  const navigate = useNavigate();
  const fetchProducts = async () => {
    try {
      const res = await getProductByUserId(userId, searchTerm);

      setProducts(res.data);
    } catch (err) {
      console.error('Failed to fetch products', err);
    }
  };

  useEffect(() => {
    if (userId) fetchProducts();
  }, [userId]);

  const handleNavigate=(productId)=>{
    navigate(`/product-detail/${productId}`)
  }

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );



  const handleDeleteProduct = async(id) =>{
    try{
      const res = await deleteProduct(id)
      console.log(res)
    }catch(error){
      console.log(error)
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Your Uploaded Products</h2>

      {/* Search Input */}
      <div className="mb-4 flex justify-end">
        <Input
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-64"
        />
      </div>

      <div className="overflow-x-auto rounded-lg shadow border">
        <Table className="min-w-full text-sm text-left text-gray-700">
          <TableHeader>
            <TableRow className="bg-gray-100 uppercase text-gray-600 tracking-wider">
              <TableHead className="px-5 py-3">Image</TableHead>
              <TableHead className="px-5 py-3">Title</TableHead>
              <TableHead className="px-5 py-3">Price</TableHead>
              <TableHead className="px-5 py-3">Status</TableHead>
              <TableHead className="px-5 py-3">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <TableRow key={product._id} className="hover:bg-gray-50">
                  <TableCell className="px-5 py-4">
                    <img
                      src={`http://localhost:8000/${product.image}`}
                      alt="product"
                      className="w-16 h-16 object-cover rounded border"
                    />
                  </TableCell>
                  <TableCell className="px-5 py-4 font-medium align-middle">
                    {product.title}
                  </TableCell>
                  <TableCell className="px-5 py-4 font-semibold text-gray-800 align-middle">
                    ৳{product.price}
                  </TableCell>
                  <TableCell className="px-5 py-4 align-middle">
                    {product.status ? (
                      <span className="text-green-600 font-medium">Approved</span>
                    ) : (
                      <span className="text-yellow-600 font-medium">Pending</span>
                    )}
                  </TableCell>
                  <TableCell className="px-5 py-4 align-middle">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={()=>handleNavigate(product._id)}>
                        View
                      </Button>
                      <Button size="sm" variant="destructive" onClick={()=>handleDeleteProduct(product._id)}>
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                  No products found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProductTable;
