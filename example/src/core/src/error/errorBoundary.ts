import React from "react";
import { emit } from '../emit'

export  class ErrorBoundary extends React.Component {
  public props!: Readonly<{ children?: any }>
  public state: any

  constructor(props: any) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError(error?: any) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true }
  }

  componentDidCatch(error: any, errorInfo: any) {
    //获取错误边界包裹的组件名
    // console.log(this,'reactboundary')
    const componentName: string[]=[]
    this.props.children.map((item: any)=>{
      if(item?.type?.name)
      componentName.push( item?.type?.name )
    })
    // 将错误日志上报给服务器
    emit({
      type: 'Error',
      name: 'ReactBoundary Error',
      data: {
        children:componentName,
        errormsg:error.message,
        errorInfo:errorInfo.componentStack
      }
    })
    console.log(errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // 你可以自定义降级后的 UI 并渲染
      return "Something went wrong."
    }

    return this.props.children;
  }
}