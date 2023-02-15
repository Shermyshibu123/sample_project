/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Modal, Form, Input, Select, Button, Row, Col, Popconfirm } from "antd";
import { FormInstance } from "antd/lib/form";
import Constant from "../../../Global/Constant";
import Utility from "../../../Global/Utility";
import notification from "../../../Global/Notification";
import userService from "../../../Services/userService";

interface AddUserProps {
  editMode: boolean;
  modalVisibility: boolean;
  onClose: () => void;
  onSave: () => void;
  form: FormInstance;
  userRoles: Array<object>;
  buttonLoading: boolean;
  setButtonLoading: (value: boolean) => void;
}

function AddUserModal(props: AddUserProps) {
  const {
    editMode,
    modalVisibility,
    onSave,
    onClose,
    form,
    userRoles,
    setButtonLoading,
    buttonLoading,
  } = props;

  const userRoleOptions =
    userRoles &&
    userRoles.map((role: any) => (
      <Select.Option key={role.id} value={role.id}>
        {`${role.role}`}
      </Select.Option>
    ));

  const [isPopupVisible, setPopupVisibility] = useState(false);
  const resendPassword = async () => {
    setButtonLoading(true);
    setPopupVisibility(false);
    try {
      const response = await userService.resendPassword({
        userId: form.getFieldValue("id"),
        name: form.getFieldValue("name"),
        email: form.getFieldValue("email"),
      });

      if (response.status === 200) {
        notification.success({
          description: response.data.message,
          message: "Success",
        });
        onClose();
      }
      setButtonLoading(false);
    } catch (error: any) {
      if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.error
      ) {
        notification.error({
          description: error.response.data.error.message,
          message: "Error",
        });
      }
      setButtonLoading(false);
    }
  };

  const renderFooter = () => (
    <Row>
      <Col span={10} offset={2}>
        {editMode ? (
          <Popconfirm
            placement="topLeft"
            visible={isPopupVisible}
            title={Constant.resetPasswordWarning}
            onConfirm={resendPassword}
            onCancel={() => setPopupVisibility(false)}
            okText="Yes"
            cancelText="No"
          >
            <span
              className="reset-btn-modal"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.preventDefault()}
              onClick={() => (buttonLoading ? {} : setPopupVisibility(true))}
            >
              Send password reset link
            </span>
          </Popconfirm>
        ) : null}
      </Col>
      <Col span={12}>
        <Button type="default" onClick={onClose} disabled={buttonLoading}>
          Cancel
        </Button>
        <Button
          type="primary"
          onClick={onSave}
          loading={buttonLoading}
          disabled={buttonLoading}
        >
          {editMode ? "Update" : "Create"}
        </Button>
      </Col>
    </Row>
  );

  return (
    <Modal
      getContainer={false}
      className="large-modal"
      title={editMode ? "Edit User" : "Add User"}
      visible={modalVisibility}
      okText="Save"
      width={750}
      onOk={onSave}
      onCancel={onClose}
      cancelButtonProps={{ disabled: buttonLoading }}
      confirmLoading={buttonLoading}
      centered
      closable={false}
      maskClosable={false}
      keyboard={false}
      footer={renderFooter()}
    >
      <Form
        className="form-wrapper"
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        layout="vertical"
        labelAlign="left"
        colon={false}
      >
        {editMode ? (
          <Form.Item label="Id" name="id" style={{ display: "none" }}>
            <Input type="text" />
          </Form.Item>
        ) : null}

        <Form.Item
          className="mb-3"
          label="Name"
          name="name"
          normalize={(value) => Utility.trimSpacesInValues(value)}
          rules={[
            {
              type: "string",
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
        >
          <Input placeholder="Enter name" />
        </Form.Item>
        <Form.Item
          className="mb-3"
          label="Email"
          name="email"
          normalize={(value) => Utility.trimSpacesInValues(value)}
          validateTrigger="onBlur"
          rules={[
            {
              type: "email",
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
        >
          <Input placeholder="Enter email" />
        </Form.Item>
        <Form.Item
          className="mb-3"
          label="Role"
          name="roleId"
          rules={[
            {
              required: true,
              message: Constant.roleRequired,
            },
          ]}
          required
        >
          <Select
            size="large"
            placeholder="Select role"
            showSearch
            filterOption={(input, option) =>
              option?.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {userRoleOptions}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddUserModal;
