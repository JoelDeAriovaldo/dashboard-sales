import React from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <AuthLayout>
      <div className="flex flex-col items-center">
        <div className="text-center w-full">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Bem-vindo de Volta
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Inicie sessão para continuar no seu painel
          </p>
        </div>
        <form onSubmit={handleLogin} className="w-full space-y-6 mt-8">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Endereço de Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Digite seu email"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Palavra-passe
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Digite sua palavra-passe"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember"
                className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
              >
                Lembrar-me
              </label>
            </div>
            <a
              href="#"
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              Esqueceu a palavra-passe?
            </a>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
          >
            Iniciar Sessão
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          Não tem uma conta?{" "}
          <a href="#" className="text-blue-600 hover:text-blue-500 font-medium">
            Registe-se
          </a>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Login;
