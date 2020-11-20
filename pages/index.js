import Link from "next/link";
import { useEffect, useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";

import Button from "../components/button";
import Bread from "../components/bread";
import useStores from "../hooks/use-stores";
import StorePopup from "../components/store-popup";

export default function Home({ user }) {
  const { stores, loading, error } = useStores(user.email);
  const [activeStore, setActiveStore] = useState({});
  const [{ popupLong, popupLat }, setPopup] = useState({});
  const savedLocation = window.localStorage.getItem("savedLocation");
  let initLong = -122.4376;
  let initLat = 37.7577;
  if (savedLocation) {
    const { longitude, latitude } = JSON.parse(savedLocation);
    initLong = longitude;
    initLat = latitude;
  }

  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: initLat,
    longitude: initLong,
    zoom: 12,
  });

  useEffect(() => {
    function handleLocation(position) {
      const { latitude, longitude } = position.coords;
      setViewport({
        ...viewport,
        longitude,
        latitude,
      });

      window.localStorage.setItem(
        "savedLocation",
        JSON.stringify({ longitude, latitude })
      );
    }

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(handleLocation, () => {});
    }
  }, []);

  function handleDoubleClick(event) {
    const [longitude, latitude] = event.lngLat;
    setPopup({
      popupLat: latitude,
      popupLong: longitude,
    });
  }

  return (
    <ReactMapGL
      {...viewport}
      style={{ marginLeft: "-1rem", marginRight: "-1rem" }}
      mapboxApiAccessToken={process.env.MAPBOX_PUBLIC_TOKEN}
      onViewportChange={(nextViewPort) => setViewport(nextViewPort)}
      onDblClick={handleDoubleClick}
      doubleClickZoom={false}
      dragRotate
      touchRotate
    >
      {popupLong && popupLat && (
        <Popup
          latitude={popupLat}
          longitude={popupLong}
          closeButton={true}
          closeOnClick={false}
          onClose={() => setPopup({})}
          anchor="top"
        >
          <Link
            href={{
              pathname: "/store/new",
              query: JSON.stringify({ lat: popupLat, lon: popupLong }),
            }}
          >
            <Button variant="outlined">Agregar</Button>
          </Link>
        </Popup>
      )}
      {stores &&
        stores.map((store) => (
          <Marker
            key={`${store.data.name}-${store.data.lat}-${store.data.lon}`}
            latitude={Number(store.data.lat)}
            longitude={Number(store.data.lon)}
          >
            <Bread onClick={() => setActiveStore(store)} />
          </Marker>
        ))}
      <StorePopup user={user} store={activeStore} set={setActiveStore} />
    </ReactMapGL>
  );
}
