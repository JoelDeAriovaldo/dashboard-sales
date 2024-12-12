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
      icon: Trash2,
      color: "red",
      onClick: handleDeleteSale,
    },
  ];

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    dateRange: {
      start: "",
      end: "",
    },
    customerName: "",
    productName: "",
    minAmount: "",
    maxAmount: "",
    status: "",
  });

  // Adicione antes do return
  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    setIsFilterModalOpen(false);
    // Aqui você implementaria a lógica de filtrar os dados
  };

  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState("csv");

  // Adicione a função de exportação
  const handleExport = () => {
    // Aqui você implementaria a lógica real de exportação
    console.log(`Exportando dados em formato ${exportFormat}`);
    setIsExportModalOpen(false);
  };

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

        <Button
          className="flex items-center gap-2"
          onClick={() => setIsFilterModalOpen(true)}
        >
          <Filter size={16} />
          Filtros Avançados
        </Button>

        <Button
          className="flex items-center gap-2 bg-green-600"
          onClick={() => setIsExportModalOpen(true)}
        >
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

      <Modal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
      >
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Filtros Avançados</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Data Inicial
              </label>
              <input
                type="date"
                value={filters.dateRange.start}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    dateRange: { ...prev.dateRange, start: e.target.value },
                  }))
                }
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Data Final
              </label>
              <input
                type="date"
                value={filters.dateRange.end}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    dateRange: { ...prev.dateRange, end: e.target.value },
                  }))
                }
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Cliente</label>
            <input
              type="text"
              value={filters.customerName}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  customerName: e.target.value,
                }))
              }
              className="w-full p-2 border rounded"
              placeholder="Nome do cliente"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Produto</label>
            <input
              type="text"
              value={filters.productName}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  productName: e.target.value,
                }))
              }
              className="w-full p-2 border rounded"
              placeholder="Nome do produto"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Valor Mínimo
              </label>
              <input
                type="number"
                value={filters.minAmount}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    minAmount: e.target.value,
                  }))
                }
                className="w-full p-2 border rounded"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Valor Máximo
              </label>
              <input
                type="number"
                value={filters.maxAmount}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    maxAmount: e.target.value,
                  }))
                }
                className="w-full p-2 border rounded"
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              value={filters.status}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  status: e.target.value,
                }))
              }
              className="w-full p-2 border rounded"
            >
              <option value="">Todos</option>
              <option value="Completo">Completo</option>
              <option value="Pendente">Pendente</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button
              variant="secondary"
              onClick={() => setIsFilterModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button onClick={() => handleApplyFilters(filters)}>
              Aplicar Filtros
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      >
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Exportar Relatório</h2>

          <div>
            <label className="block text-sm font-medium mb-2">
              Formato do Arquivo
            </label>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="csv"
                  name="format"
                  value="csv"
                  checked={exportFormat === "csv"}
                  onChange={(e) => setExportFormat(e.target.value)}
                  className="mr-2"
                />
                <label htmlFor="csv">CSV (Excel)</label>
              </div>

              <div className="flex items-center">
                <input
                  type="radio"
                  id="pdf"
                  name="format"
                  value="pdf"
                  checked={exportFormat === "pdf"}
                  onChange={(e) => setExportFormat(e.target.value)}
                  className="mr-2"
                />
                <label htmlFor="pdf">PDF</label>
              </div>

              <div className="flex items-center">
                <input
                  type="radio"
                  id="xlsx"
                  name="format"
                  value="xlsx"
                  checked={exportFormat === "xlsx"}
                  onChange={(e) => setExportFormat(e.target.value)}
                  className="mr-2"
                />
                <label htmlFor="xlsx">Excel (XLSX)</label>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button
              variant="secondary"
              onClick={() => setIsExportModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button className="bg-green-600" onClick={handleExport}>
              Exportar Agora
            </Button>
          </div>
        </div>
      </Modal>
    </MainLayout>
  );
};

export default SalesReport;
