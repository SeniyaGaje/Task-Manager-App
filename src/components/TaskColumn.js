import React, { useState } from 'react';
import { Card, Button, Input, Dropdown, Menu } from 'antd';
import { PlusOutlined, MoreOutlined } from '@ant-design/icons';
import TaskCard from './TaskCard';

const { TextArea } = Input;

const TaskColumn = ({ 
  list, 
  tasks, 
  onAddTask, 
  onEditTask, 
  onDeleteTask, 
  onMoveTask, 
  onToggleFavorite,
  allLists 
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      onAddTask({
        title: newTaskTitle.trim(),
        description: '',
      });
      setNewTaskTitle('');
      setIsAdding(false);
    }
  };

  const handleMoveMenuClick = (taskId, listId) => {
    onMoveTask(taskId, listId);
  };

  const moveMenu = (task) => (
    <Menu>
      {allLists
        .filter(l => l.id !== task.listId)
        .map(list => (
          <Menu.Item 
            key={list.id} 
            onClick={() => handleMoveMenuClick(task.id, list.id)}
          >
            Move to {list.title}
          </Menu.Item>
        ))
      }
    </Menu>
  );

  return (
    <div className="task-column">
      <div className="column-header">
        <h3>{list.title}</h3>
        <span className="task-count">{tasks.length}</span>
      </div>

      <div className="tasks-container">
        {tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={() => onEditTask(task)}
            onDelete={() => onDeleteTask(task.id)}
            onToggleFavorite={() => onToggleFavorite(task.id)}
            moveMenu={moveMenu(task)}
          />
        ))}
      </div>

      {isAdding ? (
        <Card size="small" className="add-task-card">
          <TextArea
            placeholder="Enter task title"
            autoSize
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            autoFocus
          />
          <div className="add-task-actions">
            <Button type="primary" size="small" onClick={handleAddTask}>
              Add Task
            </Button>
            <Button size="small" onClick={() => setIsAdding(false)}>
              Cancel
            </Button>
          </div>
        </Card>
      ) : (
        <Button 
          icon={<PlusOutlined />} 
          onClick={() => setIsAdding(true)}
          block
        >
          Add a task
        </Button>
      )}
    </div>
  );
};

export default TaskColumn;