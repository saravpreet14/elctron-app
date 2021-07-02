import styles from "./navbar.module.css";
import { useRouter } from "next/router";
import { CssBaseline, AppBar, Toolbar } from "@material-ui/core";

export default function navbar(props) {
    const Router = useRouter();
  return (
    <>
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <h1
            className={styles.siteName}
            onClick={() => {
            //   if(Router.pathname === "/home") Router.reload(); else 
              Router.push("/home");
            }}
          >
            Rick and Morty
          </h1>
          {/* <h1 className={styles.authButton}>
            {props.isAuth ? "Logout" : "Sign In"}
          </h1> */}
        </Toolbar>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
      {/* {props.isAuth ? (
        props.children
      ) : (
        <>
          <br />
          <br />
          <br />
          <h1 className={styles.signInMessage}>Sign In to continue</h1>
        </>
      )} */}
      {props.children}
    </>
  );
}
