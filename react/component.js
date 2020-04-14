
import { renderComponent } from '../react-dom'
import { setStateByQueue } from './set-state-queue'

export default class Component {
    constructor (props = {}) {
        this.props = props
        this.state = {

        }
    }
    setState(newState) {
        // 数据处理
        // Object.assign(this.state, newState)
        // console.log(newState, 'newstate')
        setStateByQueue(newState, this)
        // 渲染组件
        // renderComponent(this)
    }
}
