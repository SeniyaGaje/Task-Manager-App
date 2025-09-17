import React from 'react';
import { Button } from 'antd';
import { BulbOutlined, BulbFilled } from '@ant-design/icons';

const ThemeSwitcher = ({ currentTheme, onChange }) => {
  const toggleTheme = () => {
    onChange(currentTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <Button 
      icon={currentTheme === 'light' ? <BulbOutlined /> : <BulbFilled />}
      onClick={toggleTheme}
    >
      {currentTheme === 'light' ? 'Dark' : 'Light'} Mode
    </Button>
  );
};

export default ThemeSwitcher;