
import Link from 'next/link'
import { Button } from '../Button'
import styles from './styles.module.scss'
import { FiArrowLeft } from 'react-icons/fi'

export function GenericError(props){
   
   const {title} = props;

   return(
      <div className={styles.container}>
         <h1 className = {styles.container__title}>
             {title}
         </h1>
         <Link href = "/">
            <Button className = {styles.container__goBackButton}>
               <FiArrowLeft />
               <span className = {styles.container__goBackButton__span}>   
                  Return to the search screen
               </span>
            </Button>
         </Link>
      </div>
   )
}