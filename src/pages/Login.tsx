import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

export const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLoginSuccess = (token: string) => {
    // Store the token in local storage
    localStorage.setItem("ACCESS_TOKEN", token);

    navigate("/dashboard");
    navigate(0);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await api.post("/login", formData);
      const token = response.data.token;
      console.log(response);

      // Call the function to handle login success
      handleLoginSuccess(token);
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center sm:px-4">
      <div className="w-full space-y-6 text-gray-600 sm:max-w-md">
        <div className="text-center">
          <div className="mt-5 space-y-2">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              Log in to your account
            </h3>
            <p className="">
              have an account?
              <Link
                to="/register"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
        <div className="bg-white shadow p-4 py-6 space-y-8 sm:p-6 sm:rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="font-medium">Email</label>
              <input
                type="email"
                required
                onChange={handleInputChange}
                name="email"
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Password</label>
              <input
                type="password"
                required
                onChange={handleInputChange}
                name="password"
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white font-medium bg-blue-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
            >
              Log in
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};
