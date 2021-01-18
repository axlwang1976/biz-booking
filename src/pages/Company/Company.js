/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Button, Layout, Table, Typography } from 'antd';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { EditOutlined } from '@ant-design/icons';

import Footer from '../../components/Footer/Footer';
import PageContent from '../../components/PageContent/PageContent';
import Spinner from '../../components/Spinner/Spinner';
import { getCompanies } from '../../redux/actions/companiesActions';

const Company = ({
  collapsed,
  getCompanies,
  isLoading,
  companies,
  history,
  userAuth,
}) => {
  const columns = [
    {
      title: <FormattedMessage id="app.companyName" />,
      key: 'companyName',
      render: (text, record) => (
        <>
          <p>{record.NameZH}</p>
          <p>{record.NameEN}</p>
        </>
      ),
    },
    {
      title: <FormattedMessage id="app.companyID" />,
      dataIndex: 'CompanyID',
    },
    {
      title: <FormattedMessage id="app.webURL" />,
      dataIndex: 'WebURL',
    },
    {
      title: <FormattedMessage id="app.phoneAndFax" />,
      key: 'phoneAndFax',
      render: (text, record) => (
        <>
          <p>Tel: {record.Phone}</p>
          <p>Fax: {record.Fax}</p>
        </>
      ),
    },
    {
      title: 'E-Mail',
      dataIndex: 'Email',
    },
    {
      title: <FormattedMessage id="app.actions" />,
      key: 'actions',
      render: (text, record) => (
        <Button
          type="primary"
          size="middle"
          style={{ marginRight: 10 }}
          shape="round"
          onClick={() => history.push(`/company/${record.CompanyID}`)}
        >
          <EditOutlined />
        </Button>
      ),
    },
  ];

  useEffect(() => {
    if (userAuth.Uid !== '00000000') {
      getCompanies(userAuth);
    }
  }, []);

  return (
    <Layout.Content
      style={{
        padding: collapsed ? '68px 20px 20px 100px' : '68px 20px 20px 220px',
      }}
    >
      <Typography.Title level={3}>
        <FormattedMessage id="app.company" />
      </Typography.Title>
      <PageContent>
        {userAuth.Uid === '00000000' && (
          <Link to="/company/create">
            <Button
              type="primary"
              shape="round"
              size="large"
              style={{ marginBottom: 20 }}
            >
              <FormattedMessage id="app.createCompany" />
            </Button>
          </Link>
        )}
        {isLoading ? (
          <Spinner />
        ) : (
          <Table
            columns={columns}
            dataSource={companies}
            pagination={{ hideOnSinglePage: true, pageSize: 10 }}
            rowKey={(record) => String(record.ID)}
          />
        )}
      </PageContent>
      <Footer />
    </Layout.Content>
  );
};

const mapStateToProps = ({ companies }) => ({
  isLoading: companies.isLoading,
  companies: companies.companies,
});

export default connect(mapStateToProps, { getCompanies })(Company);
