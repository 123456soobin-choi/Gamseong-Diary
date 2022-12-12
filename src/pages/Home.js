import React from 'react';
import Layout from '../components/common/Layout';
import Header from '../components/common/Header';
import CardList from '../components/features/home/CardList';

function Home() {
  return (
    <Layout>
      <Header />
      <CardList />
    </Layout>
  );
}

export default Home;
