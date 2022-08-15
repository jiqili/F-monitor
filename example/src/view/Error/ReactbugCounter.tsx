import React from "react"

export class BuggyCounter extends React.Component {
  public state: any
  constructor(props: any) {
      super(props);
      this.state = { counter: 0 }
      this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    let {counter}=this.state
    counter++
    this.setState({counter})
  }

  render() {
    
      if (this.state.counter === 5) {
          // react异常捕获可捕获到render的渲染异常，在js中throw的异常捕获不到
          throw new Error('I crashed!');
      }
      return <h1 onClick={this.handleClick}>ReactError:{this.state.counter}</h1>
  }
}