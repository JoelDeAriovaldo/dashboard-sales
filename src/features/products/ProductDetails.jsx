import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Edit, Trash, Package, Tag, Boxes } from "lucide-react";
import MainLayout from "../../layouts/MainLayout";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import { useProduct } from "../../hooks/useProduct";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, loading, error } = useProduct(id);
  const [activeImage, setActiveImage] = useState(0);

  return (
    <MainLayout>
      <div className="p-6 md:p-8 lg:p-10 space-y-6 animate-fade-in">
        {/* Header com Ações */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Button onClick={() => navigate("/products")} variant="ghost">
              <ArrowLeft className="mr-2" size={20} />
              Voltar
            </Button>
            <h1 className="text-2xl font-bold hidden md:block">
              {product?.name}
            </h1>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={() => navigate(`/products/edit/${id}`)}
            >
              <Edit size={18} className="mr-2" />
              Editar
            </Button>
            <Button variant="danger">
              <Trash size={18} className="mr-2" />
              Excluir
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Galeria de Imagens */}
          <div className="lg:col-span-5 space-y-4">
            <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 shadow-lg">
              <img
                src={
                  product?.images?.[activeImage]?.image_url ||
                  "https://via.placeholder.com/400"
                }
                alt={product?.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="grid grid-cols-5 gap-2">
              {product?.images?.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    activeImage === idx
                      ? "border-blue-500 ring-2 ring-blue-500/50"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={img.image_url}
                    alt={`${product.name} ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Informações do Produto */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-3xl font-bold md:hidden">{product?.name}</h1>

            {/* Cards de Informações */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="glass-morphism p-4 rounded-xl">
                <div className="flex items-center space-x-2 mb-2">
                  <Tag className="text-blue-500" />
                  <h3 className="font-semibold">Preço</h3>
                </div>
                <p className="text-2xl font-bold text-blue-600">
                  R$ {parseFloat(product?.sale_price).toFixed(2)}
                </p>
                <p className="text-sm text-gray-500">
                  Compra: R$ {parseFloat(product?.purchase_price).toFixed(2)}
                </p>
              </div>

              <div className="glass-morphism p-4 rounded-xl">
                <div className="flex items-center space-x-2 mb-2">
                  <Boxes className="text-green-500" />
                  <h3 className="font-semibold">Estoque</h3>
                </div>
                <p className="text-2xl font-bold text-green-600">
                  {product?.initial_stock} un
                </p>
                <p className="text-sm text-gray-500">
                  Mínimo: {product?.min_stock} un
                </p>
              </div>

              <div className="glass-morphism p-4 rounded-xl">
                <div className="flex items-center space-x-2 mb-2">
                  <Package className="text-purple-500" />
                  <h3 className="font-semibold">Categoria</h3>
                </div>
                <p className="text-lg font-semibold">{product?.category}</p>
                <p className="text-sm text-gray-500">{product?.brand}</p>
              </div>
            </div>

            {/* Especificações */}
            <div className="glass-morphism p-6 rounded-xl space-y-4">
              <h2 className="text-xl font-semibold">Especificações</h2>
              <div className="grid grid-cols-2 gap-y-4">
                <div>
                  <p className="text-sm text-gray-500">Modelo</p>
                  <p className="font-medium">{product?.model || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Cor</p>
                  <p className="font-medium">{product?.color || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Dimensões</p>
                  <p className="font-medium">{product?.dimensions || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Peso</p>
                  <p className="font-medium">
                    {product?.weight ? `${product.weight}kg` : "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Descrição */}
            <div className="glass-morphism p-6 rounded-xl">
              <h2 className="text-xl font-semibold mb-3">Descrição</h2>
              <p className="text-gray-700 whitespace-pre-line">
                {product?.description || "Sem descrição disponível"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductDetails;
