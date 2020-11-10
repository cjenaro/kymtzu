import { Popup } from "react-map-gl";
import { useState } from "react";
import Link from "next/link";

import Dots from "../dots";
import Button from "../button";
import styles from "./store-popup.module.scss";
import { GRADES } from "../../pages/store/new";

export default function StorePopup({ store, set, user }) {
  const [openMenu, setOpenMenu] = useState(false);

  function handleToggle() {
    setOpenMenu((wasToggled) => !wasToggled);
  }

  async function handleDelete() {
    const blob = await fetch("/api/store/delete", {
      method: "POST",
      headers: {
        Authorization: `${user.secret}:`,
      },
      body: JSON.stringify({
        username: user.email,
        ref: store.ref["@ref"].id,
      }),
    });
  }

  return store && store.data ? (
    <Popup
      latitude={Number((store.data && store.data.lat) || 0)}
      longitude={Number((store.data && store.data.lon) || 0)}
      closeButton={true}
      closeOnClick={false}
      onClose={() => set({})}
      anchor="top"
      offsetLeft={28}
      offsetTop={40}
      className="store-popup"
    >
      <Dots isToggled={openMenu} toggle={handleToggle} />
      <div className={styles.popup}>
        <p>{store.data.name}</p>
        {GRADES.map((grade) => (
          <p key={grade}>
            <span>{grade}:</span>
            <span>{store.data[grade]}</span>
          </p>
        ))}
      </div>
      <div className={styles[openMenu ? "open" : "closed"]}>
        <Button variant="outlined" onClick={handleDelete}>
          Eliminar
        </Button>
        <Link href={{ pathname: "/store/edit", query: JSON.stringify(store) }}>
          <Button variant="outlined">Editar</Button>
        </Link>
      </div>
    </Popup>
  ) : null;
}
