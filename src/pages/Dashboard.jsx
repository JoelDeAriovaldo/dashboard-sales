import React, { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import Card from "../components/common/Card";
import DataTable from "../components/common/DataTable";
import { BarChart, LineChart, PieChart } from "../components/charts/index";
import {
  TrendingUp,
  Users,
  DollarSign,
  ShoppingBag,
  Package,
  Clock,
  Edit,
  Eye,
  Trash2,
} from "lucide-react";

const Dashboard = () => {
  // Dados dos gráficos
  const salesData = {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
    datasets: [
      {
        label: "Vendas 2024",
        data: [12000, 19000, 15000, 25000, 22000, 30000],
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const supplierColumns = [
    {
      Header: "Fornecedor",
      accessor: "name",
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <img
            src={row?.logo || "https://via.placeholder.com/40"}
            alt={value}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-medium">{value}</p>
            <p className="text-sm text-gray-500">{row.category}</p>
          </div>
        </div>
      ),
    },
    {
      Header: "Pedidos",
      accessor: "orders",
      render: (value) => value || 0,
    },
    {
      Header: "Total Compras",
      accessor: "totalPurchases",
      render: (value) => `MZN ${value.toLocaleString()}`,
    },
    {
      Header: "Avaliação",
      accessor: "rating",
      render: (value) => (
        <div className="flex items-center gap-1">
          <span className="text-yellow-500">★</span>
          <span>{value.toFixed(1)}</span>
        </div>
      ),
    },
  ];

  const categoryData = {
    labels: ["Eletrônicos", "Moda", "Casa", "Esporte", "Acessórios"],
    datasets: [
      {
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          "#4F46E5",
          "#818CF8",
          "#60A5FA",
          "#34D399",
          "#F472B6",
        ],
      },
    ],
  };

  const stockData = {
    labels: ["Smartphones", "Laptops", "Tablets", "Watches", "Earbuds"],
    datasets: [
      {
        label: "Em Estoque",
        data: [150, 89, 95, 230, 175],
        backgroundColor: "rgba(99, 102, 241, 0.5)",
        borderColor: "rgb(99, 102, 241)",
        borderWidth: 1,
      },
      {
        label: "Estoque Mínimo",
        data: [50, 30, 40, 60, 45],
        backgroundColor: "rgba(239, 68, 68, 0.5)",
        borderColor: "rgb(239, 68, 68)",
        borderWidth: 1,
      },
    ],
  };

  const productColumns = [
    {
      Header: "Produto",
      accessor: "product",
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <img
            src={row?.image || "https://via.placeholder.com/40"}
            alt={value || "Produto"}
            className="w-10 h-10 rounded-md object-cover"
          />
          <span>{value || "Sem nome"}</span>
        </div>
      ),
    },
    {
      Header: "Vendas",
      accessor: "sales",
      render: (value) => value || 0,
    },
    {
      Header: "Receita",
      accessor: "revenue",
      render: (value) => value || "MZN 0",
    },
    {
      Header: "Margem",
      accessor: "margin",
      render: (value) => value || "0%",
    },
  ];

  const topProducts = [
    {
      id: 1,
      product: "Smartphone XYZ",
      image: "https://via.placeholder.com/40",
      sales: 150,
      revenue: "MZN 45.000",
      margin: "32%",
    },
    {
      id: 2,
      product: "Laptop Pro",
      image: "https://via.placeholder.com/40",
      sales: 89,
      revenue: "MZN 178.000",
      margin: "28%",
    },
    {
      id: 3,
      product: "Smart Watch",
      image: "https://via.placeholder.com/40",
      sales: 230,
      revenue: "MZN 34.500",
      margin: "45%",
    },
    {
      id: 4,
      product: "Wireless Earbuds",
      image: "https://via.placeholder.com/40",
      sales: 175,
      revenue: "MZN 26.250",
      margin: "38%",
    },
    {
      id: 5,
      product: "Tablet Ultra",
      image: "https://via.placeholder.com/40",
      sales: 95,
      revenue: "MZN 76.000",
      margin: "35%",
    },
  ];

  const tableActions = [
    {
      icon: Eye,
      color: "blue",
      onClick: (row) => {
        console.log("Visualizar produto:", row);
        // Implementar lógica de visualização
      },
    },
    {
      icon: Edit,
      color: "yellow",
      onClick: (row) => {
        console.log("Editar produto:", row);
        // Implementar lógica de edição
      },
    },
    {
      icon: Trash2,
      color: "red",
      onClick: (row) => {
        console.log("Excluir produto:", row);
        // Implementar lógica de exclusão
      },
    },
  ];

  const topSuppliers = [
    {
      id: 1,
      name: "Tech Solutions Ltd",
      logo: "https://via.placeholder.com/40",
      category: "Eletrônicos",
      orders: 245,
      totalPurchases: 890000,
      rating: 4.8,
    },
    {
      id: 2,
      name: "Global Imports Co",
      logo: "https://via.placeholder.com/40",
      category: "Diversos",
      orders: 189,
      totalPurchases: 654000,
      rating: 4.5,
    },
    {
      id: 3,
      name: "Premium Gadgets",
      logo: "https://via.placeholder.com/40",
      category: "Eletrônicos",
      orders: 156,
      totalPurchases: 432000,
      rating: 4.7,
    },
    {
      id: 4,
      name: "Fashion World",
      logo: "https://via.placeholder.com/40",
      category: "Moda",
      orders: 134,
      totalPurchases: 378000,
      rating: 4.3,
    },
    {
      id: 5,
      name: "Smart Devices Inc",
      logo: "https://via.placeholder.com/40",
      category: "Eletrônicos",
      orders: 98,
      totalPurchases: 289000,
      rating: 4.6,
    },
  ];

  return (
    <MainLayout>
      {/* Metrics Cards - Improved Responsiveness */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-5">
        <Card variant="elevated" className="p-2 sm:p-3">
          <StatCard
            title="Vendas de Hoje"
            value="MZN 24.532"
            icon={<DollarSign className="text-green-500" size={18} />}
            trend="+12%"
            description="vs. ontem"
          />
        </Card>

        <Card variant="elevated" className="p-2 sm:p-3">
          <StatCard
            title="Produtos em Estoque"
            value="1.234"
            icon={<Package className="text-blue-500" size={18} />}
            trend="-5"
            description="produtos baixo estoque"
            trendColor="text-red-500"
          />
        </Card>

        <Card variant="elevated" className="p-2 sm:p-3">
          <StatCard
            title="Pedidos Ativos"
            value="64"
            icon={<Clock className="text-purple-500" size={18} />}
            trend="23"
            description="em preparação"
          />
        </Card>

        <Card variant="elevated" className="p-2 sm:p-3">
          <StatCard
            title="Usuários Ativos"
            value="892"
            icon={<Users className="text-orange-500" size={18} />}
            trend="+15%"
            description="últimas 24h"
          />
        </Card>
      </div>

      {/* Charts - More Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-5">
        <Card
          title="Vendas Mensais"
          variant="elevated"
          className="lg:col-span-2 h-72 md:h-80"
        >
          <LineChart
            data={salesData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: "bottom",
                },
              },
            }}
          />
        </Card>

        <Card
          title="Vendas por Categoria"
          variant="elevated"
          className="h-72 md:h-80"
        >
          <PieChart
            data={categoryData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: "bottom",
                },
              },
            }}
          />
        </Card>

        <Card
          title="Níveis de Estoque"
          variant="elevated"
          className="lg:col-span-3 h-56 md:h-64"
        >
          <BarChart
            data={stockData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: "bottom",
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: "Quantidade",
                  },
                },
                x: {
                  title: {
                    display: true,
                    text: "Produtos",
                  },
                },
              },
            }}
          />
        </Card>
      </div>

      {/* Tables - Improved Responsiveness */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card
          title="Produtos Mais Vendidos"
          variant="elevated"
          className="overflow-x-auto"
        >
          <DataTable
            columns={productColumns}
            data={topProducts}
            pageSize={5}
            actions={tableActions}
          />
        </Card>

        <Card
          title="Top Fornecedores"
          variant="elevated"
          className="overflow-x-auto"
        >
          <DataTable
            columns={supplierColumns}
            data={topSuppliers}
            pageSize={5}
            actions={[
              {
                icon: Eye,
                color: "blue",
                onClick: (row) => console.log("Ver detalhes:", row),
              },
              {
                icon: Edit,
                color: "yellow",
                onClick: (row) => console.log("Editar fornecedor:", row),
              },
              {
                icon: Trash2,
                color: "red",
                onClick: (row) => console.log("Remover fornecedor:", row),
              },
            ]}
          />
        </Card>
      </div>
    </MainLayout>
  );
};

// StatCard remains the same as in the original file
const StatCard = ({
  title,
  value,
  icon,
  trend,
  description,
  trendColor = "text-green-500",
}) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-start mb-2">
        <div>
          <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
            {title}
          </p>
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mt-1">
            {value}
          </h3>
        </div>
        {icon}
      </div>
      <div className="mt-auto">
        <span className={`${trendColor} text-xs sm:text-sm font-semibold`}>
          {trend}
        </span>
        <span className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm ml-1">
          {description}
        </span>
      </div>
    </div>
  );
};

export default Dashboard;
