/* eslint-disable no-useless-escape */

import { Form, Input } from 'antd';
import React from 'react';
import Constant from '../../../Global/Constant';
import Utility from '../../../Global/Utility';

const EmailField = ({ name, placeholder, required, initialValue, title, className = "custom-form-item border-bottom-dashed pb-3" }: any) => (
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
                pattern: /^(?=.{1,50}$)[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/,
                max: Constant.emailMaxLength,
                min: Constant.emailMinLength,
                message: Constant.emailValidationError,
            },
            // {
            //     pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z0-9]+\.)+[a-zA-Z]{2,}))$/,
            //     message: Constant.emailValidationError,

            // }
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

export default EmailField
