import Link from "next/link";

export default function LoginPage({ setUser }) {
  function handleSubmit(event) {
    event.preventDefault();
    setUser(event);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">
        Usuario:
        <input type="text" placeholder="juan@gmail.com" id="username" />
      </label>
      <label htmlFor="password">
        Usuario:
        <input type="password" id="password" />
      </label>
      <button type="submit">Iniciar Sesión</button>
      <Link href="/register">
        <a>Registrarse</a>
      </Link>
    </form>
  );
}
