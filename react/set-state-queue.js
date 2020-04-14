

/**
 * @description 1. 异步更新state，短时间内把多个合并为一个队列
 * @description 2. 一段时间后，清空队列，渲染界面
 * @param {} stateChange 
 * @param {} component 
 */

import { renderComponent } from "../react-dom"

let setStateQueue = []
let renderQueue = []
export function setStateByQueue(stateChange, component) {
    if(setStateQueue.length===0) {
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
    let item, component
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

        component.preState = component.state
    }

    while (component = renderQueue.shift()) {
        renderComponent(component)
    }
}