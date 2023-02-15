import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Input, Modal, notification } from "antd";
import React from "react";
import Constant from "../../Global/Constant";


export function mutateErrorResponse(setLoading: any, error: any) {
    setLoading(false);
    if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.error
    ) {
        notification.error({
            description: error.response.data.error.message,
            message: 'Error',
        });
    }
}
export function deleteModalView(deleteMutate: any, id: string) {
    Modal.confirm({
        title: Constant.deleteModalTitle,
        content: Constant.deleteAssetModalContent,
        icon: <ExclamationCircleOutlined />,
        onOk: () => {
            deleteMutate.mutate(id);
        },
        okText: 'Yes',
        cancelText: 'No',
        okType: 'danger',
    });
}

export function searchTextTemplate(currentSearchText: string, searchText: any, setSearchText: any, setPageNumber: any) {
    if (searchText !== currentSearchText) {
        setSearchText(currentSearchText);
        setPageNumber(Constant.defaultPageNumber);
    }
}
export function searchTextchangeTemplate(value: any, onSearchText: any) {
    if (value.length === 0) {
        onSearchText('');
    }
}
export function searchIconFunction(onSearchText: any, handleSearchTextChange: any) {
    return (<div className="flex-auto">
        <Input.Search
            size="large"
            placeholder="Search"
            onSearch={(value) => onSearchText(value)}
            onChange={(e) => handleSearchTextChange(e.target.value)}
            style={{ maxWidth: 250 }}
            allowClear
            enterButton
        />
    </div>)
}
export function userSearchIcon(onSearchText: any, handleSearchTextChange: any) {
    return (
        <div className="flex-auto">
            <Input.Search
                placeholder="Search"
                size="large"
                onSearch={(value) => onSearchText(value)}
                onChange={(e) => handleSearchTextChange(e.target.value)}
                style={{ maxWidth: 250 }}
                allowClear
                enterButton
            />
        </div>
    )
}
export function createAndUpdateModal(form: any, confirmLoading: any, editMode: any) {
    return (
        <Button key="ok" type="primary" onClick={() => form.submit()} loading={confirmLoading}>
            {editMode ? 'Update' : 'Create'}
        </Button>
    )
}