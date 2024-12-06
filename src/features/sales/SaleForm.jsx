import React, { useState, useEffect } from "react";
import Button from "../../components/common/Button";

const SaleForm = ({ sale, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    customer: "",
    product: "",
    amount: "",
    date: "",
    status: "Pendente",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (sale) {
      setFormData(sale);
    }
  }, [sale]);

  const validate = () => {
    const newErrors = {};
    if (!formData.customer) newErrors.customer = "Cliente é obrigatório";
    if (!formData.product) newErrors.product = "Produto é obrigatório";
    if (!formData.amount) newErrors.amount = "Valor é obrigatório";
    if (!formData.date) newErrors.date = "Data é obrigatória";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Cliente</label>
        <input
          type="text"
          value={formData.customer}
          onChange={(e) =>
            setFormData({ ...formData, customer: e.target.value })
          }
          className="w-full p-2 border rounded-md"
        />
        {errors.customer && (
          <span className="text-red-500 text-sm">{errors.customer}</span>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Produto</label>
        <input
          type="text"
          value={formData.product}
          onChange={(e) =>
            setFormData({ ...formData, product: e.target.value })
          }
          className="w-full p-2 border rounded-md"
        />
        {errors.product && (
          <span className="text-red-500 text-sm">{errors.product}</span>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Valor</label>
        <input
          type="number"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          className="w-full p-2 border rounded-md"
        />
        {errors.amount && (
          <span className="text-red-500 text-sm">{errors.amount}</span>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Data</label>
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="w-full p-2 border rounded-md"
        />
        {errors.date && (
          <span className="text-red-500 text-sm">{errors.date}</span>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Status</label>
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          className="w-full p-2 border rounded-md"
        >
          <option value="Pendente">Pendente</option>
          <option value="Completo">Completo</option>
          <option value="Cancelado">Cancelado</option>
        </select>
      </div>

      <div className="flex gap-2 justify-end mt-4">
        <Button type="button" onClick={onCancel} className="bg-gray-500">
          Cancelar
        </Button>
        <Button type="submit">{sale ? "Atualizar" : "Criar"} Venda</Button>
      </div>
    </form>
  );
};

export default SaleForm;
