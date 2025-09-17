import React from 'react';
import { Card, Button, Dropdown } from 'antd';
import { 
  EditOutlined, 
  DeleteOutlined, 
  StarOutlined, 
  StarFilled,
  MoreOutlined 
} from '@ant-design/icons';

const TaskCard = ({ 
  task, 
  onEdit, 
  onDelete, 
  onToggleFavorite, 
  moveMenu 
}) => {
  return (
    <Card 
      size="small" 
      className={`task-card ${task.isFavorite ? 'favorite' : ''}`}
      actions={[
        <Button 
          type="text" 
          icon={task.isFavorite ? <StarFilled /> : <StarOutlined />} 
          onClick={onToggleFavorite}
        />,
        <Button type="text" icon={<EditOutlined />} onClick={onEdit} />,
        <Dropdown overlay={moveMenu} trigger={['click']}>
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>,
        <Button type="text" icon={<DeleteOutlined />} onClick={onDelete} />,
      ]}
    >
      <div className="task-content">
        <h4>{task.title}</h4>
        {task.description && <p>{task.description}</p>}
      </div>
    </Card>
  );
};

export default TaskCard;