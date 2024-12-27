import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { X, Upload } from "lucide-react";
import Button from "../../components/common/Button";
import { Input, CurrencyInput } from "../../components/common/Input";

const ProductForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "",
    purchasePrice: "",
    salePrice: "",
    initialStock: "0",
    minStock: "0",
    model: "",
    color: "",
    barcode: "",
    dimensions: "",
    weight: "0",
    manufactureDate: "",
    expiryDate: "",
    description: "",
    images: [],
  });

  const [errors, setErrors] = useState({});
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        brand: initialData.brand || "",
        category: initialData.category || "",
        purchasePrice: initialData.purchase_price?.toString() || "",
        salePrice: initialData.sale_price?.toString() || "",
        initialStock: initialData.initial_stock?.toString() || "0",
        minStock: initialData.min_stock?.toString() || "0",
        model: initialData.model || "",
        color: initialData.color || "",
        barcode: initialData.barcode || "",
        dimensions: initialData.dimensions || "",
        weight: initialData.weight?.toString() || "0",
        manufactureDate: initialData.manufacture_date || "",
        expiryDate: initialData.expiry_date || "",
        description: initialData.description || "",
        images: initialData.images?.map((img) => img.image_url) || [],
      });
      setImagePreviews(initialData.images?.map((img) => img.image_url) || []);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validações obrigatórias
    const requiredFields = {
      name: "Nome é obrigatório",
      brand: "Marca é obrigatória",
      category: "Categoria é obrigatória",
      purchasePrice: "Preço de compra é obrigatório",
      salePrice: "Preço de venda é obrigatório",
      initialStock: "Estoque inicial é obrigatório",
    };

    Object.entries(requiredFields).forEach(([field, message]) => {
      if (!formData[field]) {
        newErrors[field] = message;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const processedData = {
      ...formData,
      purchasePrice: parseFloat(formData.purchasePrice),
      salePrice: parseFloat(formData.salePrice),
      initialStock: parseInt(formData.initialStock),
      minStock: parseInt(formData.minStock),
      weight: parseFloat(formData.weight),
      images: imagePreviews,
    };

    onSubmit(processedData);
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
            <Input
              label="Nome"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              error={errors.name}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Marca</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={(e) =>
                setFormData({ ...formData, brand: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Categoria</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              required
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
              onChange={(e) =>
                setFormData({ ...formData, purchasePrice: e.target.value })
              }
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
              onChange={(e) =>
                setFormData({ ...formData, salePrice: e.target.value })
              }
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
              onChange={(e) =>
                setFormData({ ...formData, initialStock: e.target.value })
              }
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
              onChange={(e) =>
                setFormData({ ...formData, minStock: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
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
              onChange={(e) =>
                setFormData({ ...formData, model: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Cor</label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={(e) =>
                setFormData({ ...formData, color: e.target.value })
              }
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
              onChange={(e) =>
                setFormData({ ...formData, barcode: e.target.value })
              }
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
              onChange={(e) =>
                setFormData({ ...formData, size: e.target.value })
              }
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
              onChange={(e) =>
                setFormData({ ...formData, weight: e.target.value })
              }
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
              onChange={(e) =>
                setFormData({ ...formData, manufactureDate: e.target.value })
              }
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
              onChange={(e) =>
                setFormData({ ...formData, expiryDate: e.target.value })
              }
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
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
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

ProductForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.shape({
    name: PropTypes.string,
    brand: PropTypes.string,
    category: PropTypes.string,
    purchase_price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    sale_price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    initial_stock: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    min_stock: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    model: PropTypes.string,
    color: PropTypes.string,
    barcode: PropTypes.string,
    dimensions: PropTypes.string,
    weight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    manufacture_date: PropTypes.string,
    expiry_date: PropTypes.string,
    description: PropTypes.string,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        image_url: PropTypes.string,
      })
    ),
  }),
};

ProductForm.defaultProps = {
  initialData: null,
};

export default ProductForm;
