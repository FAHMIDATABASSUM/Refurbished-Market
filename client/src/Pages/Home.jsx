import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { getProductByStatus } from '@/Api/productApi';
import { Button } from '@/components/ui/button';
import { Info, ShieldCheck, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const fetchProducts = async () => {
    try {
      const res = await getProductByStatus('');
      setProducts(res.data.slice(0, 6));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleNavigate=(id)=>{
    navigate(`/product-detail/${id}`)
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
  };

  const heroSlides = [
    {
      title: 'Refurbished. Reliable. Rewarding.',
      subtitle: 'Shop top-quality used products with peace of mind.',
      image: 'https://imgs.search.brave.com/QNCwr09NR1FCSz8en6VffEM5kkOkW8FiZ9IWCUoFHRw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9yZWZ1/cmJpc2hlZGRpcmVj/dC5jb20vbWVkaWEv/YzIvZjUvMTMvMTY4/MTQ2MDg4Ny9iZWVs/ZC1DTzItYmVzcGFy/aW5nXzE5MjB4MTky/MC53ZWJw',
    },
    {
      title: 'Better Deals. Greener Planet.',
      subtitle: 'Choose smart. Choose sustainable.',
      image: 'https://imgs.search.brave.com/cA-v8zzYYz_Wad0xikHY0ktMtDzpP2PnFcACwJCkrto/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kMWJ4/Y25ycHEzY290NC5j/bG91ZGZyb250Lm5l/dC91cGxvYWRzL3do/YXQtaXMtc2VsbGVy/LXJlZnVyYmlzaGVk/LW1hbnVmYWN0dXJl/ci1yZWZ1cmJpc2hl/ZC1kZWZpbml0aW9u/LWltZ182MDQxMDNj/OWM1ODQ5LmpwZw',
    },
    {
      title: 'Verified Sellers. Trusted Products.',
      subtitle: 'Browse thousands of tested and verified products.',
      image: 'https://imgs.search.brave.com/gugdZJ55_7Gn8MsPmOrNWMvGfmz4GnA6QvyryFmhAYc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aGVj/aGFpYm94LmNvbS9j/ZG4vc2hvcC9maWxl/cy9UcmFkaXRpb25h/bF9DaGFpX1BvdXJf/VGhlX0NoYWlfQm94/LmpwZz92PTE3NDU1/MjQ3Mzcmd2lkdGg9/MTAwMA',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-20">
      {/* Hero Slider */}
      <Slider {...sliderSettings}>
        {heroSlides.map((slide, index) => (
          <div key={index} className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden">
            <img
              src={slide.image}
              alt="Slide"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex items-center px-8 md:px-16">
              <div className="text-white space-y-4 max-w-xl">
                <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                  {slide.title}
                </h2>
                <p className="text-lg md:text-xl">{slide.subtitle}</p>
                 <Button className="bg-white text-black hover:bg-gray-100 font-semibold" onClick={() => window.location.href = '/allproductbystatus'}>
            Shop Now
          </Button>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Products */}
      <div className="space-y-6">
        <h2 className="text-3xl font-semibold text-gray-800">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product._id} className="rounded-xl border p-4">
              <img
                src={`http://localhost:8000/${product.image}`}
                alt={product.title}
                className="w-full h-48 object-cover rounded-lg mb-3"
              />
              <h3 className="text-xl font-bold text-gray-800">{product.title}</h3>
              <p className="text-green-600 font-semibold">৳ {product.price}</p>
              <p className="text-sm text-gray-600 line-clamp-2">{product.details}</p>
              <Button variant="outline" className='mt-4' onClick={()=>handleNavigate(product._id)}>View</Button>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <Button variant="outline" onClick={() => window.location.href = '/allproductbystatus'}>
            View All
          </Button>
        </div>
      </div>

      {/* About Us */}
      <div className="bg-gray-100 rounded-2xl px-6 py-14 space-y-10">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-800">Who We Are</h2>
          <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
            We're a platform empowering people to buy and sell reliable refurbished products, reducing waste and saving money.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="space-y-4">
            <ShieldCheck className="mx-auto text-blue-600" size={38} />
            <h3 className="text-xl font-semibold text-gray-700">Verified Sellers</h3>
            <p className="text-gray-600 text-sm">Each seller is manually verified to ensure trust and transparency.</p>
          </div>
          <div className="space-y-4">
            <DollarSign className="mx-auto text-green-600" size={38} />
            <h3 className="text-xl font-semibold text-gray-700">Smart Savings</h3>
            <p className="text-gray-600 text-sm">Buy top-tier products for up to 70% less than new ones.</p>
          </div>
          <div className="space-y-4">
            <Info className="mx-auto text-yellow-500" size={38} />
            <h3 className="text-xl font-semibold text-gray-700">Eco-Friendly Mission</h3>
            <p className="text-gray-600 text-sm">Reduce e-waste by choosing high-quality refurbished items.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
