import React, {Component} from 'react'
import {Map, GoogleApiWrapper, Marker, InfoWindow, Polyline} from 'google-maps-react'


var triangleCoords = [
  {lat: 25.774, lng: -80.190},
  {lat: 18.466, lng: -66.118},
  {lat: 32.321, lng: -64.757},
  {lat: 25.774, lng: -80.190}
];
const mapStyles = {
    width: '100%',
    height: '100%'
}

const latlng = {
    Moscow: {
        lat: 55.751244,
        lng: 37.618423
    },
    London:{
        lat: 51.509865,
        lng: -0.118092
    }
}

class MapContainer extends Component{
    constructor(props){
        super(props);
        this.state = {
            markers : [],
            center: latlng.London
        }
        this.mapRef = React.createRef()
        
    }
    onMapClick(){

    }
    componentDidUpdate(){
      console.log(JSON.stringify(this.props.points))
      // console.log(Object.keys(this.props.google.maps))
    }
    onMarkerDrag(props, marker,coords){
      triangleCoords[0].lat += 5
      triangleCoords[0].lng += 5
      var index = props.className.slice(8)
      this.props.updatePosition(index, {
        lat: coords.latLng.lat(),
        lng: coords.latLng.lng()
      })
      // [props,marker,coords].map(a=>console.log(Object.keys(a)))
      var i=0
      // while(arguments[i]){
      //   console.log(arguments[i])
      //   i++
      // }
      console.log(this.props.points.map(a=>a.position))
    }
    updateCenter(){
      this.props.updateCenter(this.state.center)
    }
    // getPoints(){
    //   var arr = []
    //   for(var i=0;i<5;i++){
    //     arr.push({
    //       lat: this.state.center.lat+Math.random()*0.1-0.1,
    //       lng: this.state.center.lng+Math.random()*0.1-0.1
    //     })
    //   }
    //   return arr;
    // }
    render(){
        // var test = 
        return (
            <Map google={this.props.google}
            zoom={10}
            style={mapStyles}
            initialCenter={this.state.center}
            onReady={this.updateCenter.bind(this)}
            onClick={this.getPoints.bind(this)}
            >
            {this.props.points.map((point,i)=>
              <Marker key={i}
                className={'markerNo'+i}
                label={i.toString()}
                draggable={true}
                onDragend={this.onMarkerDrag.bind(this)}
                />
              )}
              <Polyline
              // path={this.props.points.map(a=>a.position)}
              path = {this.getPoints.bind(this)()}
              strokeColor={'#00f'}
              strokeOpacity={1}
              strokeWeight={2}/>
            </Map>
        )
    }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAmiNnqlxTZZot7_bxRTFgCEyXY69gPT2A'
})(MapContainer)