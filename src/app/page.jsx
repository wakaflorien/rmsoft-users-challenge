"use client";

import { login } from "@/apis";
import Button from "@/components/Button";
import Footer from "@/components/Footer";
import { validateForm } from "@/utils/validation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTheme } from "./contexts/ThemeProvider";
import { Icon } from "@iconify-icon/react";

export default function Home() {
  const router = useRouter()
  const [errors, setErrors] = useState({});
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const { theme, toggleTheme } = useTheme();

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleLogin = async () => {

    try {
      const response = await login(formState);

      localStorage.setItem("token", response.token);

      if (response) {
        router.push("/dashboard");
      }

    } catch (error) {
      console.error('Registration failed:', error);
    }
  }

  return (
    <div className={`flex flex-col items-center justify-center w-full font-[family-name:var(--font-geist-sans)] zoom-out ${theme === "dark" && "!text-white !bg-green-950"}`}>
      <div
        className="ml-0 h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent cursor-pointer"
        onClick={toggleTheme}
      >
        {theme === "dark" ? (
          <Icon icon="si:clear-day-line" width={18} />
        ) : (
          <Icon icon="mdi:weather-night" width={18} />
        )}
      </div>
      <main className="w-full flex flex-col gap-2 sm:gap-8 max-w-[500px] p-4 sm:p-12 sm:m-8 border border-green-600 rounded-lg">
        <header className="text-lg sm:text-xl font-bold text-green-600">Please login to continue</header>
        <form className="flex flex-col gap-2 sm:gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              autoComplete="current-email"
              className="inputText"
              onChange={handleFormChange}
              placeholder="Enter email"
            />
            <small className="text-[#d3302f]">{errors.email}</small>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              autoComplete="current-password"
              className="inputText"
              onChange={handleFormChange}
              placeholder="Enter password"
            />
            <small className="text-[#d3302f]">{errors.password}</small>
          </div>
          <div className="flex flex-col items-center justify-center my-2">
            <Button title={"Login"} classNames="bg-green-600 hover:bg-green-600/80 w-[150px] text-white" onClick={handleLogin} />
          </div>
          <div className="flex items-center justify-center gap-1 sm:gap-2">
            <p className="text-sm">Have no account </p>
            <Link href={"/register"} className="text-green-600 text-sm">Register here</Link>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}
