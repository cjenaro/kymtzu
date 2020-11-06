import { useState } from "react";
import router from "next/router";

import Input from "../components/input";
import Button from "../components/button";

import styles from "../components/login/login.module.scss";

export default function Register({ setUser }) {
  const [{ loading, error, data }, setState] = useState({});

  async function handleSubmit(event) {
    event.preventDefault();
    const { username, password, confirmPassword } = event.target;
    if (
      username.value &&
      password.value &&
      confirmPassword.value &&
      password.value == confirmPassword.value
    ) {
      setState({ loading: true });
      const blob = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({
          username: username.value,
          password: password.value,
        }),
      });

      const res = await blob.json();
      if (blob.ok) {
        setState({ data: res });
        setUser(res.data);
        router.push("/");
      } else {
        setState({ error: res });
      }
    }
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.login}>
        <Input
          type="email"
          placeholder="juan@gmail.com"
          id="username"
          name="username"
        >
          Usuario:
        </Input>
        <Input type="password" id="password" name="password">
          Contraseña:
        </Input>
        <Input type="password" id="confirmPassword" name="confirmPassword">
          Confirmar Contraseña:
        </Input>
        <Button type="submit">Registrarse</Button>
        {loading && <p>Loading...</p>}
        {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
      </form>
    </div>
  );
}
