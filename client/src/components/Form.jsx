import React, { useState } from "react";
import { TextField, Button, Grid, Box, Typography } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import { createBrowserRouter, RouterProvider, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Contacts from "./Contacts";

const Form = () => {
  const navigate=useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    company: "",
    jobTitle: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, phoneNumber, company, jobTitle } = formData;

    try {
      const response = await fetch("http://localhost:3000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, phoneNumber, company, jobTitle }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(result.message || "Form submitted successfully!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });

        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          company: "",
          jobTitle: "",
        });
      } else {
        toast.error(result.message || "Something went wrong. Please try again.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while submitting the form.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
  };

  return (
    <>
    <Button onClick={()=>{navigate("/contacts")}} variant="contained">view all contacts</Button>
      <ToastContainer
position="bottom-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
      <Box
        sx={{
          maxWidth: 600,
          margin: "0 auto",
          padding: 4,
          backgroundColor: "#f9f9f9",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: "bold" }}>
          Contact Information
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                required
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                required
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                type="email"
                required
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Phone Number"
                variant="outlined"
                fullWidth
                type="number"
                required
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Company"
                variant="outlined"
                fullWidth
                required
                name="company"
                value={formData.company}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Job Title"
                variant="outlined"
                fullWidth
                required
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: "#00796b",
                  "&:hover": {
                    backgroundColor: "#004d40",
                  },
                }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
};

export default Form;
