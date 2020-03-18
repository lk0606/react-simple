import Component from '../react/component'

// 渲染虚拟dom
function render(vnode, root) {
    // console.log(vnode, root, 'vnode, root')
    if([undefined, null, false, true].includes(vnode)) {
        return
    }
    return root.appendChild(_render(vnode))
}

// 创建虚拟dom
function _render(vnode) {
    // console.log(this, 'this render')
    if([undefined, null, false, true].includes(vnode)) {
        return
    }

    if(typeof vnode === 'number') {
        vnode = String(vnode)
    }



    if(typeof vnode === 'string') {
        return document.createTextNode(vnode)
    }

    const { tag, attrs } = vnode

    // 函数式组件
    if(typeof tag === 'function') {
        // 1. 构造类组件
        const comp = createComponent(tag, attrs)
        // 2. 设置组件属性 传值
        setComponentProps(comp, attrs)
        // 3. 组件渲染节点对象
        return comp.base
    }

    const dom = document.createElement(tag)

    if(attrs) {
        Object.keys(attrs).forEach(key=> {
            // console.log(key, attrs[key], 'attrs[key]')
            // if(typeof attrs[key] ==='function') {
            //     console.log(key, attrs[key], 'attrs[key]')
            // }
            const value = attrs[key]
            setAttribute(dom, key, value)
        })
    }

    if(vnode.children) {
        vnode.children.forEach(child=> {
            // console.log(child, 'child')
            render(child, dom)
        })
    }

    return dom

}
// 渲染类组件
export function renderComponent(comp) {
    if(comp.base) {
        if(comp.componentWillUpdate) {
            comp.componentWillUpdate()
        }
    }
    // 调用实例 生成虚拟 dom
    const renderer = comp.render()
    const base = _render(renderer)

    if(comp.base && comp.base.parentNode) {
        comp.base.parentNode.replaceChild(base, comp.base)
        if(comp.componentDidUpdate) comp.componentDidUpdate()
    }

    // 挂载虚拟dom 方法
    // console.log(renderer, 'renderer renderComponent')
    comp.base = base
}
// 设置类组件属性
function setComponentProps(comp, props) {
    if(!comp.base) {
        if(comp.componentWillMount) comp.componentWillMount()
        if(comp.componentWillReceiveProps) comp.componentWillReceiveProps(props)
    }

    // 设置类属性
    comp.props = props
    // console.log(comp, 'comp setComponentProps')
    renderComponent(comp)
    if(comp.base) {
        if(comp.componentDidMount) {
            comp.componentDidMount()
        }
    }
}

/**
 * @desc 创建 函数/类组件
 * @param comp 类组件或者函数组件 JSX
 * @param props 组件传值
 * @return {Component} 类组件的实例
 */
function createComponent(comp, props) {
    // console.log(comp, props, 'comp, props createComponent')
    let inst

    // 类
    if(comp.prototype && comp.prototype.render) {
        inst = new comp(props)
    } else {
        // 函数组件扩展为类组件，统一管理
        inst = new Component(props)
        // console.log(inst, 'new Component(props)')
        // 类组件构造方法
        inst.constructor = comp
        // 构建虚拟dom
        inst.render = function() {
            // console.log(this, 'inst.render this')
            // 传递 props
            return this.constructor(props)
        }

        console.log(inst, 'inst')
    }

    return inst
}

// 设置 dom 属性
function setAttribute(dom, key, value) {
    // console.log(this, 'setAttribute')

    // event onClick onChange
    if(/on\w+/.test(key)) {
        key = key.toLowerCase()
        dom[key] = value || ''
    }
    else if (key === 'style') {
        if(!value || typeof value === 'string') {
            dom.style.cssText = value || ''
        }
        else if (value && typeof value === 'object') {
            for(let property in value) {
                dom.style[property] = value[property]
            }
        }
    }
    else {
        if(key in dom) {
            dom[key] = value || ''
        }

        if(value) {
            dom.setAttribute(key, value)
        } else {
            dom.removeAttribute(key)
        }
    }
}

export default {
    render
}

export { render }
