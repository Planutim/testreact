import React, {Component} from 'react'
import './Panel.css'
class Panel extends Component{
    state = {
      input: ''
    }
    handleChange(e){
      this.setState({
        input: e.target.value
      })
    }
    handleKeyPress(e){
      if(e.key === 'Enter'){
        this.props.addPoint(this.state.input)
        this.setState({
          input: ''
        })
        e.target.value=''
      }
    }
    onClose(e){
      var index = e.target.className.split(' ')[1].slice(7)
      index = parseInt(index,10)
      // this.setState({
      //   points: this.state.points.filter((point,i)=>i!==parseInt(index,10))
      // })
      this.props.deletePointAtIndex(index);
    }
    render(){
        return (
            <div className="Panel">
              <input 
                className='point' 
                type='text' 
                onChange={this.handleChange.bind(this)}
                onKeyPress={this.handleKeyPress.bind(this)}/>
              {/* <p>{this.state.input}</p> */}
              <ul>
                {this.props.points.map((point,index)=>
                  <Point title={point.title} key={index} index={index} onClose={this.onClose.bind(this)}/>
                  )}
              </ul>
            </div>
        )
    }
}

const Point = (props)=>(
  <li draggable={true}>
    <h3>{props.title}
      <span className={"closeX indexNo"+props.index} onClick={props.onClose}> Click me</span>
    </h3>
  </li>
)

export default Panel