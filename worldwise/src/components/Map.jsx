import styles from "./Map.module.css";
import { useEffect, useState } from "react";

import Button from "./Button";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";
import useLocation from "../hooks/useGeolocation";
import useUrlPosition from "../hooks/useUrlPosition";
import User from "./User";

function Map() {
  const { cities } = useCities();
  const { lat, lng } = useUrlPosition();

  // Default should be user current location
  const [mapPosition, setMapPosition] = useState([6.9, 6.33]);

  const { isLoadingPosition, position, getLocation } = useLocation();

  useEffect(() => {
    if (position) setMapPosition([position.lat, position.lng]);
  }, [position]);

  useEffect(() => {
    if (lat && lng) setMapPosition([lat, lng]);
  }, [lat, lng]);

  return (
    <div className={styles.mapContainer}>
      <User />
      <Button
        disabled={isLoadingPosition}
        type="position"
        onClick={getLocation}
      >
        {isLoadingPosition ? "...Loading" : "Get Position"}
      </Button>
      <MapContainer
        center={mapPosition}
        zoom={8}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
          >
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

// eslint-disable-next-line react/prop-types
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      console.log(e.latlng);
      navigate({
        pathname: "form",
        search: `?lat=${e.latlng.lat}&lng=${e.latlng.lng}`,
      });
    },
  });
}
export default Map;
