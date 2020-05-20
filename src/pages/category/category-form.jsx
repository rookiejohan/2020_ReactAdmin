import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Input
} from 'antd'

const Item = Form.Item

/*
添加/更新分类的form组件
 */
export default class CategoryForm extends Component {

  static propTypes = {
    categoryName: PropTypes.string,
  }
  
  render() {
    const [form] = Form.useForm();
    const {categoryName} = this.props
    const { getFieldDecorator } = form

    return (
      <Form>
      <Item>
        {
          getFieldDecorator('categoryName', {
            initialValue: categoryName || '',
            rules: [
              {required: true, message: '分类名称必须输入'}
            ]
          })(
            <Input placeholder='请输入分类名称'/>
          )
        }
      </Item>
    </Form>

    )
  }
}
