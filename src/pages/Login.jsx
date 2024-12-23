import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import AuthLayout from "../layouts/AuthLayout";
import Loader from "../components/common/Loader";
import TextInput from "../components/forms/TextInput";
import Button from "../components/common/Button";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      setError("Credenciais inválidas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      <form onSubmit={handleLogin}>
        <TextInput
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu email"
        />
        <TextInput
          label="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Digite sua senha"
        />
        <Button type="submit" className="w-full mt-4" disabled={loading}>
          {loading ? (
            <Loader type="spinner" size="sm" color="secondary" />
          ) : (
            "Entrar"
          )}
        </Button>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </form>
    </AuthLayout>
  );
};

export default Login;
