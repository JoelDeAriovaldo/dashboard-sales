import React from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";

const CustomerProfile = () => {
  const { id } = useParams();
  const customer = {
    id: 1,
    name: "João Silva",
    email: "joao.silva@example.com",
    phone: "123-456-7890",
    address: "Rua A, 123",
    orders: [
      { id: 1, date: "2023-01-01", total: "R$ 100,00" },
      { id: 2, date: "2023-02-01", total: "R$ 200,00" },
    ],
  };

  return (
    <MainLayout>
      <div className="p-6 md:p-8 lg:p-10">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
          Perfil do Cliente
        </h1>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">{customer.name}</h2>
          <p>Email: {customer.email}</p>
          <p>Telefone: {customer.phone}</p>
          <p>Endereço: {customer.address}</p>
          <h3 className="text-xl font-semibold mt-6 mb-2">Pedidos</h3>
          <ul>
            {customer.orders.map((order) => (
              <li key={order.id}>
                Pedido #{order.id} - {order.date} - {order.total}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </MainLayout>
  );
};

export default CustomerProfile;
