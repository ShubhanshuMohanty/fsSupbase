import React, { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../client";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
          },
        },
      });
      if (error) throw error;
      alert("Check your email for verification link");
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input placeholder="Fullname" name="fullName" onChange={handleChange} />

        <input placeholder="Email" name="email" onChange={handleChange} />

        <input
          placeholder="Password"
          name="password"
          type="password"
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>
      Already have an account?<Link to="/">Login</Link>
    </div>
  );
};

export default SignUp;
