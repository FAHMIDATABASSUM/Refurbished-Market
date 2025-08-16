import React, { useContext, useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../components/ui/select";
import { uploadProduct } from "@/Api/productApi";
import { UserContext } from "../Context/UserContext";

const ProductUpload = () => {
  const { userName, userId } = useContext(UserContext);

  const [data, setData] = useState({
    seller: userName,
    title: "",
    price: "",
    image: null,
    condition: "",
    status: false,
    details: "",
    address: "",
    deliveryMethod: "",
    paymentMethod: "",
    uploaded_by: userId
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (field, value) => {
    setData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }

    try {
      const response = await uploadProduct(formData);
      console.log("Upload successful", response);
      alert("Uploaded successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          id="title"
          name="title"
          value={data.title}
          onChange={handleChange}
          placeholder="Product Title"
          required
        />

        <Input
          id="price"
          name="price"
          type="number"
          value={data.price}
          onChange={handleChange}
          placeholder="Price"
          required
        />

        <Select onValueChange={(value) => handleSelectChange('condition', value)} required>
          <SelectTrigger>
            <SelectValue placeholder="Select condition" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="like-new">Like New</SelectItem>
            <SelectItem value="used">Used</SelectItem>
          </SelectContent>
        </Select>

        <Input
          type="file"
          id="image"
          name="image"
          onChange={(e) => setData(prev => ({ ...prev, image: e.target.files[0] }))}
          required
        />

        <textarea
          id="details"
          name="details"
          value={data.details}
          onChange={handleChange}
          placeholder="Write full product description here..."
          rows="6"
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        ></textarea>

        {/* New Fields */}
        <Input
          id="address"
          name="address"
          value={data.address}
          onChange={handleChange}
          placeholder="Your Address"
          required
        />

        <Select onValueChange={(value) => handleSelectChange('deliveryMethod', value)} required>
          <SelectTrigger>
            <SelectValue placeholder="Select Delivery Method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="courier">Courier</SelectItem>
            <SelectItem value="pickup">Pickup</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => handleSelectChange('paymentMethod', value)} required>
          <SelectTrigger>
            <SelectValue placeholder="Select Payment Method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cod">Cash on Delivery</SelectItem>
            <SelectItem value="online">Online Payment</SelectItem>
          </SelectContent>
        </Select>

        <Button type="submit">Upload Product</Button>
      </form>
    </div>
  );
};

export default ProductUpload;
