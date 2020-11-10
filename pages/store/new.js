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

export default function NewStore() {
  const [location, setLocation] = useState({});
  useEffect(() => {
    if (typeof window === undefined) return;

    const search = decodeURIComponent(window.location.search.replace(/\?/, ""));
    console.log(search);
    const loc = JSON.parse(search);
    setLocation(loc);
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
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
      </form>
    </div>
  );
}
