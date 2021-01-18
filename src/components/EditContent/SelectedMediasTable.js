import React, { useState, useCallback, useEffect } from 'react';
import { Table } from 'antd';
import update from 'immutability-helper';

import ActionButton from './ActionButton';
import DragableBodyRow from '../DragableBodyRow/DragableBodyRow';
import Preview from '../../pages/Content/Preview';

const SelectedMediasTable = ({
  medias,
  currentTab,
  deleteMedia,
  updateMedia,
  setReOrderedMedias,
  getPreview,
}) => {
  const [data, setData] = useState(medias);
  const columns = [
    {
      title: 'Preview',
      render: (text, record) => {
        return (
          <Preview record={record} getPreview={getPreview} id={record.ID} />
        );
      },
    },
    {
      title: 'Media Name',
      dataIndex: 'FileName',
      render: (text, record) => {
        if (record.type !== 'scrollingText') {
          return record.FileName;
        } else {
          return record.text;
        }
      },
    },
    {
      title: 'Media Type',
      dataIndex: 'fileType',
      key: 'fileType',
      render: (text, record) => {
        if (record.type !== 'scrollingText') {
          return record.MediaType;
        } else {
          return 'Scrolling Text';
        }
      },
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: 'Actions',
      key: 'action',
      render: (text, record) => (
        <ActionButton
          record={record}
          deleteItem={deleteMedia}
          currentTab={currentTab}
          updateMedia={updateMedia}
        />
      ),
    },
  ];
  const components = {
    body: {
      row: DragableBodyRow,
    },
  };

  const moveRow = useCallback(
    (dragIndex, hoverIndex) => {
      const dragRow = data[dragIndex];
      setData(
        update(data, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragRow],
          ],
        })
      );
    },
    [data]
  );

  useEffect(() => {
    setData(medias);
  }, [medias]);

  useEffect(() => {
    setReOrderedMedias(data);
  }, [data, setReOrderedMedias]);

  return (
    <Table
      columns={columns}
      dataSource={data}
      components={components}
      rowKey={(record) => record.ID}
      pagination={false}
      useFixedHeader
      style={{ marginBottom: 30 }}
      onRow={(record, index) => ({ index, moveRow })}
    />
  );
};

export default SelectedMediasTable;
