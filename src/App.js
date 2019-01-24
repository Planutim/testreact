import React, {Component} from 'react'
import './App.css'

import Panel from './Panel'
import Map from './Map'
// import './App.css'

class App extends Component{
    state = {
        points:[],
        center: {}
    }
    componentDidUpdate(){
      // console.log(JSON.stringify(this.state.points.map(a=>a.title)))
    }
    addPoint(title){
      this.setState({
        points: [...this.state.points, {
          title: title,
          position: this.state.center
        }]
      })
    }
    deletePointAtIndex(index){
      this.setState({
        points: this.state.points.filter((a,i)=>i!==index)
      })
    }
    updatePosition(index, latLng){
      this.setState({
        points: this.state.points.map((point,i)=>{
          if(i==index){
            point.position=latLng
          }
          return point
        }
        )
      })
    }
    updateCenter(latLng){
      this.setState({
        center: latLng
      })
    }
    render(){
        return (
            <div className='App'>
                <Panel 
                    addPoint={this.addPoint.bind(this)}
                    deletePointAtIndex={this.deletePointAtIndex.bind(this)}
                    points={this.state.points}
                    />
                <Map
                  points={this.state.points}
                  updatePosition={this.updatePosition.bind(this)}
                  updateCenter={this.updateCenter.bind(this)}
                    />
            </div>
        )
    }
}

export default App;