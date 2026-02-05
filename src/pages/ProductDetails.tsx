import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Product } from "../types/Product";

function ProductDetails() {
  const params = useParams();
  const id = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://dummyjson.com/products/${id}`
        );
        const data: Product = await response.json();
        console.log(data);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleSubmit = () => {
    window.history.back();
  }

  if (!product) {
    return <div>Loading...</div>;
  }
  return (
    <main className="min-h-screen bg-gray-300 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-80 object-contain rounded-xl mb-4"
        />
        <p className="text-xl font-semibold text-green-600 mb-2">
          ${product.price}
        </p>
        <p className="mb-4"><span className="font-medium">Rating: </span>{product.rating} / 5</p>
        <p className="mb-4"><span className="font-medium">Brand: </span>{product.brand}</p>
        <p className="mb-4"><span className="font-medium">Category: </span>{product.category}</p>
        <p className="font-medium mb-2">Description:</p>
        <p className="text-gray-700">{product.description}</p>
      </div>
      <button
            className="w-68 mx-auto block bg-indigo-600 text-white py-2.5 rounded-lg
             hover:bg-indigo-700 transition
             disabled:opacity-60 disabled:cursor-not-allowed mt-6"
            onClick={handleSubmit}
          >
            Back
          </button>
    </main>
    
  );
}

export default ProductDetails;
