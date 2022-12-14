import React from 'react';
import Layout from '../components/common/Layout';
import Header from '../components/common/Header';
import CommentList from '../components/features/details/CommentList';

function Details() {
  return (
    <Layout>
      <Header />
      <CommentList />
    </Layout>
  );
}

export default Details;
