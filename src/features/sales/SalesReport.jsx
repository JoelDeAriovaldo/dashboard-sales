import React, { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import DataTable from "../../components/common/DataTable";
import { Eye, Download, Filter } from "lucide-react";
import Modal from "../../components/common/Modal";
import Button from "../../components/common/Button";
import SaleDetails from "./SaleDetails";

const SalesReport = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("today");

  const handleViewDetails = (sale) => {
    setSelectedSale(sale);
    setIsDetailsModalOpen(true);
  };

  const columns = [
    { Header: "ID", accessor: "id" },
    { Header: "Cliente", accessor: "customer" },
    { Header: "Produto", accessor: "product" },
    {
      Header: "Valor",
      accessor: "amount",
      render: (amount) => `MZN ${Number(amount).toLocaleString()}`,
    },
    {
      Header: "Tipo",
      accessor: "saleType",
      render: (type) => (type === "physical" ? "Loja Física" : "Loja Virtual"),
    },
    {
      Header: "Pagamento",
      accessor: "paymentMethod",
      render: (method) =>
        ({
          cash: "Dinheiro",
          credit_card: "Cartão de Crédito",
          debit_card: "Cartão de Débito",
          bank_transfer: "Transferência",
          pix: "PIX",
        }[method]),
    },
    { Header: "Data", accessor: "date" },
    {
      Header: "Status",
      accessor: "status",
      render: (status) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            status === "Completo"
              ? "bg-green-100 text-green-800"
              : status === "Pendente"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {status}
        </span>
      ),
    },
  ];

  const salesData = [
    {
      id: "#001",
      customer: "João Silva",
      product: "Produto A",
      amount: 1200,
      saleType: "physical",
      paymentMethod: "credit_card",
      date: "2024-03-20",
      status: "Completo",
    },
  ];

  const actions = [
    {
      icon: Eye,
      color: "blue",
      onClick: handleViewDetails,
    },
    {
      icon: Download,
      color: "green",
      onClick: (row) => console.log("Download", row),
    },
  ];

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Relatório de Vendas
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Visualize e exporte relatórios detalhados
        </p>
      </div>

      <div className="mb-6 flex gap-4 items-center">
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="border p-2 rounded-md dark:bg-gray-700 dark:border-gray-600"
        >
          <option value="today">Hoje</option>
          <option value="week">Última Semana</option>
          <option value="month">Último Mês</option>
          <option value="year">Último Ano</option>
        </select>

        <Button className="flex items-center gap-2">
          <Filter size={16} />
          Filtros Avançados
        </Button>

        <Button className="flex items-center gap-2 bg-green-600">
          <Download size={16} />
          Exportar
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={salesData}
        actions={actions}
        pageSize={10}
      />

      <Modal
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedSale(null);
        }}
      >
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Detalhes da Venda</h2>
          {selectedSale && <SaleDetails sale={selectedSale} />}
        </div>
      </Modal>
    </MainLayout>
  );
};

export default SalesReport;
