import { FiArrowRight } from 'react-icons/fi'

import styles from './styles.module.scss'

export function RepositoryInfo({
   title,
   author,
   linkToRepository
}) {
   return (
      <a href = "https://github.com/" target ="_blank">
         <div className={styles.repositoryContainer}>
            <strong className={styles.repositoryContainer__title}>
               {title}
            </strong>
            <p className={styles.repositoryContainer__author}>
               {author}
            </p>
         </div>
      </a>
   )
}