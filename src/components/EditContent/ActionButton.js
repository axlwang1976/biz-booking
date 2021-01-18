import React, { useState } from 'react';
import { Button, Modal, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import ScrollingText from './ScrollingText';
import SingleMedia from './SingleMedia';

const ActionButton = ({ record, deleteItem, currentTab, updateMedia }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showScrollingTextEditModal, setShowScrollingTextEditModal] = useState(
    false
  );
  const [showSingleMediaEditModal, setShowSingleMediaEditModal] = useState(
    false
  );

  const handleDeleteOk = () => {
    deleteItem(currentTab, record.ID);
    message.success('Delete item successful');
  };

  return (
    <>
      <Button
        type="primary"
        size="small"
        style={{ marginRight: 10 }}
        shape="round"
        onClick={() =>
          record.type === 'scrollingText'
            ? setShowScrollingTextEditModal(true)
            : setShowSingleMediaEditModal(true)
        }
      >
        <EditOutlined />
      </Button>
      <Button
        type="danger"
        size="small"
        shape="round"
        onClick={() => setShowDeleteModal(true)}
      >
        <DeleteOutlined />
      </Button>
      <Modal
        title="Delete Item"
        visible={showDeleteModal}
        onOk={handleDeleteOk}
        onCancel={() => setShowDeleteModal(false)}
      >
        <p>ARE YOU SURE？</p>
      </Modal>
      <Modal
        title="Edit media in content"
        centered
        visible={showScrollingTextEditModal}
        onOk={() => {}}
        onCancel={() => setShowScrollingTextEditModal(false)}
        footer={null}
      >
        <ScrollingText
          closeModal={setShowScrollingTextEditModal}
          currentTab={currentTab}
          record={record}
          updateScrollingText={updateMedia}
        />
      </Modal>
      <Modal
        title="Edit media in content"
        centered
        visible={showSingleMediaEditModal}
        onOk={() => {}}
        onCancel={() => setShowSingleMediaEditModal(false)}
        footer={null}
      >
        <SingleMedia
          closeModal={setShowSingleMediaEditModal}
          currentTab={currentTab}
          record={record}
          updateSingleMedia={updateMedia}
        />
      </Modal>
    </>
  );
};

export default ActionButton;
