import React from "react";
import { PrinterIcon } from "lucide-react";
import Button from "../common/Button";

const Invoice = ({ sale }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("pt-BR");
  };

  const getPaymentMethodLabel = (method) => {
    const methods = {
      cash: "Dinheiro",
      credit_card: "Cartão de Crédito",
      debit_card: "Cartão de Débito",
      bank_transfer: "Transferência Bancária",
      pix: "PIX",
    };
    return methods[method] || method;
  };

  return (
    <div className="bg-white p-8 rounded-lg">
      {/* Cabeçalho da Fatura */}
      <div className="flex justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">
            {sale.invoiceType === "proforma" ? "Fatura Proforma" : "Fatura"}
          </h1>
          <p className="text-gray-600">#{sale.id}</p>
        </div>
        <div className="text-right">
          <p className="font-bold">Data: {formatDate(sale.date)}</p>
          <p className="text-gray-600">
            Tipo:{" "}
            {sale.saleType === "physical" ? "Loja Física" : "Loja Virtual"}
          </p>
        </div>
      </div>

      {/* Detalhes do Cliente */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Cliente</h2>
        <p>{sale.customer}</p>
      </div>

      {/* Detalhes do Produto */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Detalhes</h2>
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Produto</th>
              <th className="text-right py-2">Valor</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2">{sale.product}</td>
              <td className="text-right">
                MZN {Number(sale.amount).toLocaleString()}
              </td>
            </tr>
          </tbody>
          <tfoot className="border-t">
            <tr>
              <td className="py-2 font-bold">Total</td>
              <td className="text-right font-bold">
                MZN {Number(sale.amount).toLocaleString()}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Método de Pagamento */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Pagamento</h2>
        <p>Método: {getPaymentMethodLabel(sale.paymentMethod)}</p>
      </div>

      {/* Observações */}
      {sale.notes && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Observações</h2>
          <p className="text-gray-600">{sale.notes}</p>
        </div>
      )}

      {/* Botão de Impressão */}
      <div className="flex justify-end mt-8">
        <Button
          onClick={() => window.print()}
          className="flex items-center gap-2"
        >
          <PrinterIcon size={16} />
          Imprimir
        </Button>
      </div>
    </div>
  );
};

export default Invoice;
