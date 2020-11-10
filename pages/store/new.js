import Input from "../../components/input";
import Grade from "../../components/grade";
import Button from "../../components/button";
import { useEffect, useState } from "react";

import styles from "../../styles/store/new.module.scss";

const grades = [
  "precios",
  "variedad",
  "sucursales",
  "calidad",
  "publicidad",
  "reparto",
];

export default function NewStore({ user }) {
  const [location, setLocation] = useState({ lat: 0, lon: 0 });
  const [{ loading, error }, setState] = useState({});
  useEffect(() => {
    if (typeof window === undefined) return;

    const search = decodeURIComponent(window.location.search.replace(/\?/, ""));
    const loc = JSON.parse(search);
    setLocation(loc);
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    const {
      name,
      lat,
      lon,
      precios,
      variedad,
      sucursales,
      calidad,
      publicidad,
      reparto,
    } = event.target;

    if (
      !name.value ||
      !lat.value ||
      !lon.value ||
      !precios.value ||
      !variedad.value ||
      !sucursales.value ||
      !calidad.value ||
      !publicidad.value ||
      !reparto.value
    ) {
      return;
    }

    setState({ loading: true });
    const blob = await fetch("/api/store/new", {
      method: "POST",
      headers: {
        Authorization: `${user.secret}:`,
      },
      body: JSON.stringify({
        username: user.email,
        store: {
          name: name.value,
          lat: lat.value,
          lon: lon.value,
          precios: precios.value,
          variedad: variedad.value,
          sucursales: sucursales.value,
          calidad: calidad.value,
          publicidad: publicidad.value,
          reparto: reparto.value,
        },
      }),
    });

    const res = await blob.json();
    if (blob.ok) {
      setState({ data: res });
    } else {
      setState({ error: res });
    }
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input type="text" id="name" placeholder="Los Tendillos" name="name">
          Nombre:
        </Input>
        <Input
          type="text"
          id="lat"
          name="lat"
          disabled
          value={location.lat}
          onChange={() => {}}
        >
          Lat:
        </Input>
        <Input
          type="text"
          id="lon"
          name="lon"
          disabled
          value={location.lon}
          onChange={() => {}}
        >
          Lon:
        </Input>
        {grades.map((grade) => (
          <Grade key={grade} id={grade} name={grade}>
            {grade}:
          </Grade>
        ))}
        <Button type="submit">Agregar</Button>
        {loading && <pre>Loading...</pre>}
        {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
      </form>
    </div>
  );
}
