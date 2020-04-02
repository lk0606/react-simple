
import { renderComponent } from '../react-dom'

export default class Component {
    constructor (props = {}) {
        this.props = props
        this.state = {

        }
    }
    setState(newState) {
        // 数据处理
        Object.assign(this.state, newState)
        // 渲染组件
        renderComponent(this)
    }
}
