
import styles from './styles.module.scss'

const emptyAvatarUrl ='https://cdn5.vectorstock.com/i/thumb-large/66/14/default-avatar-photo-placeholder-profile-picture-vector-21806614.jpg'

export function UserInfoHeader({
   avatar_url,
   name,
   description
}){
   return(
      <header className ={styles.container}>
         <img 
            src = {avatar_url ||emptyAvatarUrl} 
            alt = "Foto do usuário"
            className = {styles.container__img}
         />
         <div className={styles.container__userInfo}>
            <strong className={styles.container__userInfo__strong}>
               {name}
            </strong>
            <p className={styles.container__userInfo__p}> 
               {description}
            </p>
         </div>
      </header>
   )
}