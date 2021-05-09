import styles from './styles.module.scss'

export function Button({children , className , ...rest}){
   return(
      <button
         className = { `${styles.button} ${className}`}
         {...rest}
      >
         {children}
      </button>
   )
}