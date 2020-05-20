import React, { Component } from 'react'
import { Form, Input, Button, Checkbox, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import logo from './images/logo.png'
import './login.less'
import memoryUtils from '../../utils/memoryUtils'
import { reqLogin } from '../../api'
import storageUtils from '../../utils/storageUtils';
import {Redirect} from 'react-router-dom'

export default class Login extends Component {


  render() {
    const onFinish = async (values) => {
      const { username, password } = values
      console.log(username, password)
      const result = await reqLogin(username, password)
      console.log('login()', result)
      if (result.status === 0) {
        // 提示登录成功
        message.success('登录成功')
        // 保存用户登录信息
        const user = result.data
        storageUtils.saveUser(user)
        memoryUtils.user = user
        // 跳转到主页面
        this.props.history.replace('/')
      } else {
        // 登录失败, 提示错误
        message.error(result.msg)
      }

    };
    // 如果用户已经登陆, 自动跳转到admin
    if (memoryUtils.user && memoryUtils.user._id) {
      return <Redirect to='/' />
    }
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo" />
          <h1>React项目：后台管理系统</h1>
        </header>
        <section className="login-content">
          <h3>用户登录</h3>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your Username!' }]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="#1">
                Forgot password
            </a>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
        </Button>
        Or <a href="#1">register now!</a>
            </Form.Item>
          </Form>
        </section>

      </div>
    )
  }
}
