import React from "react";
import { LabeledInput } from "../../components/common/Input";

const CustomerForm = ({ onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const customer = {
      name: formData.get("name"),
      email: formData.get("email"),
      nuit: formData.get("nuit"),
      phone: formData.get("phone"),
      address: formData.get("address"),
    };
    onSubmit(customer);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <LabeledInput
        label="Nome"
        name="name"
        required
        placeholder="Nome do cliente"
      />
      <LabeledInput
        label="Email"
        name="email"
        type="email"
        required
        placeholder="email@exemplo.com"
      />
      <LabeledInput
        label="NUIT"
        name="nuit"
        required
        placeholder="Número de NUIT"
      />
      <LabeledInput
        label="Telefone"
        name="phone"
        required
        placeholder="Número de telefone"
      />
      <LabeledInput
        label="Endereço"
        name="address"
        required
        placeholder="Endereço completo"
      />

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Salvar Cliente
        </button>
      </div>
    </form>
  );
};

export default CustomerForm;
