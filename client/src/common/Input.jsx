import { Form } from "react-bootstrap";
import React from "react";

const Input = ({ formik, name, label, type = "text", errors }) => {
  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label className={errors && "text-danger"} htmlFor={name}>
          {errors ?? label}
        </Form.Label>
        <Form.Control
          className={errors && "is-invalid"}
          type={type}
          id={name}
          name={name}
          {...formik.getFieldProps(name)}
          autoComplete="on"
        />
      </Form.Group>
    </>
  );
};

export default Input;
