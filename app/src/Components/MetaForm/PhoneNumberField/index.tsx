/* eslint-disable no-useless-escape */

import { Form, Input } from "antd";
import React from "react";
import Constant from "../../../Global/Constant";
import Utility from '../../../Global/Utility';

const PhoneNumberField = ({ name, placeholder, required, initialValue, title, className = "custom-form-item border-bottom-dashed pb-3" }: any) => (
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
                pattern: /^[\+]?[(]?\d{3}[)]?[-\s\.]?\d{3}[-\s\.]?\d{4,6}$/,
                message: Constant.phoneNumberValidationError,

            },
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

export default PhoneNumberField
