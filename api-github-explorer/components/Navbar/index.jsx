import { FiArrowLeft } from 'react-icons/fi'
import styles from './styles.module.scss'
import Link from 'next/link'

export function Navbar(){
   return(
      <header className ={styles.navbar}>
           <Link href ="/">
            <button className={styles.navbar__goBackButton}>
               <FiArrowLeft />  Voltar
            </button>
         </Link>
         <div className = {styles.navbar__logoContainer}>
            <img src = "/images/github-logo.svg" alt ="Github Logo"/>
            <span>
               Github Users Explorer
            </span>
         </div>
      </header>
   )
}