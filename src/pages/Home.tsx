import { useState, useEffect } from "react";
import type { Product, ProductsResponse } from "../types/Product";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';

const Home = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const dispatch = useDispatch();

    const handlebutton = () => {
        dispatch(logout());
        window.location.href = '/';
    }

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products");
      const data: ProductsResponse = await response.json();
      console.log(data.products);
      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <main className="min-h-screen bg-gray-200">
      <div className="p-4">
        <button onClick={() => handlebutton()} className="bg-red-500 text-white px-4 py-2 rounded-lg">
          Logout
        </button>
      </div>
    <div className="grid gap-8 grid-cols-1 p-3">
      {products.map((product) => (
        <div key={product.id}>
          <div className="flex flex-row items-center p-10 bg-white rounded-2xl shadow-md">
            <div>
                <img className="h-68 w-full rounded-t-2xl shadow-md" src={product.images[0]} alt={product.title} />
            </div>
            <div className="p-4">
              <div className="cursor-pointer">
              <Link to={`/product/${product.id}`}>
              <h2 className="font-medium text-2xl">{product.title}</h2>
              </Link>
              </div>
              <p className="mt-2 text-gray-600"><span className="font-medium text-xl">Category: </span>{product.category}</p>
              <p className="mt-2 text-gray-600"><span className="font-medium text-xl">Warranty: </span>{product.warrantyInformation}</p>
              <p>${product.price}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
    </main>
  )
}

export default Home;