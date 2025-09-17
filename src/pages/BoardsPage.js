import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Row, Col } from 'antd';
import { boards } from '../data/mockData';

const BoardsPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="boards-page">
      <h2>My Boards</h2>
      <Row gutter={16}>
        {boards.map(board => (
          <Col span={8} key={board.id}>
            <Card 
              hoverable
              title={board.name}
              onClick={() => navigate(`/boards/${board.id}`)}
            >
              <p>{board.description}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default BoardsPage;