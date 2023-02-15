import React, { useState } from 'react';
import {
  useMutation, useQueryClient, useQuery,
} from 'react-query';
import { observer } from 'mobx-react';
import {
  Layout,
  Typography,
  Table,
  Button,
  Modal,
  Form,
  Space,
  Spin,
  Col,
  Row
} from 'antd';
import {
  EditFilled, ExclamationCircleOutlined,
} from '@ant-design/icons';
import './Users.less';
import notification from '../../Global/Notification';
import Constant from '../../Global/Constant';
import AddUserModal from './AddUserModal';
import userService from '../../Services/userService';
import userRoleService from '../../Services/userRoleService';
import Icon from '../../Components/Icon';
import { userSearchIcon } from '../../Components/Common';


const addUser = async (newUser: any) => {
  if (newUser.id) {
    const updateResponse = await userService.updateUser(newUser.id, newUser);
    return updateResponse.data.message;
  }
  const createResponse = await userService.createUser(newUser);
  return createResponse.data.message;
};

const deleteUser = async (id: string) => {
  const deleteResponse = await userService.deleteUser(id);
  return deleteResponse.data.message;
};

const fetchRoles = async () => {
  const res = await userRoleService.getUserRoles();
  return res.data.roles;
};

const Users = () => {
  const [modalVisibility, setModalVisibility] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [pageNumber, setPageNumber] = useState(Constant.defaultPageNumber);
  const [buttonLoading, setModalButtonLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const { data: resolvedData, isLoading } = useQuery(
    ['users', pageNumber, searchText.trim()],
    () => fetchUsers(pageNumber, searchText.trim()),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: true,
    });
  const { data: roles } = useQuery('roles',
    () => fetchRoles(),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: true,
      onError: (error: any) => { onMutateError(error); },
    });
  const addMutate = useMutation(addUser, {
    onSuccess: () => {
      onMutateSuccess();
      setPageNumber(editMode ? pageNumber : Math.ceil((resolvedData?.count + 1) / Constant.itemsPerPage));
    },
    onError: (error: any) => { onMutateError(error); },
  });

  const fetchUsers = async (page: number, search: string) => {
    setLoading(true);
    if (searchText && searchText !== '') {
      const fetchResponse = await userService.getSearchResult(searchText, pageNumber, Constant.itemsPerPage);
      setLoading(false);
      return { users: fetchResponse.data.result.users, count: fetchResponse.data.result.total };
    }
    const getResponse = await userService.getUsers(pageNumber, Constant.itemsPerPage);
    setLoading(false);
    return { users: getResponse.data.users, count: getResponse.data.total };
  };

  let queryClient = useQueryClient();
  const onMutateSuccess = () => {
    queryClient.invalidateQueries('users');
    setModalVisibility(false);
    setModalButtonLoading(false);
  };

  const deleteMutate = useMutation(deleteUser, {
    onSuccess: () => {
      onMutateSuccess();
      const lastPageNumber = Math.ceil((resolvedData?.count - 1) / Constant.itemsPerPage);
      setPageNumber(pageNumber < lastPageNumber ? pageNumber : lastPageNumber);
    },
    onError: (error: any) => { onMutateError(error); },
  });

  const onMutateError = (error: any) => {
    setModalButtonLoading(false);
    if (error && error.response && error.response.data && error.response.data.error) {
      notification.error({
        description: error.response.data.error.message,
        message: 'Error',
      });
    }
  };

  const [form] = Form.useForm();
  const { confirm } = Modal;
  const viewUserModal = (isEditMode: boolean, record?: any) => {
    setEditMode(isEditMode);
    form.resetFields();
    form.setFieldsValue(record || {});
    form.setFieldsValue({ roleId: record?.role?.id });
    form.setFields([
      { touched: false, name: 'id' },
      { touched: false, name: 'name' },
      { touched: false, name: 'email' },
      { touched: false, name: 'roleId' },
    ]);
    setModalVisibility(true);
  };

  const deleteUserOnConfirm = (id: string) => {
    deleteMutate.mutate(id);
  };

  const viewDeleteConfirmModal = (id: string) => {
    confirm({
      title: Constant.deleteModalTitle,
      content: Constant.deleteModalContent,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        deleteUserOnConfirm(id);
      },
      okText: 'Yes',
      cancelText: 'No',
      okType: 'danger',
    });
  };

  const tableColumns = [
    {
      title: '#',
      key: 'key',
      render: (record: any) => (
        <span>
          {resolvedData && resolvedData.users.length > 10 ? (resolvedData && resolvedData.users.indexOf(record) + 1)
            : ((resolvedData && resolvedData.users.indexOf(record) + 1) + (Constant.itemsPerPage * (pageNumber - 1)))}
        </span>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Role',
      dataIndex: ['role', 'role'],
      key: 'role',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Edit',
      dataIndex: 'edit',
      key: 'action',
      render: (text: any, record: any) => (
        <Space size="large">
          <EditFilled onClick={() => viewUserModal(true, record)} />
        </Space>
      ),
    },
    {
      title: 'Delete',
      dataIndex: 'delete',
      key: 'action',
      render: (text: any, record: any) => (
        <Space size="large">
          <div className='cursor-pointer' onClick={() => viewDeleteConfirmModal(record.id)}>
            <Icon className='icon-16 delete' iconRef="#delete" />
          </div>
        </Space>
      ),
    },
  ];

  const saveData = () => {
    form.validateFields()
      .then((value) => {
        setModalButtonLoading(true);
        if (editMode) {
          const modifiedData = form.getFieldsValue(Object.keys(value)
            .filter((x: string) => form.isFieldTouched(x)));

          if (Object.keys(modifiedData).length > 0) {
            addMutate.mutate(value);
          } else {
            setModalVisibility(false);
            setModalButtonLoading(false);
          }
        } else {
          addMutate.mutate(value);
        }
      });
  };

  const onSearchText = (currentSearchText: string) => {
    if (searchText !== currentSearchText) {
      setSearchText(currentSearchText);
      setPageNumber(Constant.defaultPageNumber);
    }
  };

  const handleSearchTextChange = (value: string) => {
    if (value.length === 0) {
      onSearchText('');
    }
  };

  const setButtonLoading = (value: boolean) => {
    setModalButtonLoading(value);
  };

  return (
    <Layout.Content className="h-100">
      <div className="d-flex flex-column h-100">
        <div className="flex-auto bg-white px-4 pt-4 pb-3 border-bottom border-radius-top">
          <Row gutter={[8, 8]} className="align-items-center mb-3">
            <Col xs={24} sm={24} md={10} lg={12}>
              <Typography.Title className="m-0 page-title" level={4}>
                Users
              </Typography.Title>
            </Col>
            <Col
              xs={24}
              sm={24}
              md={14}
              lg={12}
              className="right-content-mobile"
            >
              <div className="d-flex justify-content-end">
                {userSearchIcon(onSearchText, handleSearchTextChange)}
                <div className="flex-auto ml-3">
                  <Button
                    type="primary"
                    size="large"
                    shape="round"
                    onClick={() => viewUserModal(false)}
                    disabled={isLoading}
                  >
                    <Icon className="icon-12 mr-2" iconRef="#add" />
                    Add
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className="flex-fill overflow-auto meta-space-table">
          <Spin spinning={loading}>
            <Table
              columns={tableColumns}
              rowKey={(record) => record.id}
              pagination={
                resolvedData?.count > Constant.itemsPerPage && {
                  pageSize: Constant.itemsPerPage,
                  position: ['bottomRight'],
                  total: resolvedData?.count,
                  current: pageNumber,
                  onChange: (currentPageNumber: number) => {
                    setPageNumber(currentPageNumber);
                  },
                  showSizeChanger: false,
                }
              }
              dataSource={resolvedData && resolvedData.users}
            />
          </Spin>
        </div>
      </div>

      <AddUserModal
        editMode={editMode}
        form={form}
        onSave={saveData}
        onClose={() => setModalVisibility(false)}
        modalVisibility={modalVisibility}
        userRoles={roles || []}
        buttonLoading={buttonLoading}
        setButtonLoading={setButtonLoading}
      />
    </Layout.Content>
  );
};

export default observer(Users);
