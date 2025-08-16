import React, { useContext, useEffect, useState } from 'react';
import { getCart, deleteCart,updateCartQuantity } from '@/Api/productApi';
import { UserContext } from '@/Context/UserContext';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

const Cart = () => {
  const { userId } = useContext(UserContext);
  const [cartlist, setCartlist] = useState([]);
  const [message, setMessage] = useState('');
  const [refresh, setRefresh] = useState(false);

  const fetchList = async () => {
    try {
      const response = await getCart(userId);
      setCartlist(response.data.list || []); // updated for list from backend
    } catch (error) {
      console.log(error);
      setMessage('Failed to fetch cart');
    }
  };

  useEffect(() => {
    fetchList();
  }, [refresh]);

  const handleDelete = async (cartId) => {
    try {
      await deleteCart(cartId);
      setRefresh(!refresh);
      alert('Deleted Successfully');
    } catch (error) {
      alert('Error deleting');
    }
  };

   const handleQuantityChange = async (cartId, newQuantity) => {
    if (newQuantity < 1) return; 
    try {
      await updateCartQuantity(cartId, newQuantity);
      setRefresh(!refresh);
    } catch (error) {
      console.log('Error updating quantity', error);
    }
  };
  const cartTotal = cartlist.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">My Cart</h2>

      {message && (
        <div className="mb-4 p-2 bg-gray-200 text-gray-800 rounded">{message}</div>
      )}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left">Image</TableHead>
            <TableHead className="text-center">Title</TableHead>
            <TableHead className="text-center">Condition</TableHead>
            <TableHead className="text-center">Quantity</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cartlist.map((item) => (
            <TableRow key={item._id}>
              <TableCell className="text-center">
                <img
                  src={`http://localhost:8000/${item.image}`}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded"
                />
              </TableCell>
              <TableCell className="text-center">{item.title}</TableCell>
              <TableCell className="text-center">{item.condition}</TableCell>

              {/* Quantity column */}
              <TableCell className="text-center flex items-center justify-center gap-2 pt-6">
                <Button size="sm" variant="outline" onClick={() => handleQuantityChange(item._id, item.quantity - 1)} >-</Button>
                <span>{item.quantity}</span>
                <Button size="sm" variant="outline"  onClick={() => handleQuantityChange(item._id, item.quantity + 1)}>+</Button>
              </TableCell>

              <TableCell className="text-right">৳ {item.price * item.quantity}</TableCell>
              <TableCell>
                <div className="text-right">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}

          {/* Total row */}
          <TableRow>
            <TableCell colSpan={4} className="text-right font-bold text-lg">
              Total:
            </TableCell>
            <TableCell className="text-right font-bold text-lg">
              ৳ {cartTotal}
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default Cart;
