import React, { useState } from "react";
import {
  Search,
  Plus,
  Minus,
  Trash2,
  CreditCard,
  Banknote,
} from "lucide-react";
import Button from "../components/common/Button";
import Modal from "../components/common/Modal";

const SalesPage = () => {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [receivedAmount, setReceivedAmount] = useState("");

  // Produtos de exemplo
  const products = [
    { id: 1, name: "Arroz", price: 50, barcode: "123456" },
    { id: 2, name: "Feijão", price: 30, barcode: "234567" },
    // ... mais produtos
  ];

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (productId, delta) => {
    setCart(
      cart.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleFinalizeSale = () => {
    if (paymentMethod === "cash" && parseFloat(receivedAmount) < total) {
      alert("Valor recebido é menor que o total");
      return;
    }
    // Implementar lógica de finalização
    console.log("Venda finalizada:", {
      cart,
      total,
      paymentMethod,
      receivedAmount,
    });
    setCart([]);
    setIsPaymentModalOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Lista de Produtos */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="mb-6">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Buscar produtos..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => addToCart(product)}
              className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow cursor-pointer hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-lg text-green-600">
                R$ {product.price.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Carrinho */}
      <div className="w-96 bg-white dark:bg-gray-800 shadow-lg p-6 flex flex-col">
        <h2 className="text-xl font-bold mb-4">Carrinho</h2>

        <div className="flex-1 overflow-auto">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between py-2 border-b"
            >
              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-gray-600">
                  R$ {item.price.toFixed(2)}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, -1)}
                  className="p-1 rounded hover:bg-gray-100"
                >
                  <Minus size={16} />
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, 1)}
                  className="p-1 rounded hover:bg-gray-100"
                >
                  <Plus size={16} />
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-1 rounded hover:bg-gray-100 text-red-500"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t">
          <div className="flex justify-between text-xl font-bold mb-4">
            <span>Total:</span>
            <span>R$ {total.toFixed(2)}</span>
          </div>

          <Button
            onClick={() => setIsPaymentModalOpen(true)}
            disabled={cart.length === 0}
            className="w-full"
          >
            Finalizar Venda
          </Button>
        </div>
      </div>

      {/* Modal de Pagamento */}
      <Modal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
      >
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Finalizar Venda</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Forma de Pagamento
              </label>
              <div className="space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="cash"
                    checked={paymentMethod === "cash"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-2"
                  />
                  <Banknote size={20} className="mr-1" />
                  Dinheiro
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-2"
                  />
                  <CreditCard size={20} className="mr-1" />
                  Cartão
                </label>
              </div>
            </div>

            {paymentMethod === "cash" && (
              <div>
                <label className="block text-sm font-medium mb-1">
                  Valor Recebido
                </label>
                <input
                  type="number"
                  value={receivedAmount}
                  onChange={(e) => setReceivedAmount(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="0.00"
                />
                {parseFloat(receivedAmount) > total && (
                  <p className="text-sm text-gray-600 mt-1">
                    Troco: R$ {(parseFloat(receivedAmount) - total).toFixed(2)}
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button
              variant="secondary"
              onClick={() => setIsPaymentModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleFinalizeSale}
              disabled={
                paymentMethod === "cash" && parseFloat(receivedAmount) < total
              }
            >
              Confirmar Venda
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SalesPage;
