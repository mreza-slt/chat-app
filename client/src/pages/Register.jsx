// import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
// import * as Yup from "yup";
import Input from "../common/Input";
import { Link, useNavigate } from "react-router-dom";

import { gql, useMutation } from "@apollo/client";
import { useState } from "react";

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      username: $username
      email: $email
      password: $password
      confirmPassword: $confirmPassword
    ) {
      username
      email
      createdAt
    }
  }
`;

const Register = () => {
  // formik 1:
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [errors, setErrors] = useState({});

  const history = useNavigate();
  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    update: (_) => {
      history("/login");
    },
    onError: (err) => {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
  });

  // 2.handler submit
  const onSubmit = (values) => {
    registerUser({ variables: values });
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit,
    validateOnMount: true,
  });

  return (
    <Row className="bg-white py-5 justify-content-center">
      <Col sm={8} md={6} lg={4}>
        <h1 className="text-center">Register</h1>
        <Form onSubmit={formik.handleSubmit}>
          <Input
            errors={errors.email}
            formik={formik}
            name="email"
            type="email"
            label="Email address"
          />
          <Input
            errors={errors.username}
            formik={formik}
            name="username"
            label="Username"
          />
          <Input
            errors={errors.password}
            formik={formik}
            name="password"
            type="password"
            label="Password"
          />
          <Input
            errors={errors.confirmPassword}
            formik={formik}
            name="confirmPassword"
            type="password"
            label="confirmPassword"
          />

          <div className="text-center">
            <Button variant="success" type="submit" disabled={loading}>
              {loading ? "loading..." : "Register"}
            </Button>
            <br />
            <small>
              Already have an account? <Link to="/login">Login</Link>
            </small>
          </div>
        </Form>
      </Col>
    </Row>
  );
};

export default Register;
