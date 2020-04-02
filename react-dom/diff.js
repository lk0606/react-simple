

import {
    createComponent,
    setAttribute,
    setComponentProps
} from './index'

export function diff(dom, vnode, root) {


    const result = diffNode(dom, vnode)

    if(root){
        root.appendChild(result)
    }

    return result
}

/**
 *
 * @param dom 已存在真实dom，第一次dom为undefined
 * @param vnode
 * @return {*}
 */
export function diffNode(dom, vnode) {
    let newDom = dom
    if([undefined, null, false, true].includes(vnode)) {
        return
    }
    if(typeof vnode === 'number') vnode = String(vnode)

    if(typeof vnode === 'string') {
        // 存在真实dom，更新
        if(dom && dom.nodeType === 3) {
            if(dom.textContent !== vnode) {
                // 更新文本
                dom.textContent = vnode
            }
        } else { // 不存在，创建节点
            newDom = document.createTextNode(vnode)
            if(dom && dom.parentNode) {
                dom.parentNode.replaceChild(newDom, dom)
            }
        }
        // console.log('文本节点更新：', newDom)

        return newDom
    }
    if(typeof vnode.tag === 'function') {
        const diffResult = diffComponent(newDom, vnode)
        // console.log(diffResult, 'diffResult diffComponent')
        return diffResult
    }

    // 非文本节点
    if(!dom) {
        newDom = document.createElement(vnode.tag)
    }
    if(vnode.children && vnode.children.length>0 || newDom.children && newDom.children.length>0) {
        diffChildren(newDom, vnode.children)
    }


    diffAttribute(newDom, vnode)
    return newDom
}

function diffComponent(dom, vnode) {
    // console.log(dom, vnode, 'diffComponent')
    let comp = dom

    // 无变化/首次渲染 设置属性
    if(comp && comp.constructor === vnode.tag) {
        setComponentProps(comp, vnode.attrs)
        dom = comp.base
    } else {
        // 组件发生变化 home => login
        if(comp) {
            // 删除home
            unmountComponent(comp)
            comp = null
        } else {
            comp = createComponent(vnode.tag, vnode.attrs)
            setComponentProps(comp, vnode.attrs)
            dom = comp.base
        }
    }

    // console.log(dom, 'diffComponent dom')

    return dom
}

function unmountComponent(comp) {
    removeNode(comp.base)
}


/**
 * @desc 子节点对比
 * @param dom
 * @param vChildren
 */
function diffChildren(dom, vChildren) {
    const domChildren = dom.childNodes
    let children = []
    let keyed = {}

    if(domChildren.length>0) {
        [...domChildren].forEach(item=> {
            const key = item.key
            if(key) {
                keyed[key] = item
            } else {
                children.push(item)
            }
        })
    }

    if(vChildren && vChildren.length>0) {
        let min = 0
        let len = children.length;

        [...vChildren].forEach((vChild, vIdx)=> {
            const vKey = vChild.key
            let child

            if(vKey) {
                // 如果有标记 key
                if(keyed[vKey]) {
                    child = keyed[vKey]
                    keyed[vKey] = undefined
                }
            } else if(len > min){
                // 无key，优先循环同节点
                for(let j=min; j<len; j++) {
                    let c = children[j]
                    if(c) {
                        child = c
                        children[j] = undefined
                        if(j === len-1) len--
                        if(j === min) min++
                        break
                    }
                }
            }

            //
            child = diffNode(child, vChild)
            const f = domChildren[vIdx]

            if(child && child !== dom && child !== f) {
                // 真实dom不存在，说明新增
                if(!f) {
                    dom.appendChild(child)
                } else if (child === f.nextSibling) { // 更新后节点与更新前后一个节点相同，说明当前位置节点被移除
                    removeNode(f)
                } else {
                    // 将更新后的节点放入移除节点位置
                    // insertBefore，第一个参数是要插入的节点，第二个参数是已存在的节点
                    dom.insertBefore(child, f)
                }
            }
        })
    }
}

function removeNode(child) {
    if(child && child.parentNode) {
        child.parentNode.removeNode(child)
    }
}

function diffAttribute(dom, vnode) {
    // console.log(dom, vnode, 'diffAttribute(dom, vnode)')

    let oldAttrs = {}
    let newAttrs = vnode.attrs
    const domAttrs = dom.attributes;

    // console.log([...domAttrs], '[...domAttrs]');

    [...domAttrs].forEach(item=> {
        oldAttrs[item.name] = item.value
        // console.log(item, oldAttrs, 'item oldAttrs')
    })

    // diff
    for(let key in oldAttrs) {
        if(key in newAttrs) { // 存在即更新
            // oldAttrs[key] = newAttrs[key]
        } else {
            setAttribute(dom, key, undefined) // 不存在设置undefined移除
        }
    }

    for(let key in newAttrs) {
        if(oldAttrs[key]!== newAttrs[key]) {
            setAttribute(dom, key, newAttrs[key])
        }
    }
}
