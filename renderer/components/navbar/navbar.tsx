import styles from "./navbar.module.css";
import { useRouter } from "next/router";
import { useState } from 'react';
import { CssBaseline, AppBar, Toolbar } from "@material-ui/core";
import { isAuth, logout } from '../../lib/auth';

export default function navbar(props) {
  const Router = useRouter();
  const [auth, setAuth] = useState(false); 
  isAuth().then(isValid => {
    if(isValid) setAuth(true);
    else if(Router.pathname !== '/auth') Router.push('/auth');
  });

  return (
    <>
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <span
            className={styles.siteName}
            onClick={() => {
              if(Router.pathname === "/home") Router.reload();
              else Router.push("/home");
            }}
          >
            Rick and Morty
          </span>
          <span className={styles.authButton} onClick={() => auth ? logout().then(() => Router.push('/auth')) : Router.push('/auth')} >
            {auth ? "Logout" : "Sign In"}
          </span>
        </Toolbar>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
      {auth ? props.children : null}
    </>
  );
}
