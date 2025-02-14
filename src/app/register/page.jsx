"use client";

import { register } from "@/apis";
import Button from "@/components/Button";
import Footer from "@/components/Footer";
import { usersData } from "@/utils/user";
import { validateForm } from "@/utils/validation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useTheme } from "../contexts/ThemeProvider";

function Register() {
  const router = useRouter()
  const [errors, setErrors] = useState({});
  const [formState, setFormState] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    type: 0,
  });

  const { theme, toggleTheme } = useTheme();

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleRegister = async () => {
    try {
      if (await validateForm(formState, setErrors)) {
        const response = await register(formState);

        if (response) {
          router.push("/");
        }
      }
    } catch (error) {
      console.error('Registration failed:', error);
    }
  }

  return (
    <div className={`flex flex-col items-center justify-center w-full font-[family-name:var(--font-geist-sans)] zoom-out ${theme === "dark" && "!text-white !bg-green-950"}`}>
      <main className="w-full flex flex-col gap-2 sm:gap-8 max-w-[500px] p-4 sm:p-12 sm:m-8 border border-green-600 rounded-lg">
        <header className="text-lg sm:text-xl font-bold text-green-600">Please register to continue</header>
        <form className="flex flex-col gap-2 sm:gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="fname">Firstname</label>
            <input
              type="text"
              name="fname"
              id="fname"
              autoComplete="current-firstname"
              className="inputText"
              onChange={handleFormChange}
              placeholder="Enter firstname"
            />
            <small className="text-[#d3302f]">{errors.fname}</small>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="lname">Lastname</label>
            <input
              type="text"
              name="lname"
              id="lname"
              autoComplete="current-lastname"
              className="inputText"
              onChange={handleFormChange}
              placeholder="Enter lastname"
            />
            <small className="text-[#d3302f]">{errors.lname}</small>
          </div>

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

          <div className="flex flex-col gap-2">
            <label htmlFor="type">Select user type</label>
            <select className="inputText" id="type" name="type" onChange={(e) => setFormState({ ...formState, type: e.target.value })}>
              {usersData.map(item => <option key={item.type} className="capitalize" value={item.type}>{item.role}</option>)}
            </select>
          </div>

          <div className="flex flex-col items-center justify-center my-2">
            <Button title={"Signup"} classNames="bg-green-600 hover:bg-green-600/80 w-[150px] text-white" onClick={handleRegister} />
          </div>

          <div className="flex items-center justify-center gap-1 sm:gap-2">
            <p className="text-sm">Already have an account </p>
            <Link href={"/"} className="text-green-600 text-sm">Login here</Link>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}

export default Register;
