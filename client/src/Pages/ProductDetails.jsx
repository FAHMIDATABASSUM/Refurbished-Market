import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, updateProductById } from '@/Api/productApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { UserContext } from '@/Context/UserContext'; // ✅ Import context

const EditProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { role } = useContext(UserContext); // ✅ Get role

  const [form, setForm] = useState({
    title: '',
    price: '',
    details: '',
    status: '',
    image: null,
    imagePreview: '',
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductById(productId);
        const product = res.data;
        setForm({
          title: product.title,
          price: product.price,
          details: product.details,
          status: product.status ?? 'false',
          image: null,
          imagePreview: `http://localhost:8000/${product.image}`,
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const file = files[0];
      setForm((prev) => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file),
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('price', form.price);
    formData.append('details', form.details);
    if (form.image) formData.append('image', form.image);

    try {
      await updateProductById(productId, formData);
      alert("Updated Successfully");
      navigate('/my-products');
    } catch (err) {
      console.error(err);
    }
  };

  const displayStatus = () => {
    return form.status === 'false' || form.status === false
      ? 'Pending'
      : 'Approved';
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-left">Edit Product</h1>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Image */}
        <div className="flex-shrink-0 w-full lg:w-1/3">
          <img
            src={form.imagePreview}
            alt="Product"
            className="w-full h-96 object-cover rounded-lg shadow"
          />
        </div>

        {/* Info */}
        <div className="flex-1 space-y-4 text-left">
          {!isEditing ? (
            <>
              <div>
                <p className="text-sm text-gray-500">Title</p>
                <p className="text-lg font-semibold">{form.title}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Price</p>
                <p className="text-lg font-semibold">৳ {form.price}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className="text-lg font-medium capitalize">
                  {displayStatus()}
                </p>
              </div>
            </>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Product Title"
                required
              />
              <Input
                name="price"
                value={form.price}
                onChange={handleChange}
                type="number"
                placeholder="Product Price"
                required
              />
              <Input
                name="status"
                value={form.status}
                onChange={handleChange}
                placeholder='Product Status ("false" for Pending, otherwise Approved)'
                required
              />
              <Input
                name="image"
                onChange={handleChange}
                type="file"
                accept="image/*"
              />
            </form>
          )}
        </div>
      </div>

      {/* Details (Full width) */}
      <div className="mt-10 text-left">
        <p className="text-sm text-gray-500 mb-1">Details</p>
        {!isEditing ? (
          <p className="text-gray-800 whitespace-pre-wrap">{form.details}</p>
        ) : (
          <Textarea
            name="details"
            value={form.details}
            onChange={handleChange}
            placeholder="Product Details"
            rows={5}
            required
          />
        )}
      </div>

      {/* Action Buttons at Bottom */}
      {role === 'seller' && (
        <div className="mt-6 text-left">
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)}>Edit</Button>
          ) : (
            <div className="flex gap-4">
              <Button type="submit" onClick={handleSubmit}>Update</Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EditProduct;
