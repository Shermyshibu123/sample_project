import { Form, Input } from "antd";
import React from "react";
import Constant from "../../../Global/Constant";
import Utility from '../../../Global/Utility';

const InputTextField = ({ name, placeholder, required, initialValue, title, className = "custom-form-item border-bottom-dashed pb-3" }: any) => (
  <Form.Item
    className={className}
    label={title}
    normalize={(value) => Utility.trimSpacesInValues(value)}
    name={name}
    initialValue={initialValue}
    rules={[
      {
        message: Constant.fieldRequiredValidation,
        required: required,
      },
      {
        max: Constant.maxLengthOfName,
        message: Constant.inputTextValidation
      }
    ]}
  >
    <Input
      size="large"
      className="input-style my-1"
      placeholder={placeholder}
      autoComplete="off"
    />
  </Form.Item>
);

export default InputTextField
