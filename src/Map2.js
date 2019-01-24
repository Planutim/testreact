import React, {Component } from 'react'
import {Map, GoogleApiWrapper, Marker, InfoWindow} from 'google-maps-react'

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
    state ={
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
    }
    // onMarkerClick = (props, marker,e)=>{
    //     this.setState({
    //         selectedPlace: props,
    //         activeMarker: marker,
    //         showingInfoWindow:true
    //     })
    // }
    // onClose = props=>{
    //     if(this.state.showingInfoWindow){
    //         this.setState({
    //             showingInfoWindow: false,
    //             activeMarker: null
    //         })
    //     }
    // }
    render(){
        return (
            <Map google={this.props.google}
            zoom={10}
            style={mapStyles}
            initialCenter={latlng.London}
            >
              <Marker 
                label={"haha"} 
                draggable={true}    
                onClick={this.onMarkerClick} 
                name={'Keynatta International Convention Center'}
                title={'this is fucked up'}
              />
              <InfoWindow marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
              onClose={this.onClose}
              >
                <div>
                    <h4>{this.state.selectedPlace.name}</h4>
                </div>
              </InfoWindow>

            </Map>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAmiNnqlxTZZot7_bxRTFgCEyXY69gPT2A'
})(MapContainer)