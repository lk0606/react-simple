

const ReactDOM = {
    render
}

function render(vnode, root) {
    // console.log(vnode, root, 'vnode, root')
    // console.log(this, 'this render')
    if(!vnode) {
        return
    }

    // text node
    if(typeof vnode === 'string') {
        const textNode = document.createTextNode(vnode)
        // console.log(textNode, 'textNode')
        return root.appendChild(textNode)
    }

    //
    const { tag, attrs } = vnode
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

    return root.appendChild(dom)

}

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

export default ReactDOM
