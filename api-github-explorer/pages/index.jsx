import Head from 'next/head';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { FiSearch } from 'react-icons/fi';

import styles from '../styles/home.module.scss'


export default function Home() {

  const [searchedUser,setSearchedUser] = useState("");

  return (
    <div className={styles.container}>
      <Head>
        <title>Github User Explorer | Início</title>
        <meta name="description" content="View github users info" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container__logo}>
        <img 
          src="/images/github-logo.svg" 
          alt="Github logo" 
          className = {styles.container__logo__img}
        />
        <span
          className = {styles.container__logo__span}
        >
          Github Users Explorer
        </span>
      </div>

      <h1 className={styles.container__title}>
          Explore usuários no Github
      </h1>
      
      <form>
        <div className={styles.container__searchBar}>
          <input 
            type="search" 
            name="search_user" 
            id="search_user"
            placeholder = "Digite o nome do usuário" 
            autoComplete = "off"
            onChange = {(event) => setSearchedUser(event.target.value)}
            maxLength = "100"
          />
          <Link href = {`/usersInfo/${searchedUser}`}>
            <button
                 disabled={searchedUser.length <= 0}
            >
              <FiSearch/> <span>Pesquisar</span>
            </button>
          </Link>
        </div>
      </form>


    </div>
  )
}
