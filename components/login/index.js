import { useState } from "react";
import Link from "next/link";

import Input from "../input";
import Button from "../button";

import styles from "./login.module.scss";

export default function LoginPage({ setUser }) {
  const [{ loading, error, data }, setState] = useState({});

  async function handleSubmit(event) {
    event.preventDefault();
    const { username, password } = event.target;
    if (username.value && password.value) {
      setState({ loading: true });
      const blob = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({
          username: username.value,
          password: password.value,
        }),
      });

      const res = await blob.json();
      if (blob.ok) {
        setState({ data: res });
        setUser({ email: username.value, secret: res.secret });
      } else {
        setState({ error: res });
      }
    }
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.login}>
        <Input
          type="text"
          placeholder="juan@gmail.com"
          id="username"
          name="username"
        >
          Usuario:
        </Input>
        <Input type="password" id="password" name="password">
          Contraseña:
        </Input>
        <Button type="submit">Iniciar Sesión</Button>
        <Link href="/register">
          <Button type="button" variant="outlined">
            Registrarse
          </Button>
        </Link>
        {loading && <pre>Loading...</pre>}
        {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
      </form>
    </div>
  );
}
