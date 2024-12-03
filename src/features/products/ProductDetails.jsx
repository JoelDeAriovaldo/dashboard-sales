import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Simular busca do produto
  const product = {
    id: 1,
    name: "Product Example",
    description: "Product description here",
    price: 99.99,
    stock: 50,
    category: "Category",
    sku: "SKU123",
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <Button onClick={() => navigate("/products")}>Back to List</Button>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Description</h3>
            <p className="mt-1">{product.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Price</h3>
              <p className="mt-1">R$ {product.price}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Stock</h3>
              <p className="mt-1">{product.stock} units</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Category</h3>
              <p className="mt-1">{product.category}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">SKU</h3>
              <p className="mt-1">{product.sku}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
