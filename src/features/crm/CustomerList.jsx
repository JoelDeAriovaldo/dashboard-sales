import React, { useState } from "react";
import { Eye, Edit, Trash2, Plus } from "lucide-react";
import DataTable from "../../components/common/DataTable";
import MainLayout from "../../layouts/MainLayout";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/common/Modal";
import CustomerForm from "../crm/CustomerForm";
import Button from "../../components/common/Button";
import { useCustomers } from "../../hooks/useCustomers";
import { customerService } from "../../services/clientes";

const CustomerList = () => {
  const { customers, loading, error, refetchCustomers } = useCustomers();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleAddCustomer = async (newCustomer) => {
    try {
      await customerService.create(newCustomer);
      toast.success("Cliente adicionado com sucesso");
      refetchCustomers();
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Erro ao adicionar cliente");
    }
  };

  const columns = [
    { Header: "Nome", accessor: "name" },
    { Header: "Email", accessor: "email" },
    { Header: "NUIT", accessor: "nuit" },
    { Header: "Telefone", accessor: "phone" },
    { Header: "Endereço", accessor: "address" },
  ];

  const actions = [
    {
      icon: Eye,
      color: "blue",
      onClick: (row) => navigate(`/crm/customers/${row.id}`),
    },
    {
      icon: Edit,
      color: "yellow",
      onClick: (row) => console.log("Editar cliente:", row),
    },
    {
      icon: Trash2,
      color: "red",
      onClick: (row) => console.log("Excluir cliente:", row),
    },
  ];

  return (
    <MainLayout>
      <div className="p-6 md:p-8 lg:p-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Gerenciamento de Clientes
          </h1>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2"
          >
            <Plus size={20} />
            Adicionar Cliente
          </Button>
        </div>

        <DataTable columns={columns} data={customers} actions={actions} />

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="mb-4">
            <h2 className="text-2xl font-bold">Adicionar Novo Cliente</h2>
          </div>
          <CustomerForm onSubmit={handleAddCustomer} />
        </Modal>
      </div>
    </MainLayout>
  );
};

export default CustomerList;
