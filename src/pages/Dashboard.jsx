import React from "react";
import MainLayout from "../layouts/MainLayout";
import BarChart from "../components/charts/BarChart";
import LineChart from "../components/charts/LineChart";
import PieChart from "../components/charts/PieChart";
import { TrendingUp, Users, DollarSign, ShoppingBag } from "lucide-react";

const Dashboard = () => {
  // Dados para os gráficos
  const salesData = {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
    datasets: [
      {
        label: "Vendas 2024",
        data: [12, 19, 3, 5, 2, 3],
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const visitorsData = {
    labels: ["Novos", "Recorrentes"],
    datasets: [
      {
        data: [300, 200],
        backgroundColor: ["#4F46E5", "#818CF8"],
      },
    ],
  };

  return (
    <MainLayout>
      {/* Cabeçalho */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Bem-vindo ao seu painel de controle
        </p>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Vendas Totais"
          value="MZN 24.532"
          icon={<DollarSign className="text-green-500" size={24} />}
          trend="+12%"
        />
        <StatCard
          title="Novos Clientes"
          value="145"
          icon={<Users className="text-blue-500" size={24} />}
          trend="+5%"
        />
        <StatCard
          title="Pedidos"
          value="64"
          icon={<ShoppingBag className="text-purple-500" size={24} />}
          trend="+8%"
        />
        <StatCard
          title="Crescimento"
          value="28%"
          icon={<TrendingUp className="text-orange-500" size={24} />}
          trend="+2%"
        />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            Vendas Mensais
          </h2>
          <LineChart data={salesData} options={{ responsive: true }} />
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            Distribuição de Visitantes
          </h2>
          <PieChart data={visitorsData} options={{ responsive: true }} />
        </div>
      </div>

      {/* Atividades Recentes */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
          Atividades Recentes
        </h2>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <ActivityItem key={index} {...activity} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

// Componente para os cards de estatísticas
const StatCard = ({ title, value, icon, trend }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">{title}</p>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-1">
            {value}
          </h3>
        </div>
        {icon}
      </div>
      <div className="mt-4">
        <span className="text-green-500 text-sm font-semibold">{trend}</span>
        <span className="text-gray-600 dark:text-gray-400 text-sm ml-1">
          vs mês anterior
        </span>
      </div>
    </div>
  );
};

// Componente para os itens de atividade
const ActivityItem = ({ title, time, description }) => {
  return (
    <div className="border-b dark:border-gray-700 pb-4">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-gray-800 dark:text-white font-medium">{title}</h4>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
            {description}
          </p>
        </div>
        <span className="text-sm text-gray-500">{time}</span>
      </div>
    </div>
  );
};

// Dados de exemplo para atividades recentes
const recentActivities = [
  {
    title: "Novo pedido recebido",
    time: "2 min atrás",
    description: "Cliente #123 realizou um pedido de R$ 543,00",
  },
  {
    title: "Cliente cadastrado",
    time: "1 hora atrás",
    description: "Maria Silva completou seu cadastro",
  },
  {
    title: "Produto atualizado",
    time: "3 horas atrás",
    description: "Estoque do produto XYZ foi atualizado",
  },
];

export default Dashboard;
