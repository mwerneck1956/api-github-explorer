import { FiAlertCircle, FiUser ,FiStar } from 'react-icons/fi'
import { AiOutlineFork } from 'react-icons/ai'

import styles from './styles.module.scss'

export function RepositoryInfo({
   title,
   author,
   linkToRepository,
   stargazersCount = 0,
   forksCount = 0,
   openIssuesCount = 0
}) {
   return (
      <a href = {linkToRepository} target ="_blank" rel = "noopener">
         <div className={styles.repositoryContainer}>
            <strong className={styles.repositoryContainer__title}>
               {title.length > 60 ? title.substring(0,57) +'...' : title} 
            </strong>
            <p className={styles.repositoryContainer__author}>
              <FiUser /> {author}
            </p>
            <span className={styles.repositoryContainer__repoStatistics}>
               {stargazersCount} <FiStar />  {forksCount} <AiOutlineFork/>  {openIssuesCount} <FiAlertCircle/> 
            </span> 
         </div>
      </a>
   )
}