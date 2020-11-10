import { Flipper, Flipped } from "react-flip-toolkit";
import Layout from "../components/layout";
import LoginPage from "../components/login";
import RegisterPage from "./register";
import useAuth from "../hooks/use-auth";
import "../styles/globals.css";

function MyApp({ Component, pageProps, router }) {
  const { user, setUser } = useAuth();

  return (
    <Flipper flipKey={router.asPath}>
      <Layout withHeader={!user} pathname={router.asPath}>
        <Flipped flipId="page">
          <div>
            {user ? (
              <Component {...pageProps} user={user} />
            ) : (
              <>
                {router.asPath !== "/register" ? (
                  <LoginPage setUser={setUser} />
                ) : (
                  <RegisterPage setUser={setUser} />
                )}
              </>
            )}
          </div>
        </Flipped>
      </Layout>
    </Flipper>
  );
}

export default MyApp;
