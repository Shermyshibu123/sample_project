import React, { useState } from 'react';
import { observer } from 'mobx-react';
import {
  Layout, Spin, Typography, Table, Button, Space, Form, Modal, Tag, Col, Row,
} from 'antd';
import { EditFilled, ExclamationCircleOutlined } from '@ant-design/icons';
import notification from '../../Global/Notification';
import Constant from '../../Global/Constant';
import UserRoleModal from './UserRoleModal';
import './UserRole.less';
import { useQueryClient, useMutation, useQuery } from 'react-query';
import userRoleService from '../../Services/userRoleService';
import Icon from '../../Components/Icon';
import { searchTextTemplate, searchTextchangeTemplate, userSearchIcon } from '../../Components/Common';

type TableHeaderProp = {
  title: string;
  dataIndex: string;
  key?: string;
  align: 'left' | 'right' | 'center' | undefined;
  render?: (value: any) => any;
}



const createOrUpdateUserRole = async (newRole: any) => {
  if (newRole.id) {
    const updateResponse = await userRoleService.updateUserRole(newRole.id, newRole.modifiedData);
    return updateResponse.config.data;
  }
  const createResponse = await userRoleService.createUserRole(newRole);
  return createResponse.config.data;
};

const deleteUserRole = async (id: any) => {
  const deleteResponse = await userRoleService.deleteUserRole(id);
  return deleteResponse.config.data;
};

function UserRole() {
  const [form] = Form.useForm();

  const [pageNumber, setPageNumber] = useState(Constant.defaultPageNumber);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false)

  const fetchUserRoles = async (page: number, search: string) => {
    setLoading(true);
    if (searchText && searchText !== '') {
      const SerachResponse = await userRoleService.getSearchResult(searchText, pageNumber, Constant.itemsPerPage);
      setLoading(false);
      return { userRoles: SerachResponse.data.roles, count: SerachResponse.data.totalRecords };
    }
    const getResponse = await userRoleService.getUserRoles(pageNumber, Constant.itemsPerPage);
    setLoading(false);
    return { userRoles: getResponse.data.roles, count: getResponse.data.total };
  };

  const { data: resolvedData, isLoading } = useQuery(
    ['userRoles', pageNumber, searchText.trim()],
    () => fetchUserRoles(pageNumber, searchText.trim()),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: true,
      onSuccess: () => { onMutateSuccess('getUserRoles'); },
      onError: (error: any) => { onMutateError(error); },
    });
  const createOrUpdateMutate = useMutation(createOrUpdateUserRole, {
    onSuccess: () => { onMutateSuccess('createOrUpdate'); },
    onError: (error: any) => { onMutateError(error); },
  });
  const deleteMutate = useMutation(deleteUserRole, {
    onSuccess: () => { onMutateSuccess('delete'); },
    onError: (error: any) => { onMutateError(error); },
  });

  const viewUserRoleModal = (isEditMode: boolean, record?: any) => {
    setEditMode(isEditMode);
    form.resetFields();
    form.setFieldsValue(record || {});
    form.setFields([
      { touched: false, name: 'role' },
      { touched: false, name: 'userAccess' },
    ]);
    setModalVisibility(true);
  };
  let queryClient = useQueryClient();
  const onMutateSuccess = (isFrom: string) => {
    if (isFrom === 'createOrUpdate' || isFrom === 'delete') {
      queryClient.invalidateQueries('userRoles');
      if (isFrom === 'delete') {
        const lastPageNumber = Math.ceil((resolvedData?.count - 1) / Constant.itemsPerPage);
        setPageNumber(pageNumber < lastPageNumber ? pageNumber : lastPageNumber);
      }
      if (isFrom === 'createOrUpdate') {
        setPageNumber(editMode ? pageNumber : Math.ceil((resolvedData?.count + 1) / Constant.itemsPerPage));
      }
    }
    setModalLoading(false);
    setModalVisibility(false);
  };

  const onMutateError = (error: any) => {
    if (error && error.response && error.response.data && error.response.data.error) {
      notification.error({
        description: error.response.data.error.message,
        message: 'Error',
      });
    }
  };
  const onSearchText = (currentSearchText: any) =>
    searchTextTemplate(currentSearchText, searchText, setSearchText, setPageNumber)

  const viewDeleteConfirmModal = (id: string) => {
    Modal.confirm({
      title: Constant.deleteModalTitle,
      content: Constant.deleteModalContent,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        deleteMutate.mutate(id);
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
          {resolvedData?.userRoles.length > 10 ? (resolvedData?.userRoles?.indexOf(record) + 1)
            : ((resolvedData?.userRoles?.indexOf(record) + 1) + (Constant.itemsPerPage * (pageNumber - 1)))}
        </span>
      ),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      align: 'left',
    },
    {
      title: 'Dashboard',
      dataIndex: 'userAccess',
      key: 'voice',
      render: (userAccess: Array<number>) => (
        <span>
          {userAccess.includes(Constant.userAccess.dashboard) ? <Tag color="processing">Yes</Tag> : <Tag color="default">No</Tag>}
        </span>
      ),
    },
    {
      title: 'Users',
      dataIndex: 'userAccess',
      key: 'users',
      render: (userAccess: Array<number>) => (
        <span>
          {userAccess.includes(Constant.userAccess.users) ? <Tag color="processing">Yes</Tag> : <Tag color="default">No</Tag>}
        </span>
      ),
    },
    {
      title: 'User Roles',
      dataIndex: 'userAccess',
      key: 'userRoles',
      render: (userAccess: Array<number>) => (
        <span>
          {userAccess.includes(Constant.userAccess.userRoles) ? <Tag color="processing">Yes</Tag> : <Tag color="default">No</Tag>}
        </span>
      ),
    },
    {
      title: 'Edit',
      dataIndex: 'edit',
      key: 'action',
      align: 'center',
      render: (text: any, record: any) => (
        <Space size="large">
          <EditFilled onClick={() => viewUserRoleModal(true, record)} />
        </Space>
      ),
    },
    {
      title: 'Delete',
      dataIndex: 'delete',
      key: 'action',
      align: 'center',
      render: (text: any, record: any) => (
        <Space size="large">
          <div className='cursor-pointer' onClick={() => viewDeleteConfirmModal(record.id)}>
            <Icon className='icon-16 delete' iconRef="#delete" />
          </div>
        </Space>
      ),
    },
  ] as Array<TableHeaderProp>;

  const saveData = () => {
    setModalLoading(false);
    form.validateFields()
      .then((value) => {
        if (editMode) {
          const modifiedData = form.getFieldsValue(Object.keys(value)
            .filter((x: string) => form.isFieldTouched(x)));
          if (Object.keys(modifiedData).length > 0) {
            value.modifiedData = modifiedData;
            createOrUpdateMutate.mutate(value);
          } else {
            setModalLoading(false);
            setModalVisibility(false);
          }
        } else {
          createOrUpdateMutate.mutate(value);
        }
      });
  };


  const handleSearchTextChange = (value: string) =>
    searchTextchangeTemplate(value, onSearchText);

  return (
    <Layout.Content className="h-100">
      <div className="d-flex flex-column h-100">
        <div className="flex-auto bg-white px-4 pt-4 pb-3 border-bottom border-radius-top">
          <Row gutter={[8, 8]} className="align-items-center mb-3">
            <Col xs={24} sm={24} md={10} lg={12}>
              <Typography.Title className="m-0 page-title" level={4}>
                User Roles
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
                    onClick={() => viewUserRoleModal(false)}
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
              className={` ${resolvedData?.count <= Constant.itemsPerPage
                ? 'table-padding'
                : ''
                }`}
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
              dataSource={resolvedData?.userRoles}
            />
          </Spin>
        </div>
      </div>
      <UserRoleModal
        form={form}
        modalVisibility={modalVisibility}
        editMode={editMode}
        onCancel={() => setModalVisibility(false)}
        onOk={saveData}
        modalLoading={modalLoading}
      />
    </Layout.Content>
  );
}

export default observer(UserRole);
