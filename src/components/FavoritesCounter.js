import React from 'react';
import { Badge } from 'antd';
import { StarFilled } from '@ant-design/icons';

const FavoritesCounter = ({ tasks }) => {
  const favoriteCount = tasks.filter(task => task.isFavorite).length;
  
  return (
    <Badge count={favoriteCount} showZero>
      <StarFilled style={{ fontSize: '24px', color: 'gold' }} />
    </Badge>
  );
};

export default FavoritesCounter;