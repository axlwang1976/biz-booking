import React from 'react';
import { Button } from 'antd';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

const FormButton = ({ history, path, isLoading, disabled, closeModal }) => {
  return (
    <>
      <Button
        type="ghost"
        style={{ marginRight: 20, padding: '0 21px' }}
        shape="round"
        onClick={() =>
          closeModal ? closeModal(false) : history.push(`/${path}`)
        }
      >
        <FormattedMessage id="app.cancel" />
      </Button>
      <Button
        type="primary"
        htmlType="submit"
        style={{ padding: '0 21px' }}
        shape="round"
        disabled={disabled}
      >
        {isLoading ? (
          <FormattedMessage id="app.saving" />
        ) : (
          <FormattedMessage id="app.submit" />
        )}
      </Button>
    </>
  );
};

export default withRouter(FormButton);
