import { useEffect, useState } from "react";
import router from "next/router";

import Input from "../../components/input";
import Grade from "../../components/grade";
import Button from "../../components/button";

import styles from "../../styles/store/new.module.scss";

export const GRADES = [
  "precios",
  "variedad",
  "sucursales",
  "calidad",
  "publicidad",
  "reparto",
];

export default function EditStore({ user }) {
  const [store, setStore] = useState({
    lat: 0,
    lon: 0,
    name: "store",
    precios: 0,
    variedad: 0,
    sucursales: 0,
    calidad: 0,
    publicidad: 0,
    reparto: 0,
  });
  const [{ loading, error }, setState] = useState({});
  useEffect(() => {
    if (typeof window === undefined) return;

    const search = decodeURIComponent(window.location.search.replace(/\?/, ""));
    const fromSearch = JSON.parse(search);
    setStore({ ref: fromSearch.ref["@ref"].id, ...fromSearch.data });
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
      ref,
    } = store;

    if (
      !name ||
      !lat ||
      !lon ||
      !precios ||
      !variedad ||
      !sucursales ||
      !calidad ||
      !publicidad ||
      !reparto ||
      !ref
    ) {
      return;
    }

    setState({ loading: true });
    const blob = await fetch("/api/store/edit", {
      method: "POST",
      headers: {
        Authorization: `${user.secret}:`,
      },
      body: JSON.stringify({
        username: user.email,
        store: {
          name,
          lat,
          lon,
          precios,
          variedad,
          sucursales,
          calidad,
          publicidad,
          reparto,
          ref,
        },
      }),
    });

    const res = await blob.json();
    if (blob.ok) {
      setState({ data: res });
      router.push("/");
    } else {
      setState({ error: res });
    }
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          type="text"
          id="name"
          placeholder="Los Tendillos"
          name="name"
          value={store.name}
          onChange={(e) => setStore({ ...store, name: e.target.value })}
        >
          Nombre:
        </Input>
        <Input
          type="text"
          id="lat"
          name="lat"
          disabled
          value={store.lat}
          onChange={() => {}}
        >
          Lat:
        </Input>
        <Input
          type="text"
          id="lon"
          name="lon"
          disabled
          value={store.lon}
          onChange={() => {}}
        >
          Lon:
        </Input>
        {GRADES.map((grade) => (
          <Grade
            key={grade}
            id={grade}
            name={grade}
            value={store[grade]}
            onChange={(e) => setStore({ ...store, [grade]: e.target.value })}
          >
            {grade}:
          </Grade>
        ))}
        <Button type="submit">Editar</Button>
        {loading && <pre>Loading...</pre>}
        {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
      </form>
    </div>
  );
}
