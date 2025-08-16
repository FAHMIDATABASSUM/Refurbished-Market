import React, { useContext, useEffect, useState } from 'react';
import { deleteWish, getWish } from '@/Api/productApi';
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

const Wishlist = () => {
  const { userId } = useContext(UserContext);
  const [wishlist, setWishlist] = useState([]);
  const [message, setMessage] = useState('');
  const [refresh,setRefresh] = useState(false)

  const fetchList = async () => {
    try {
      const response = await getWish(userId);
      setWishlist(response.data);
    } catch (error) {
      console.log(error);
      setMessage('Failed to fetch wishlist');
    }
  };

  useEffect(() => {
    fetchList();
  }, [refresh]);


  const handleDelete = async(wishId)=>{
     try{
        await deleteWish(wishId)
        setRefresh(!refresh)
        alert("Deleted Successfully")
     }catch(error){
        alert("Error deleting")
     }
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>

      {message && (
        <div className="mb-4 p-2 bg-gray-200 text-gray-800 rounded">{message}</div>
      )}

      <Table>
        <TableHeader>
          <TableRow>
            
            <TableHead className="text-left">Image</TableHead>
            <TableHead className="text-center">Title</TableHead>
            <TableHead className="text-center">Condition</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {wishlist.map((item) => (
            <TableRow key={item._id}>
              
              <TableCell className="text-center">
                <img
                  src={`http://localhost:8000/${item.image}`}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded"
                />
              </TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.condition}</TableCell>
              <TableCell className="text-right">৳ {item.price}</TableCell>
              <TableCell>
                <div className="text-right">
                  <Button variant="destructive" size="sm" onClick={()=>handleDelete(item._id)}>
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Wishlist;
