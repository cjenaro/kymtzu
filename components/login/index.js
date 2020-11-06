import { useState } from 'react'
import Link from "next/link";

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
        setUser(res);
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
          type="text"
          placeholder="juan@gmail.com"
          id="username"
          name="username"
        />
      </label>
      <label htmlFor="password">
        Usuario:
        <input type="password" id="password" name="password" />
      </label>
      <button type="submit">Iniciar Sesión</button>
      <Link href="/register">
        <a>Registrarse</a>
      </Link>
      {loading && <pre>Loading...</pre>}
      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
    </form>
  );
}