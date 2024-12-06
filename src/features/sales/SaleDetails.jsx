import React from "react";

const SaleDetails = ({ sale }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            ID da Venda
          </h3>
          <p className="mt-1 text-lg font-semibold">{sale.id}</p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Status
          </h3>
          <span
            className={`inline-block mt-1 px-2 py-1 rounded-full text-sm ${
              sale.status === "Completo"
                ? "bg-green-100 text-green-800"
                : sale.status === "Pendente"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {sale.status}
          </span>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Cliente
          </h3>
          <p className="mt-1 text-lg">{sale.customer}</p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Data
          </h3>
          <p className="mt-1 text-lg">{sale.date}</p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Produto
          </h3>
          <p className="mt-1 text-lg">{sale.product}</p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Valor
          </h3>
          <p className="mt-1 text-lg font-semibold">{sale.amount}</p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Observações
        </h3>
        <p className="mt-1 text-gray-600 dark:text-gray-300">
          {sale.notes || "Nenhuma observação registrada"}
        </p>
      </div>
    </div>
  );
};

export default SaleDetails;
