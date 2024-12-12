import React, { useState, useEffect } from "react";
import { X, Upload } from "lucide-react";
import Button from "../../components/common/Button";

const ProductForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "",
    purchasePrice: "",
    salePrice: "",
    color: "",
    model: "",
    barcode: "",
    initialStock: "",
    size: "",
    minStock: "",
    weight: "",
    manufactureDate: "",
    expiryDate: "",
    description: "",
    images: [],
  });

  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setImagePreviews(initialData.images || []);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form data
    const requiredFields = [
      "name",
      "purchasePrice",
      "salePrice",
      "initialStock",
    ];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      alert(
        `Please fill in the following required fields: ${missingFields.join(
          ", "
        )}`
      );
      return;
    }

    // Convert numeric fields to numbers
    const processedFormData = {
      ...formData,
      purchasePrice: parseFloat(formData.purchasePrice),
      salePrice: parseFloat(formData.salePrice),
      initialStock: parseInt(formData.initialStock),
      minStock: parseInt(formData.minStock) || 0,
    };

    // Call the onSubmit prop function with the processed form data
    if (onSubmit) {
      onSubmit(processedFormData);
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    // Limit to 5 images
    if (imagePreviews.length + files.length > 5) {
      alert("You can only upload up to 5 images");
      return;
    }

    const newPreviews = files.map((file) => URL.createObjectURL(file));

    setImagePreviews((prev) => [...prev, ...newPreviews]);
    setFormData((prev) => ({
      ...prev,
      images: [...(prev.images || []), ...files],
    }));
  };

  const removeImage = (indexToRemove) => {
    setImagePreviews((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove),
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-bold mb-4">
        {initialData ? "Editar Produto" : "Adicionar Novo Produto"}
      </h2>

      {/* Seção de Upload de Imagens */}
      <div className="space-y-2">
        <label className="block text-sm font-medium mb-1">
          Imagens (Máx 5)
        </label>
        <div className="flex flex-wrap gap-4 mb-4">
          {imagePreviews.map((preview, index) => (
            <div key={index} className="relative">
              <img
                src={preview}
                alt={`Preview ${index + 1}`}
                className="w-24 h-24 object-cover rounded"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
              >
                <X size={16} />
              </button>
            </div>
          ))}

          {imagePreviews.length < 5 && (
            <div className="relative border-2 border-dashed rounded w-24 h-24 flex items-center justify-center">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <Upload size={24} className="text-gray-400" />
            </div>
          )}
        </div>
      </div>

      {/* Informações Básicas */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Informações Básicas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nome</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Marca</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Categoria</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      </div>

      {/* Preços e Estoque */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Preços e Estoque</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Preço de Compra
            </label>
            <input
              type="number"
              name="purchasePrice"
              value={formData.purchasePrice}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              step="0.01"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Preço de Venda
            </label>
            <input
              type="number"
              name="salePrice"
              value={formData.salePrice}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              step="0.01"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Estoque Inicial
            </label>
            <input
              type="number"
              name="initialStock"
              value={formData.initialStock}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Estoque Mínimo
            </label>
            <input
              type="number"
              name="minStock"
              value={formData.minStock}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      </div>

      {/* Especificações */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Especificações</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Modelo</label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Cor</label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Código de Barras
            </label>
            <input
              type="text"
              name="barcode"
              value={formData.barcode}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Dimensões (LxAxP)
            </label>
            <input
              type="text"
              name="size"
              value={formData.size}
              onChange={handleChange}
              placeholder="00x00x00"
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Peso</label>
            <input
              type="text"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      </div>

      {/* Datas */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Datas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Data de Fabricação
            </label>
            <input
              type="date"
              name="manufactureDate"
              value={formData.manufactureDate}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Data de Validade
            </label>
            <input
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      </div>

      {/* Descrição */}
      <div className="space-y-2">
        <label className="block text-sm font-medium mb-1">Descrição</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          rows="3"
        />
      </div>

      <div className="flex gap-4 mt-6">
        <Button type="submit" className="flex-1">
          {initialData ? "Atualizar Produto" : "Adicionar Produto"}
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
