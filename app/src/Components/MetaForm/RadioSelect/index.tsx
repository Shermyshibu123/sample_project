import { Form, Radio } from "antd";
import React from "react";
import Constant from "../../../Global/Constant";

const RadioSelect = ({ name, required, value, options, title, initialValue, className = "custom-form-item border-bottom-dashed pb-3", disabled }: any) => (
  <Form.Item
    className={className}
    label={title}
    name={name}

    rules={[
      {
        message: Constant.answerRequiredValidation,
        required: required,
      },
    ]}
    initialValue={initialValue}>

    {initialValue !== undefined ? (
      <Radio.Group defaultValue={initialValue} value={initialValue} disabled={disabled}>

        <Radio value={initialValue}>{initialValue}</Radio>


      </Radio.Group>
    ) : (<Radio.Group defaultValue={initialValue} value={initialValue} disabled={disabled}>
      {options.map((values: any) =>
        <Radio value={values}>{values}</Radio>
      )}

    </Radio.Group>)}
  </Form.Item>
);

export default RadioSelect