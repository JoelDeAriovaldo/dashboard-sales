import React, { useState, useCallback } from "react";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import ProductForm from "./ProductForm";
import MainLayout from "../../layouts/MainLayout";
import DataTable from "../../components/common/DataTable";
import { toast } from "sonner";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAddProduct = useCallback((newProduct) => {
    const productToAdd = {
      ...newProduct,
      id: Date.now(),
      createdAt: new Date().toLocaleString(),
    };

    setProducts((prevProducts) => [...prevProducts, productToAdd]);
    setIsModalOpen(false);
    toast.success("Product added successfully");
  }, []);

  const handleUpdateProduct = useCallback((updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === updatedProduct.id ? { ...updatedProduct } : p
      )
    );
    setIsModalOpen(false);
    toast.success("Product updated successfully");
  }, []);

  const handleDeleteProduct = useCallback((productId) => {
    setProducts((prevProducts) =>
      prevProducts.filter((p) => p.id !== productId)
    );
    toast.success("Product deleted successfully");
  }, []);

  const openEditModal = useCallback((product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  }, []);

  const openViewModal = useCallback((product) => {
    // Lógica para abrir o modal de visualização do produto
    setSelectedProduct(product);
    setIsModalOpen(true);
  }, []);

  const columns = [
    {
      Header: "Name",
      accessor: "name",
      sortable: true,
    },
    {
      Header: "Stock",
      accessor: "stock",
      sortable: true,
      render: (value) =>
        value > 0 ? value : <span className="text-red-500">{value}</span>,
    },
    {
      Header: "Price",
      accessor: "price",
      sortable: true,
      render: (value) => `R$ ${parseFloat(value).toFixed(2)}`,
    },
    {
      Header: "Created At",
      accessor: "createdAt",
      sortable: true,
      render: (value) => new Date(value).toLocaleDateString(),
    },
  ];

  const actions = [
    {
      icon: Eye,
      color: "green",
      onClick: openViewModal,
    },
    {
      icon: Edit,
      color: "blue",
      onClick: openEditModal,
    },
    {
      icon: Trash2,
      color: "red",
      onClick: (row) => handleDeleteProduct(row.id),
    },
  ];

  return (
    <MainLayout>
      <div className="p-6 md:p-8 lg:p-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Product Management
          </h1>
          <Button
            onClick={() => {
              setSelectedProduct(null);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2"
          >
            <Plus size={20} /> Add Product
          </Button>
        </div>

        <DataTable
          columns={columns}
          data={products}
          actions={actions}
          emptyState={{
            title: "No Products",
            description: "Add your first product to get started",
            icon: <Plus className="text-gray-400" size={48} />,
          }}
        />

        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedProduct(null);
          }}
        >
          <ProductForm
            onSubmit={selectedProduct ? handleUpdateProduct : handleAddProduct}
            initialData={selectedProduct}
          />
        </Modal>
      </div>
    </MainLayout>
  );
};

export default ProductList;
