import React, {Component} from 'react'
import './Panel.css'
class Panel extends Component{
    state = {
      input: '',
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
      var liElem = e.target.parentNode.parentNode;
      // var index = e.target.className.split(' ')[1].slice(7)
      var index = this.getIndex(liElem)
      console.log(index+ ' index')
      index = parseInt(index,10)
      // this.setState({
      //   points: this.state.points.filter((point,i)=>i!==parseInt(index,10))
      // })
      this.props.deletePointAtIndex(index);
    }
    onDragStart(e){
      var liElem = e.target;
      var index = this.getIndex(liElem)
      e.dataTransfer.setData('text/plain',index)
      console.log(e.dataTransfer.getData('text/plain'))
    }
    onDragOver(e){
      e.preventDefault()
    }
    onDragEnter(e){

    }
    onDrop(e){
      var dragged = e.dataTransfer.getData('text/plain')
      var droppable = this.getIndex(e.currentTarget)
      if(dragged!=droppable){
        this.props.swapPoints(dragged,droppable)
      }
    }
    getId(tid){
      return tid.id.match(/(\d+)/)[0]
    }
    getIndex(node){
      return [...node.parentNode.children].indexOf(node)
    }
    shuffle(){
      this.props.shuffle()
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
                  <Point title={point.title}
                    key={index}
                    index={index}
                    onClose={this.onClose.bind(this)}
                    onDragEnter={this.onDragEnter.bind(this)}
                    onDragStart={this.onDragStart.bind(this)}
                    onDragOver={this.onDragOver.bind(this)}
                    onDrop={this.onDrop.bind(this)}
                  />
                  )}
              </ul>
              <button onClick={this.shuffle.bind(this)}>SHUFFLE</button>
            </div>
        )
    }
}

const Point = (props)=>(
  <li 
    draggable={true}
    onDragStart={props.onDragStart}
    onDragOver={props.onDragOver}
    onDragEnter={props.onDragEnter}
    onDrop={props.onDrop}
    >
    <h3>{props.title}
      <span className={"closeX indexNo"+props.index} onClick={props.onClose}> Click me</span>
    </h3>
  </li>
)

export default Panel