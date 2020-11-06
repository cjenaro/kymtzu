import { useState } from "react";
import router from "next/router";

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
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">
        Usuario:
        <input
          type="email"
          placeholder="juan@gmail.com"
          id="username"
          name="username"
        />
      </label>
      <label htmlFor="password">
        Contraseña:
        <input type="password" id="password" name="password" />
      </label>
      <label htmlFor="confirmPassword">
        Confirmar Contraseña:
        <input type="password" id="confirmPassword" name="confirmPassword" />
      </label>
      <button type="submit">Registrarse</button>
      {loading && <p>Loading...</p>}
      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
    </form>
  );
}
