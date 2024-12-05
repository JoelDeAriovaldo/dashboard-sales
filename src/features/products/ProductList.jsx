import React, { useState } from "react";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import ProductForm from "./ProductForm";
import MainLayout from "../../layouts/MainLayout";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAddProduct = (newProduct) => {
    setProducts([...products, { ...newProduct, id: Date.now() }]);
    setIsModalOpen(false);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter((p) => p.id !== productId));
  };

  return (
    <MainLayout>
      <div className="p-6 md:p-8 lg:p-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Products
          </h1>
          <Button onClick={() => setIsModalOpen(true)}>Add Product</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-4 shadow bg-white dark:bg-gray-800"
            >
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                {product.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Stock: {product.stock}
              </p>
              <p className="text-gray-800 dark:text-white">
                R$ {product.price}
              </p>
              <div className="mt-4 flex gap-2">
                <Button onClick={() => handleEditProduct(product)}>Edit</Button>
                <Button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="bg-red-500"
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedProduct(null);
          }}
        >
          <ProductForm
            onSubmit={handleAddProduct}
            initialData={selectedProduct}
          />
        </Modal>
      </div>
    </MainLayout>
  );
};

export default ProductList;
