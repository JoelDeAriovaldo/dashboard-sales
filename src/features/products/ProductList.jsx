import React, { useState, useCallback } from "react";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import ProductForm from "./ProductForm";
import MainLayout from "../../layouts/MainLayout";
import DataTable from "../../components/common/DataTable";
import { toast } from "sonner";
import { useProducts } from "../../hooks/useProducts";
import { productService } from "../../services/products";
import Loader from "../../components/common/Loader";

const ProductList = () => {
  const { products, loading, error, refetchProducts } = useProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  const handleAddProduct = async (newProduct) => {
    try {
      await productService.create(newProduct);
      refetchProducts();
      setIsModalOpen(false);
      toast.success("Produto adicionado com sucesso");
    } catch (error) {
      toast.error("Erro ao adicionar produto");
    }
  };

  const handleUpdateProduct = async (updatedProduct) => {
    try {
      await productService.update(updatedProduct.id, updatedProduct);
      refetchProducts();
      setIsModalOpen(false);
      toast.success("Produto atualizado com sucesso");
    } catch (error) {
      toast.error("Erro ao atualizar produto");
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await productService.delete(productId);
      refetchProducts();
      toast.success("Produto excluído com sucesso");
    } catch (error) {
      toast.error("Erro ao excluir produto");
    }
  };

  const openEditModal = useCallback((product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  }, []);

  const openViewModal = useCallback(
    (product) => {
      navigate(`/products/${product.id}`);
    },
    [navigate]
  );

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

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader />
          </div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <DataTable
            columns={columns}
            data={products}
            actions={actions}
            emptyState={{
              title: "Nenhum Produto",
              description: "Adicione seu primeiro produto para começar",
              icon: <Plus className="text-gray-400" size={48} />,
            }}
          />
        )}

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
