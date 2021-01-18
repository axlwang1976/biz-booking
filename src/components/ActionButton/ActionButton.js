import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { withRouter } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';

const ActionButton = ({
  record,
  history,
  path,
  deleteItem,
  isLoading,
  userAuth,
  display,
  reload,
  deleteDisplay,
}) => {
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);

  const handleOk = () => {
    deleteItem(userAuth, record.ID);
    if (reload) {
      window.location.reload();
    }
  };

  const handleCancel = () => setVisible(false);

  const editHandler = () => {
    history.push(`/${path}/${record.ID}`);
  };

  return (
    <>
      <Button
        type="primary"
        size="middle"
        style={{ marginRight: 10, display: display }}
        shape="round"
        onClick={editHandler}
      >
        <EditOutlined />
      </Button>
      {deleteItem && (
        <>
          <Button
            type="danger"
            size="middle"
            shape="round"
            onClick={showModal}
            style={{ display: deleteDisplay }}
          >
            <DeleteOutlined />
          </Button>
          <Modal
            title={<FormattedMessage id="app.deleteItem" />}
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText={
              isLoading ? (
                <FormattedMessage id="app.deleting" />
              ) : (
                <FormattedMessage id="app.delete" />
              )
            }
            cancelText={<FormattedMessage id="app.cancel" />}
            okButtonProps={{ disabled: isLoading }}
          >
            <p>
              <FormattedMessage id="app.sureDelete" />
            </p>
          </Modal>
        </>
      )}
    </>
  );
};

export default withRouter(ActionButton);
