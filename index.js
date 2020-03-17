

import React from './react'
import ReactDOM from './react-dom'

const ele = (
    <div className="active" title="test" onClick={test.bind(this, 1)}>
        hello,
        <p>
            react
            <span>child</span>
        </p>
    </div>
)

function test(...arg) {
    console.log(this, arg, 'this, arg')
}

console.log(ele, 'ele')

ReactDOM.render(ele, document.getElementById('root'))
