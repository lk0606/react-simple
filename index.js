

import React from './react'
import ReactDOM from './react-dom'

const ele = (
    <div className="active" title="test" onClick={test.bind(this, 1)}>
        hello,
        <p>
            react
            <p>child</p>
        </p>
    </div>
)

// function Home(props) {
//     console.log(props, 'props Home')
//     return (
//         <div className="active" title="test" onClick={test.bind(this, 1)}>
//             hello,
//             <p>
//                 react
//                 <p>child</p>
//             </p>
//         </div>
//     )
// }
class Home extends React.Component{
    constructor(props) {
        super(props)
        console.log(this, this.props===props, 'props')
    }
    render() {
        return <div className="active" title="test" onClick={test.bind(this, 1)}>
            hello,
            <p>
                react
                <p>child</p>
            </p>
        </div>
    }
}


function test(...arg) {
    console.log(this, arg, 'this, arg')
}

console.log(ele, 'ele')

ReactDOM.render(<Home name={'title'}/>, document.getElementById('root'))
