import React, { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import DataTable from "../../components/common/DataTable";
import { Eye, Download, Filter, Edit, Trash2, Plus } from "lucide-react";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import SaleForm from "../sales/SaleForm";

const SalesReport = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("today");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);
  const [salesData, setSalesData] = useState([
    {
      id: "#001",
      customer: "João Silva",
      product: "Produto A",
      amount: "1200",
      date: "2024-03-20",
      status: "Completo",
    },
  ]);

  const handleCreateSale = (newSale) => {
    setSalesData([
      ...salesData,
      { ...newSale, id: `#${String(salesData.length + 1).padStart(3, "0")}` },
    ]);
    setIsModalOpen(false);
  };

  const handleEditSale = (sale) => {
    setSalesData(salesData.map((item) => (item.id === sale.id ? sale : item)));
    setIsModalOpen(false);
    setSelectedSale(null);
  };

  const handleDeleteSale = (sale) => {
    if (window.confirm("Tem certeza que deseja excluir esta venda?")) {
      setSalesData(salesData.filter((item) => item.id !== sale.id));
    }
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

  const actions = [
    {
      icon: Eye,
      color: "blue",
      onClick: (row) => console.log("Visualizar", row),
    },
    {
      icon: Edit,
      color: "yellow",
      onClick: (row) => {
        setSelectedSale(row);
        setIsModalOpen(true);
      },
    },
    {
      icon: Trash2,
      color: "red",
      onClick: handleDeleteSale,
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
        <Button
          onClick={() => {
            setSelectedSale(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-600 flex items-center gap-2"
        >
          <Plus size={16} />
          Nova Venda
        </Button>

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
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedSale(null);
        }}
      >
        <h2 className="text-xl font-semibold mb-4">
          {selectedSale ? "Editar Venda" : "Nova Venda"}
        </h2>
        <SaleForm
          sale={selectedSale}
          onSubmit={selectedSale ? handleEditSale : handleCreateSale}
          onCancel={() => {
            setIsModalOpen(false);
            setSelectedSale(null);
          }}
        />
      </Modal>
    </MainLayout>
  );
};

export default SalesReport;
