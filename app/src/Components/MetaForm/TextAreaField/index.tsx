import { Form } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React from "react";
import Constant from "../../../Global/Constant";
import Utility from '../../../Global/Utility';

const TextAreaField = ({ name, placeholder, required, initialValue, title, className = "custom-form-item border-bottom-dashed pb-3", disabled }: any) => (
  <Form.Item
    className={className}
    label={title}
    name={name}
    initialValue={initialValue}
    normalize={(value) => Utility.trimSpacesInValues(value)}
    rules={[
      {
        message: Constant.fieldRequiredValidation,
        required: required,
      },
      {
        max: Constant.maxLengthOfTextArea,
        message: "Please enter valid details"
      }
    ]}
  // required={required}
  >
    <TextArea
      className="input-style my-1"
      placeholder={placeholder}
      autoComplete="off"
      disabled={disabled}
    />
  </Form.Item>
);

export default TextAreaField
