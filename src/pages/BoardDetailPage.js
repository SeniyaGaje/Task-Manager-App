import React, { useReducer, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, message } from 'antd';
import useBoardApi from '../hooks/useBoardApi';
import { boardReducer, initialState } from '../reducers/boardReducer';
import TaskColumn from '../components/TaskColumn';
import TaskModal from '../components/TaskModal';
import FavoritesCounter from '../components/FavoritesCounter';
import ThemeSwitcher from '../components/ThemeSwitcher';

const BoardDetailPage = () => {
  const { id } = useParams();
  const api = useBoardApi();
  const [state, dispatch] = useReducer(boardReducer, initialState);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchBoardData();
  }, [id]);

  const fetchBoardData = async () => {
    try {
      const board = await api.get(`/boards/${id}`);
      const lists = await api.get(`/lists?boardId=${id}`);
      const tasks = await api.get(`/tasks?listId=${lists.map(l => l.id).join('&listId=')}`);
      
      dispatch({ 
        type: 'SET_BOARD', 
        payload: { board, lists, tasks } 
      });
    } catch (error) {
      message.error('Failed to load board');
    }
  };

  const handleAddTask = async (listId, taskData) => {
    try {
      const newTask = await api.post('/tasks', {
        ...taskData,
        listId,
        isFavorite: false,
        order: state.tasks.filter(t => t.listId === listId).length,
      });
      dispatch({ type: 'ADD_TASK', payload: newTask });
      message.success('Task added successfully');
    } catch (error) {
      message.error('Failed to add task');
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalVisible(true);
  };

  const handleSaveTask = async (taskData) => {
    try {
      const updatedTask = await api.put(`/tasks/${taskData.id}`, taskData);
      dispatch({ type: 'UPDATE_TASK', payload: updatedTask });
      setIsModalVisible(false);
      setEditingTask(null);
      message.success('Task updated successfully');
    } catch (error) {
      message.error('Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      dispatch({ type: 'DELETE_TASK', payload: taskId });
      message.success('Task deleted successfully');
    } catch (error) {
      message.error('Failed to delete task');
    }
  };

  const handleMoveTask = async (taskId, newListId) => {
    try {
      const task = state.tasks.find(t => t.id === taskId);
      const updatedTask = { ...task, listId: newListId };
      
      await api.put(`/tasks/${taskId}`, updatedTask);
      dispatch({ type: 'MOVE_TASK', payload: { taskId, newListId } });
    } catch (error) {
      message.error('Failed to move task');
    }
  };

  const handleToggleFavorite = async (taskId) => {
    try {
      const task = state.tasks.find(t => t.id === taskId);
      const updatedTask = { ...task, isFavorite: !task.isFavorite };
      
      await api.put(`/tasks/${taskId}`, updatedTask);
      dispatch({ type: 'TOGGLE_FAVORITE', payload: taskId });
    } catch (error) {
      message.error('Failed to update task');
    }
  };

  const handleChangeTheme = async (theme) => {
    try {
      const updatedBoard = { ...state.board, theme };
      await api.put(`/boards/${id}`, updatedBoard);
      dispatch({ type: 'SET_THEME', payload: theme });
    } catch (error) {
      message.error('Failed to change theme');
    }
  };

  if (!state.board) return <div>Loading...</div>;

  return (
    <div className={`board-detail ${state.board.theme}`}>
      <div className="board-header">
        <h2>{state.board.name}</h2>
        <div className="board-controls">
          <FavoritesCounter tasks={state.tasks} />
          <ThemeSwitcher 
            currentTheme={state.board.theme} 
            onChange={handleChangeTheme}
          />
        </div>
      </div>
      
      <Row gutter={16} className="task-columns">
        {state.lists.map(list => (
          <TaskColumn
            key={list.id}
            list={list}
            tasks={state.tasks.filter(task => task.listId === list.id)}
            onAddTask={(taskData) => handleAddTask(list.id, taskData)}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
            onMoveTask={handleMoveTask}
            onToggleFavorite={handleToggleFavorite}
            allLists={state.lists}
          />
        ))}
      </Row>
      
      <TaskModal
        visible={isModalVisible}
        task={editingTask}
        onSave={handleSaveTask}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingTask(null);
        }}
      />
    </div>
  );
};

export default BoardDetailPage;