import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import BoardsPage from './pages/BoardsPage';
import BoardDetailPage from './pages/BoardDetailPage';
import './styles/main.scss';

const { Header, Content } = Layout;

function App() {
  return (
    <Router>
      <Layout className="app-layout">
        <Header className="app-header">
          <h1>Task Manager Pro</h1>
        </Header>
        <Content className="app-content">
          <Routes>
            <Route path="/boards" element={<BoardsPage />} />
            <Route path="/boards/:id" element={<BoardDetailPage />} />
            <Route path="/" element={<BoardsPage />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
}

export default App;