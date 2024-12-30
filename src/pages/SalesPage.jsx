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
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside
        className="lg:w-48 bg-white dark:bg-gray-800 shadow-md p-4 space-y-2"
        role="navigation"
        aria-label="Categories"
      >
        <h2 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">
          Categorias
        </h2>
        <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                toast({
                  description: `Categoria ${category} selecionada`,
                  duration: 2000,
                });
              }}
              className={`flex-shrink-0 px-4 py-2 rounded-full transition-all focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                activeCategory === category
                  ? "bg-blue-500 text-white shadow-lg transform scale-105"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
              }`}
              aria-pressed={activeCategory === category}
            >
              {category}
            </button>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Search and Cart Summary */}
        <header className="sticky top-0 bg-white dark:bg-gray-800 shadow-md p-4 z-10">
          <div className="container mx-auto flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
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
                aria-label="Buscar produtos"
              />
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <ShoppingCart size={24} className="mr-2" aria-hidden="true" />
              <span className="font-medium">{cart.length} itens</span>
            </div>
          </div>
        </header>

        {/* Products Grid */}
        <section className="flex-1 p-4 overflow-auto">
          <div className="container mx-auto">
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            >
              <AnimatePresence>
                {filteredProducts.map((product) => (
                  <motion.button
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      addToCart(product);
                      toast({
                        description: `${product.name} adicionado ao carrinho`,
                        duration: 2000,
                      });
                    }}
                    className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-md mb-3">
                      <img
                        src={
                          product.images?.[0]?.image_url ||
                          "/api/placeholder/200/200"
                        }
                        alt={product.name}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {product.name}
                    </h3>
                    <p className="text-lg text-green-600 dark:text-green-400">
                      R$ {product.price.toFixed(2)}
                    </p>
                  </motion.button>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* Cart Section */}
        <section className="bg-white dark:bg-gray-800 shadow-lg p-4 border-t dark:border-gray-700">
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold flex items-center text-gray-900 dark:text-white">
                <ShoppingCart className="mr-2" aria-hidden="true" /> Carrinho
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setCart([]);
                  toast({
                    description: "Carrinho limpo",
                    duration: 2000,
                  });
                }}
                disabled={cart.length === 0}
              >
                Limpar Carrinho
              </Button>
            </div>

            <div className="space-y-3 max-h-[300px] overflow-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
              <AnimatePresence>
                {cart.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex items-center gap-4 p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600"
                  >
                    <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-50 dark:bg-gray-600">
                      <img
                        src={
                          item.images?.[0]?.image_url ||
                          "/api/placeholder/64/64"
                        }
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 dark:text-white truncate">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <span>R$ {item.price.toFixed(2)}</span>
                        <span className="text-gray-400">•</span>
                        <span>
                          Subtotal: R$ {(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, -1)}
                        className="h-8 w-8"
                        disabled={item.quantity <= 1}
                        aria-label="Diminuir quantidade"
                      >
                        <Minus size={14} />
                      </Button>
                      <div className="w-12 text-center font-medium">
                        {item.quantity}
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, 1)}
                        className="h-8 w-8"
                        aria-label="Aumentar quantidade"
                      >
                        <Plus size={14} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          updateQuantity(item.id, -item.quantity);
                          toast({
                            description: `${item.name} removido do carrinho`,
                            duration: 2000,
                          });
                        }}
                        className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                        aria-label="Remover item"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="mt-4 pt-4 border-t dark:border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-xl font-bold text-gray-900 dark:text-white">
                Total: R$ {total.toFixed(2)}
              </div>
              <Button
                onClick={() => setIsPaymentModalOpen(true)}
                disabled={cart.length === 0}
                className="w-full sm:w-auto space-x-2"
              >
                <CheckCircle size={20} />
                <span>Finalizar Venda</span>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Payment Modal */}
      <Dialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Finalizar Venda</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Forma de Pagamento
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  variant={paymentMethod === "cash" ? "default" : "outline"}
                  onClick={() => setPaymentMethod("cash")}
                  className="flex items-center justify-center space-x-2"
                >
                  <Banknote size={20} />
                  <span>Dinheiro</span>
                </Button>
                <Button
                  variant={paymentMethod === "card" ? "default" : "outline"}
                  onClick={() => setPaymentMethod("card")}
                  className="flex items-center justify-center space-x-2"
                >
                  <CreditCard size={20} />
                  <span>Cartão</span>
                </Button>
              </div>
            </div>

            <AnimatePresence>
              {paymentMethod === "cash" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <label className="block text-sm font-medium mb-2">
                    Valor Recebido
                  </label>
                  <Input
                    type="number"
                    value={receivedAmount}
                    onChange={(e) => setReceivedAmount(e.target.value)}
                    placeholder="0.00"
                    min={total}
                    step="0.01"
                  />
                  {parseFloat(receivedAmount) > total && (
                    <p className="text-sm text-green-600 mt-2">
                      Troco: R${" "}
                      {(parseFloat(receivedAmount) - total).toFixed(2)}
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-col sm:flex-row justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsPaymentModalOpen(false)}
                className="w-full sm:w-auto"
              >
                Cancelar
              </Button>
              <Button
                onClick={() => {
                  handleFinalizeSale();
                  toast({
                    description: "Venda finalizada com sucesso!",
                    duration: 3000,
                  });
                }}
                disabled={
                  paymentMethod === "cash" && parseFloat(receivedAmount) < total
                }
                className="w-full sm:w-auto"
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
