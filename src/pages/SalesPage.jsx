import React, { useState, useMemo, useCallback } from "react";
import {
  Search,
  Plus,
  Minus,
  Trash2,
  CreditCard,
  Banknote,
  ShoppingCart,
  CheckCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Button from "../components/common/Button";
import { Input } from "../components/common/Input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/common/Dialog";

const products = [
  { id: 1, name: "Arroz", price: 50, barcode: "123456", category: "Grãos" },
  { id: 2, name: "Feijão", price: 30, barcode: "234567", category: "Grãos" },
  { id: 3, name: "Macarrão", price: 20, barcode: "345678", category: "Massas" },
  {
    id: 4,
    name: "Molho de Tomate",
    price: 15,
    barcode: "456789",
    category: "Molhos",
  },
  { id: 5, name: "Óleo", price: 25, barcode: "567890", category: "Cozinha" },
];

const SalesPage = () => {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [receivedAmount, setReceivedAmount] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filteredProducts = useMemo(() => {
    return products.filter(
      (product) =>
        (activeCategory === "Todos" || product.category === activeCategory) &&
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, activeCategory]);

  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  const categories = useMemo(() => {
    const uniqueCategories = [
      "Todos",
      ...new Set(products.map((p) => p.category)),
    ];
    return uniqueCategories;
  }, []);

  const addToCart = useCallback((product) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === product.id);
      if (existingItem) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...currentCart, { ...product, quantity: 1 }];
    });
  }, []);

  const updateQuantity = useCallback((productId, delta) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity: Math.max(1, item.quantity + delta),
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const handleFinalizeSale = () => {
    if (paymentMethod === "cash" && parseFloat(receivedAmount) < total) {
      alert("Valor recebido é menor que o total");
      return;
    }

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
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-48 bg-white dark:bg-gray-800 shadow-md p-4 space-y-2">
        <h3 className="font-bold text-lg mb-4">Categorias</h3>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`w-full text-left p-2 rounded transition-colors ${
              activeCategory === category
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="flex-1 flex flex-col">
        <div className="p-6 flex-1">
          <div className="mb-6 flex items-center space-x-4">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <Input
                type="text"
                placeholder="Buscar produtos..."
                className="w-full pl-10 pr-4"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center text-gray-600">
              <ShoppingCart size={24} className="mr-2" />
              <span>{cart.length} itens</span>
            </div>
          </div>

          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => addToCart(product)}
                  className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow cursor-pointer hover:shadow-md transition-all group"
                >
                  <h3 className="font-semibold group-hover:text-blue-600 transition">
                    {product.name}
                  </h3>
                  <p className="text-lg text-green-600">
                    R$ {product.price.toFixed(2)}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        <div className="w-full bg-white dark:bg-gray-800 shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold flex items-center">
              <ShoppingCart className="mr-2" /> Carrinho
            </h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCart([])}
              disabled={cart.length === 0}
            >
              Limpar Carrinho
            </Button>
          </div>

          <div className="space-y-2 max-h-48 overflow-auto">
            {cart.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-between p-2 bg-gray-50 rounded"
              >
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-600">
                    R$ {item.price.toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.id, -1)}
                  >
                    <Minus size={16} />
                  </Button>
                  <span>{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    <Plus size={16} />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => updateQuantity(item.id, -item.quantity)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t flex justify-between items-center">
            <div className="text-xl font-bold">
              Total: R$ {total.toFixed(2)}
            </div>
            <Button
              onClick={() => setIsPaymentModalOpen(true)}
              disabled={cart.length === 0}
              className="space-x-2"
            >
              <CheckCircle size={20} />
              <span>Finalizar Venda</span>
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Finalizar Venda</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Forma de Pagamento
              </label>
              <div className="flex space-x-4">
                <Button
                  variant={paymentMethod === "cash" ? "default" : "outline"}
                  onClick={() => setPaymentMethod("cash")}
                  className="flex items-center space-x-2"
                >
                  <Banknote size={20} />
                  <span>Dinheiro</span>
                </Button>
                <Button
                  variant={paymentMethod === "card" ? "default" : "outline"}
                  onClick={() => setPaymentMethod("card")}
                  className="flex items-center space-x-2"
                >
                  <CreditCard size={20} />
                  <span>Cartão</span>
                </Button>
              </div>
            </div>

            {paymentMethod === "cash" && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  Valor Recebido
                </label>
                <Input
                  type="number"
                  value={receivedAmount}
                  onChange={(e) => setReceivedAmount(e.target.value)}
                  placeholder="0.00"
                />
                {parseFloat(receivedAmount) > total && (
                  <p className="text-sm text-green-600 mt-2">
                    Troco: R$ {(parseFloat(receivedAmount) - total).toFixed(2)}
                  </p>
                )}
              </div>
            )}

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
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
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SalesPage;
