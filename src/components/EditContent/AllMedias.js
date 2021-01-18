import React, { useState } from 'react';
import { Typography, Table, Button } from 'antd';

import './AllMedias.css';
import Preview from '../../pages/Content/Preview';
import { FormattedMessage } from 'react-intl';

const AllMedias = ({
  currentTab,
  medias,
  addNewMedias,
  closeModal,
  getPreview,
}) => {
  const [selectedMedias, setSelectedMedias] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { Title } = Typography;

  const columns = [
    {
      title: <FormattedMessage id="app.preview" />,
      key: 'preview',
      render: (text, record) => {
        return (
          <Preview record={record} getPreview={getPreview} id={record.ID} />
        );
      },
    },
    {
      title: <FormattedMessage id="app.fileName" />,
      dataIndex: 'FileName',
    },
    {
      title: <FormattedMessage id="app.mediaType" />,
      dataIndex: 'MediaType',
    },
  ];
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedMedias(
        selectedRows.map((row) => {
          return {
            ...row,
            duration: row.MediaType === 'image' ? 7 : -1,
          };
        })
      );
      setSelectedRowKeys(selectedRowKeys);
    },
    selectedRows: selectedMedias,
    selectedRowKeys,
  };

  const handleOk = () => {
    addNewMedias(currentTab, selectedMedias);
    setSelectedRowKeys([]);
    closeModal(false);
  };

  const handleCancel = () => {
    setSelectedRowKeys([]);
    closeModal(false);
  };

  return (
    <div className="all-medias-container">
      {medias.length ? (
        <>
          <Button
            onClick={handleCancel}
            style={{ marginRight: 10, marginBottom: 10 }}
          >
            <FormattedMessage id="app.cancel" />
          </Button>
          <Button type="primary" onClick={handleOk}>
            <FormattedMessage id="app.ok" />
          </Button>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={medias}
            rowKey={(record) => record.ID}
            pagination={false}
          />
          <Button
            onClick={handleCancel}
            style={{ marginRight: 10, marginTop: 10 }}
          >
            <FormattedMessage id="app.cancel" />
          </Button>
          <Button type="primary" onClick={handleOk}>
            <FormattedMessage id="app.ok" />
          </Button>
        </>
      ) : (
        <Title level={1}>Medias is empty</Title>
      )}
    </div>
  );
};

export default AllMedias;
