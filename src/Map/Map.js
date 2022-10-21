import {MapContainer, Marker, Popup, TileLayer, useMapEvents} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import './Map.css';
import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import {useState} from "react";
import React from 'react';
import {map} from "leaflet/dist/leaflet-src.esm";

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listMarker: ""
        }
    }

    componentDidMount() {
        let DefaultIcon = L.icon({
            iconUrl: icon,
            shadowUrl: iconShadow
        });

        L.Marker.prototype.options.icon = DefaultIcon;

        fetch('http://127.0.0.1:3009/markers')
            .then(response => response.json())
            .then(
                (data) => {
                    console.log("data")
                    console.log(data.makers)
                    this.setState({
                            listMarker: data.makers
                        }, function () {
                            console.log(this.state)
                        }
                    )
                },
                (error) => {
                    console.log(error)
                }).then(

        );
    }


    render() {
        // let ListMarker = this.state.listMarker.map((MeMarker) =>
        //     <Marker position={[MeMarker.latitude, MeMarker.longitude]}>
        //         <Popup>
        //             Je suis a {MeMarker.name}
        //         </Popup>
        //     </Marker>);

        return (
            <div>
                <MapContainer
                    center={{lat: 47.2054749, lng: -1.5419107}}
                    zoom={13}
                    scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocationMarker/>
                    {/*{ListMarker}*/}
                </MapContainer>
            </div>
        );
    }
}


fetch('http://127.0.0.1:3009/markers')
    .then(response => response.json())
    .then(data => data.makers.map((MeMarker) =>
        <Marker position={[MeMarker.latitude, MeMarker.longitude]}>
            <Popup>
                Je suis a {MeMarker.name}
            </Popup>
        </Marker>));


function LocationMarker() {
    const [position, setPosition] = useState(null)
    useMapEvents({
        click(e) {
            console.log(e.latlng);
            setPosition(e.latlng)
            // let newData = {
            //     "numero" : 1,
            //     "name" : "ynov",
            //     "latitude" : e.lat,
            //     "longitude" : e.lng,
            //     "date" : new Date(),
            // };
        }
    });
    return position === null ? null : (
        <Marker position={position}>
            <Popup>Vous habitez ici</Popup>
        </Marker>
    )
}

export default Map;
