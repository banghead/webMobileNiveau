import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import "./MapGoogle.css"

export default function MapGoogle() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.API_KEY,
    });

    if (!isLoaded) return <div>Loading...</div>;
    return <MapAA />;
}

function MapAA() {
    const center = useMemo(() => ({ lat: 44, lng: -80 }), []);

    return (
        <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
            <Marker position={center} />
        </GoogleMap>
    );
}
