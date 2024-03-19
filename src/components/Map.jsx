import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import styles from "./Map.module.css";

import { useEffect, useState } from "react";
import { useCitieis } from "../contexts/CitiesContext";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Map() {
  // console.log(lat, lng);

  const [searchParams] = useSearchParams();
  const [position, setPosition] = useState([40, 0]);
  const { cities } = useCitieis();

  const maplat = searchParams.get("lat") ? searchParams.get("lat") : 40;
  const maplng = searchParams.get("lng") ? searchParams.get("lng") : 0;

  useEffect(() => {
    if (maplat && maplng) setPosition([maplat, maplng]);
  }, [maplat, maplng]);

  // alert(maplat, maplng);

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={position}
        zoom={16}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((item) => {
          return (
            <Marker key={item.id} position={item.position}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          );
        })}
        <ChangeCenter position={position} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvent({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
    // console.log(e);
  });
}
