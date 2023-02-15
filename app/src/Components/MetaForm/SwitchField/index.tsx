import { Form, Switch } from "antd";
import React from "react";
import Constant from "../../../Global/Constant";

const SwitchField = ({ name, required, initialValue, title, checkedTitle, uncheckedTitle, className = "custom-form-item border-bottom-dashed pb-3" }: any) => (

  <Form.Item
    className={className}
    label={title}
    name={name}
    valuePropName="checked"
    initialValue={initialValue}
    rules={[
      {
        message: Constant.answerRequiredValidation,
        required: required,
      },
    ]}
  >
    <Switch checkedChildren={checkedTitle} unCheckedChildren={uncheckedTitle} />
  </Form.Item>


);

export default SwitchField
