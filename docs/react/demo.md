## demo
```
class Like extends React.Component {
    constructor (props) {
        super(props)
        // 初始化
        this.state = {
            isLikeMe: false
        }
        // 新增方法的this强制绑定到组件对象
        this.handleClick = this.handleClick.bind(this)
    }
    // 新增方法：内部this不指向组件，为undefined
    handleClick () {
        const isLikeMe = !this.state.isLikeMe
        this.setState({isLikeMe})
    }
    // 重写组件类的方法，所以this指向组件对象
    render () {
        const {isLikeMe} = this.state
        return <h2 onClick={this.handleClick}>{isLikeMe}</h2>
    }
    
}
```