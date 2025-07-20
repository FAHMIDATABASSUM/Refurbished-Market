import React, { useContext, useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../components/ui/select";
import { uploadProduct } from "@/Api/productApi";
import { UserContext } from "../Context/UserContext";

const ProductUpload = () => {
  const { userName,userId } = useContext(UserContext);

  const [data, setData] = useState({
    seller: userName,
    title: "",
    price: "",
    image: null,
    condition: "",
    status: false,
    details: "",
    uploaded_by:userId
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (value) => {
    setData(prev => ({
      ...prev,
      condition: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("seller", data.seller);
    formData.append("title", data.title);
    formData.append("price", data.price);
    formData.append("condition", data.condition);
    formData.append("image", data.image);
    formData.append("status", data.status);
    formData.append("details", data.details);
    formData.append("uploaded_by",data.uploaded_by)

    try {
      const response = await uploadProduct(formData);
      console.log("Upload successful", response);
      alert("Uploaded successfully")
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

        <Select onValueChange={handleSelectChange} required>
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
          onChange={(e) => {
            setData(prev => ({ ...prev, image: e.target.files[0] }));
          }}
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

        <Button type="submit">Upload Product</Button>
      </form>
    </div>
  );
};

export default ProductUpload;
