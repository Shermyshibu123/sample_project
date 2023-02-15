import { Button, Form, FormInstance, Input, Modal, Select } from 'antd';
import React from 'react';
import Constant from '../../../Global/Constant';
import Utility from '../../../Global/Utility';

const { Option } = Select;

interface Props {
  form: FormInstance;
  modalVisible: boolean;
  onSave?: (asset: any) => void;
  onCancel?: () => void;
}

function ProfileDetailModal(props: Props) {
  const {
    form,
    modalVisible,
    onSave,
    onCancel
  } = props;

  return (
    <Modal
      getContainer={false}
      closable={false}
      width={750}
      className='large-modal'
      title={'Profile Details'}
      visible={modalVisible}
      maskClosable={false}
      onCancel={onCancel}
      footer={
        [
          <>
            <Button
              key="cancel"
              onClick={() => {
                if (onCancel) {
                  onCancel();
                }
              }}
            >
              Cancel
            </Button>
          </>,
          <Button key="ok" type="primary" onClick={() => form.submit()}>
            {'Create'}
          </Button>,
        ]
      }
    >
      <Form
        className='form-wrapper'
        form={form}
        size="large"
        labelCol={{ span: 9 }}
        wrapperCol={{ span: 15 }}
        layout="horizontal"
        labelAlign="left"
        colon={false}
        onFinish={() => {
          if (onSave) {
            onSave(form);
          }
        }}
      >
        <>
          <Form.Item
            className="mb-3"
            label=" Name"
            required
            normalize={(value) => Utility.trimSpacesInValues(value)}
            rules={[
              {
                type: 'string',
                pattern: /^[a-zA-Z_0-9\s.]{1,50}$/,
                max: Constant.maxLengthOfName,
                required: true,
                message: Constant.userNameError,
              },
              {
                whitespace: true,
                message: Constant.whiteSpaceError,
              },
            ]}
            name="userName"
          >
            <Input className="input-style" placeholder="Enter Name" />
          </Form.Item>

          <Form.Item
            className="mb-3"
            label=" Email"
            required
            normalize={(value) => Utility.trimSpacesInValues(value)}
            validateTrigger="onBlur"
            rules={[
              {
                type: 'email',
                max: Constant.emailMaxLength,
                min: Constant.emailMinLength,
                message: Constant.emailValidationError,
              },
              {
                required: true,
                message: Constant.emailRequiredValidationError,
              },
              {
                whitespace: true,
                message: Constant.whiteSpaceError,
              },
            ]}
            name="userEmail"
          >
            <Input className="input-style" placeholder="Enter Email" />
          </Form.Item>

          <Form.Item
            className="mb-3"
            label="Gender"
            name="userGender"
            required
            rules={[
              {
                required: true,
                message: Constant.GenderRequiredError,
              },
            ]}
          >
            <Select
              allowClear
              placeholder={'Select Gender'}
            >
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
            </Select>
          </Form.Item>

          <Form.Item
            className="mb-3"
            label=" Phone Number"
            required
            normalize={(value) => Utility.trimSpacesInValues(value)}
            rules={[
              {
                whitespace: true,
                message: Constant.whiteSpaceError,
              },
              {
                pattern: /^[+]?\d{7,15}$/,
                message: Constant.addValidPhoneNumber,
              },
              {
                required: true,
                message: Constant.PhoneRequiredError,
              },
            ]}
            name="userPhone"
          >
            <Input className="input-style" placeholder="Enter Phone Number" />
          </Form.Item>

          <Form.Item name="id" style={{ display: 'none' }} ><></></Form.Item>
        </>
      </Form>
    </Modal>
  )

}

export default ProfileDetailModal;