import { Row, Col, Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import Input from "../common/Input";
import { Link, useNavigate } from "react-router-dom";
import { gql, useLazyQuery } from "@apollo/client";
import { useState } from "react";
import { useAuthDispatch, useAuthState } from "../context/auth";

const LOGIN_USER = gql`
  query login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      username
      email
      createdAt
      token
    }
  }
`;

const Login = () => {
  // formik 1:
  const initialValues = {
    username: "",
    password: "",
  };

  const [errors, setErrors] = useState({});

  const dispatch = useAuthDispatch();

  const history = useNavigate();
  const [loginUser, { loading }] = useLazyQuery(LOGIN_USER, {
    onError: (err) => {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    onCompleted(data) {
      dispatch({ type: "LOGIN", payload: data.login });
      history("/");
    },
  });

  // 2.handler submit
  const onSubmit = (values) => {
    loginUser({ variables: values });
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit,
    validateOnMount: true,
  });

  return (
    <Row className="bg-white py-5 justify-content-center">
      <Col sm={8} md={6} lg={4}>
        <h1 className="text-center">Login</h1>
        <Form onSubmit={formik.handleSubmit}>
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
          <div className="text-center">
            <Button variant="success" type="submit" disabled={loading}>
              {loading ? "loading..." : "Login"}
            </Button>
            <br />
            <small>
              Don't have an account? <Link to="/register">Register</Link>
            </small>
          </div>
        </Form>
      </Col>
    </Row>
  );
};

export default Login;
