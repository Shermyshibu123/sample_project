import { Form, InputNumber } from "antd";
import React from "react";
import Constant from "../../../Global/Constant";

const InputNumberField = ({ name, placeholder, required, initialValue, title, min, max, className = "custom-form-item border-bottom-dashed pb-3" }: any) => (
  <Form.Item
    className={className}
    label={title}
    name={name}
    initialValue={initialValue}
    rules={[
      {
        message: Constant.fieldRequiredValidation,
        required: required,
      },
    ]}
  >
    <InputNumber
      size="large"
      className="input-style my-1"
      placeholder={placeholder}
      autoComplete="off"
      min={min}
      max={max}
    />
  </Form.Item>
);

export default InputNumberField
