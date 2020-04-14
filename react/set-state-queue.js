

/**
 * @description 1. 异步更新state，短时间内把多个合并为一个队列
 * @description 2. 一段时间后，清空队列，渲染界面
 * @param {function | object} stateChange 异步渲染执行函数（返回`st`）或者组件内部 state
 * @param {object} component 组件本身
 */

import { renderComponent } from "../react-dom"

let setStateQueue = []
let renderQueue = []
export function setStateByQueue(stateChange, component) {
    // debugger
    // console.log(setStateQueue, 'setStateQueue 1')
    if(setStateQueue.length===0) {
        // console.log(setStateQueue, 'setStateQueue 2')
        defer(renderByAsync)
        // setTimeout(()=> {
        //     renderByAsync()
        // })
    }
    setStateQueue.push({
        stateChange,
        component
    })
    let r = renderQueue.some(item=> item===component)
    if(!r) {
        renderQueue.push(component)
    }
}
function defer(fn) {
    return Promise.resolve().then(fn)
}

function renderByAsync() {
    // debugger
    let item, needRenderComp
    while (item = setStateQueue.shift()) {
        const { stateChange, component } = item

        // 保存之前状态
        if(!component.preState) {
            component.preState = Object.assign({}, component.state)
        }
        if(typeof stateChange === 'function') {
            Object.assign(component.state, stateChange(component.preState, component.props))
        } else {
            Object.assign(component.state, stateChange)
        }
        // 更新状态
        component.preState = component.state
        // console.log(component.preState, component.state, renderQueue[0], 'renderQueue.shift()')
    }

    while (needRenderComp = renderQueue.shift()) {
        renderComponent(needRenderComp)
    }
}
