import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import storageUtils from './utils/storageUtils'
import memoryUtils from './utils/memoryUtils'

// 如果local中保存了user, 将user保存到内存中
const user = storageUtils.getUser()
if(user && user._id) {
  memoryUtils.user = user
}


ReactDOM.render(<App/>,document.getElementById("root"))