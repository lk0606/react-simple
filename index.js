

import React, { Component } from './react'
import ReactDOM, { render } from './react-dom'

const ele = (
    <div className="active" title="test" onClick={test.bind(this, 1)}>
        hello,
        <p>
            react
            <p>
                <button>click: </button>
            </p>
        </p>
    </div>
)

function HomeFn(props) {
    console.log(props, 'props Home')
    return (
        <div className="active" title="test" onClick={test.bind(this, 1)}>
            hello,
            <p>
                react
                <p>child</p>
            </p>
        </div>
    )
}
class HomeClass extends Component{
    constructor(props) {
        super(props)
        // console.log(this, this.props===props, 'props')
        this.state = {
            num: 0
        }
    }

    componentWillMount() {
        console.log('组件将要加载')
    }

    componentWillReceiveProps(props) {
        console.log('组件将要接受参数:', props)
    }

    componentDidMount() {
        console.log('组件加载完成')
    }

    componentWillUpdate() {
        console.log('组件将要更新')
    }

    componentDidUpdate() {
        console.log('组件更新完成')
    }

    componentWillUnmount() {
        console.log('组件将要卸载')
    }

    handleClick() {
        this.setState({
            num: this.state.num + 1
        })
    }
    // componentDidUnmount() {
    //     console.log('组件卸载完成')
    // }

    render() {
        return <div className="active" title="test">
            hello,
            <p>
                react: {this.state.num}
                <p>
                    <button
                        id={0}
                        style={{width: '60px', height: '30px'}}
                        type="button"
                        onClick={this.handleClick.bind(this)}>click</button>
                </p>
            </p>
        </div>
    }
}


function test(...arg) {
    console.log(this, arg, 'this, arg')
}

console.log(<HomeClass/>, 'ele')

ReactDOM.render(<HomeClass/>, document.getElementById('root'))
