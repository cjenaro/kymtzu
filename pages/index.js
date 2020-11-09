import Link from "next/link";
import { useEffect, useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";

export default function Home() {
  const [{ popupLong, popupLat }, setPopup] = useState({});
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });

  useEffect(() => {
    function handleLocation(position) {
      const { latitude, longitude } = position.coords;
      setViewport({
        ...viewport,
        longitude,
        latitude,
      });
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
          <div>You are here</div>
        </Popup>
      )}
    </ReactMapGL>
  );
}
