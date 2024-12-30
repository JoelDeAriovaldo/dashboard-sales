import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Phone,
  Mail,
  MapPin,
  Hash,
} from "lucide-react";
import MainLayout from "../../layouts/MainLayout";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import { customerService } from "../../services/clientes"; // Corrigido import
import { toast } from "sonner";

const CustomerProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        setLoading(true);
        const data = await customerService.getById(id);
        setCustomer(data);
      } catch (err) {
        setError("Erro ao carregar dados do cliente");
        toast.error("Erro ao carregar dados do cliente");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCustomer();
  }, [id]);

  if (loading)
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-screen">
          <Loader />
        </div>
      </MainLayout>
    );

  if (error)
    return (
      <MainLayout>
        <div className="p-6 text-center text-red-500">{error}</div>
      </MainLayout>
    );

  if (!customer)
    return (
      <MainLayout>
        <div className="p-6 text-center">Cliente não encontrado</div>
      </MainLayout>
    );

  return (
    <MainLayout>
      <div className="p-6 md:p-8 lg:p-10 space-y-6">
        {/* Header com ações */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Button onClick={() => navigate("/crm/customers")} variant="ghost">
              <ArrowLeft className="mr-2" size={20} />
              Voltar
            </Button>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={() => navigate(`/crm/customers/edit/${id}`)}
            >
              <Edit size={18} className="mr-2" />
              Editar
            </Button>
            <Button variant="danger">
              <Trash2 size={18} className="mr-2" />
              Excluir
            </Button>
          </div>
        </div>

        {/* Informações do Cliente */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">{customer.name}</h2>
            <div className="space-y-4">
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Mail className="mr-3" size={20} />
                <span>{customer.email}</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Phone className="mr-3" size={20} />
                <span>{customer.phone}</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Hash className="mr-3" size={20} />
                <span>{customer.nuit}</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <MapPin className="mr-3" size={20} />
                <span>{customer.address}</span>
              </div>
            </div>
          </div>

          {/* Histórico de Pedidos */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Histórico de Pedidos</h2>
            {customer.orders?.length > 0 ? (
              <div className="space-y-3">
                {customer.orders.map((order) => (
                  <div
                    key={order.id}
                    className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Pedido #{order.id}</span>
                      <span className="text-green-600 font-semibold">
                        R$ {order.total.toFixed(2)}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(order.date).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">
                Nenhum pedido realizado
              </p>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CustomerProfile;
