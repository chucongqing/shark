import React, { FC } from 'react';
import {message, Button } from 'antd';
import './App.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;




const info = ()=>{
  message.info("Hello world!")
}

const App: FC = () => (
  <div className="App">
    <Button type="primary" onClick={info}>Button</Button>
  </div>
);

export default App;