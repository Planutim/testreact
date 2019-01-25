import React, {Component} from 'react'
import {Map, GoogleApiWrapper, Marker, InfoWindow, Polyline} from 'google-maps-react'
import latlng from './coordinates.json'


const mapStyles = {
    width: '100%',
    height: '100%'
}
const icons = {
  startIcon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
  endIcon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
  standartIcon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
}

class MapContainer extends Component{
    constructor(props){
        super(props);
        this.state = {
            markers : [],
            center: latlng.Moscow,
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {}
        }
        this.mapRef = React.createRef()
        
    }
    onMarkerClick(props,marker,e){
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
      })
    }
    componentDidUpdate(){
      // console.log(JSON.stringify(this.props.points.map(a=>a.position)))
      // // console.log(Object.keys(this.props.google.maps))
    }
    onMarkerDrag(props, marker,coords){

      var index =parseInt( props.markerNo);
      console.log('index is '+index+ '   '+Object.keys(props))
      index = parseInt(index,10)
      this.props.updatePosition(index, {
        lat: coords.latLng.lat(),
        lng: coords.latLng.lng()
      })

      // [props,marker,coords].map(a=>console.log(Object.keys(a)))
      // var i=0
      // while(arguments[i]){
      //   console.log(arguments[i])
      //   i++
      // }
      // console.log(this.props.points.map(a=>a.position))
    }
    updateCenter(){
      this.props.updateCenter(this.state.center)
    }
    render(){
        var test =<Polyline
        path={this.props.points.map(a=>a.position)}              
        strokeColor={'#00f'}
        strokeOpacity={1}
        strokeWeight={2}/>
        return (
            <Map google={this.props.google}
            zoom={10}
            style={mapStyles}
            initialCenter={this.state.center}
            onReady={this.updateCenter.bind(this)}
            >
            {this.props.points.map((point,i)=>
              <Marker key={i}
                // className={'markerNo'+point.index}
                markerNo={i}
                icon={i==0?icons.startIcon:i==(this.props.points.length-1)?icons.endIcon:icons.standartIcon}
                position={point.position}
                title={point.title}
                draggable={true}
                onDragend={this.onMarkerDrag.bind(this)}
                onClick={this.onMarkerClick.bind(this)}
                name={point.title}
                />
              )}
              {test}
              <InfoWindow
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}
              >
                <div>
                  <h1>{this.state.selectedPlace.name}</h1>
                </div>
              </InfoWindow>
            </Map>
        )
    }
}

export default GoogleApiWrapper({
  apiKey: ''
})(MapContainer)