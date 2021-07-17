import styles from "./navbar.module.css";
import { useRouter } from "next/router";
import React, { useState } from 'react';
import { isAuth, logout } from '../../lib/auth';
import Link from '../Link';

export default function Navbar(props) {
  const Router = useRouter();
  const [auth, setAuth] = useState(false); 
  const [path, setPath] = useState('');
  if(typeof window !== 'undefined' && path !== Router.pathname) {
    setPath(Router.pathname);
    isAuth().then(isValid => {
      if(isValid) setAuth(true);
      else if(Router.pathname !== '/auth') Router.push('/auth');
    });
  }

  return (
    <div className={styles.main} >
      <div className={styles.head} >
        <Link href='/characters' >
          <div className={styles.icon} >
            <img src='/rickMorty.svg' /*width='70' height='70'*/ alt="logo" className={styles.image} />
          </div>
        </Link>
        {auth ? (<span className={styles.navigation} >
          <Link href='/characters' passHref style={{textDecoration: 'none'}} >
            <span className={[styles.navlink, path.indexOf('character') !== -1 ? styles.active : null].join(' ')} >Characters</span>
          </Link>
          <Link href='/episode/1' passHref style={{textDecoration: 'none'}} >
            <span className={[styles.navlink, path.indexOf('episode') !== -1 ? styles.active : null].join(' ')} >Episodes</span>
          </Link>
        </span>): null}
        {auth ? (
          <span className={styles.icon} style={{float: 'right'}} onClick={() => logout().then(() => Router.push('/auth'))} >
            <img src='/logout.svg' /*width='70' height='70' layout='responsive'*/ alt="logout" />
          </span>
        ) : null}
      </div>
      <div className={styles.body} >{auth || path === '/auth' ? props.children : null }</div>
    </div>
  );
}
