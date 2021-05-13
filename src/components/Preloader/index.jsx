import React from "react"
import styles from './styles.module.scss'

import Skeleton , {SkeletonTheme} from 'react-loading-skeleton'

export const Preloader = (props) => (
  <SkeletonTheme
   
  >
    <Skeleton 
      count = {3}
      className = {styles.preloader}
    />
  </SkeletonTheme>
)
