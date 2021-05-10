
import Link from 'next/link'
import { Button } from '../Button'
import styles from './styles.module.scss'
import { FiArrowLeft } from 'react-icons/fi'

export function UserNotFound(){
   return(
      <div className={styles.container}>
         <h1 className = {styles.container__title}>
            Usuário não encontrado...
         </h1>
         <Link href = "/">
            <Button className = {styles.container__goBackButton}>
               <FiArrowLeft />
               <span className = {styles.container__goBackButton__span}>   
                  Voltar Para a tela de busca
               </span>
            </Button>
         </Link>
      </div>
   )
}