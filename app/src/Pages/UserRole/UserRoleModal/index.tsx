import React from 'react';
import { observer } from 'mobx-react';
import {
  Modal,
  Form,
  Input,
  Checkbox,
  Row,
  Col,
} from 'antd';
import { FormInstance } from 'antd/lib/form';
import Constant from '../../../Global/Constant';
import Utility from '../../../Global/Utility';

interface Props {
  form: FormInstance,
  modalVisibility: boolean,
  editMode: boolean,
  onOk?: () => void,
  onCancel?: () => void,
  modalLoading: boolean,
}

function UserRoleModal(props: Props) {
  const {
    form, modalVisibility, editMode, onOk, onCancel, modalLoading,
  } = props;

  return (
    <Modal
      getContainer={false}
      className='large-modal'
      maskClosable={false}
      width={750}
      title={editMode ? 'Edit User Role' : 'Add User Role'}
      visible={modalVisibility}
      okText="Save"
      onOk={onOk}
      onCancel={onCancel}
      cancelButtonProps={{ disabled: modalLoading }}
      confirmLoading={modalLoading}
      centered
      closable={false}
      keyboard={false}
    >
      <Form
        className='form-wrapper'
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        layout="vertical"
        labelAlign="left"
        colon={false}
      >
        {
          editMode ? (
            <Form.Item
              label="Id"
              name="id"
              style={{ display: 'none' }}
            >
              <Input type="text" />
            </Form.Item>
          ) : null
        }

        <Form.Item
          className="mb-3"
          label="Role"
          name="role"
          normalize={(value) => Utility.trimSpacesInValues(value)}
          rules={[
            {
              type: 'string',
              max: Constant.maxLengthOfRole,
              required: true,
              message: Constant.userRoleError,
            },
            {
              whitespace: true,
              message: Constant.whiteSpaceError,
            },
          ]}
        >
          <Input placeholder="Enter role" />
        </Form.Item>
        <Form.Item
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          label="User Access"
          name="userAccess"
          rules={[
            {
              required: true,
              message: Constant.userAccessError,
            },
          ]}
        >
          <Checkbox.Group className="w-100">
            <Row>
              <Col xs={{ span: 24 }} sm={{ span: 12 }} className="mb-3">
                <Checkbox value={Constant.userAccess.dashboard}>Dashboard</Checkbox>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 12 }} className="mb-3">
                <Checkbox value={Constant.userAccess.users}>Users</Checkbox>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 12 }} className="mb-3">
                <Checkbox value={Constant.userAccess.userRoles}>User Roles</Checkbox>
              </Col>
            </Row>
          </Checkbox.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default observer(UserRoleModal);
