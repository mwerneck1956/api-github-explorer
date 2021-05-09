import { useRouter } from 'next/router'
import { useState } from 'react'
import { Navbar } from '../../components/Navbar'
import { RepositoryInfo } from '../../components/RepositoryInfo'
import { UserInfoHeader } from '../../components/UserInfoHeader'
import { getUserRepositories, githubApi , getUserStarredRepositories } from '../../services/githubApi'

import styles from './styles.module.scss'


export default function usersInfo({ data }) {
 

   const {name , avatar_url , description , repositories , error} = data;

   const [listStarredRepositories,setListStarredRepositories] = useState(false);
   const [starredRepositories,setStarredRepositories] = useState([]);

   const router = useRouter()
   const { username } = router.query


   async function listUserStarredRepostories(){
     try{
      const response = await getUserStarredRepositories(username);
      console.log(response)

      setStarredRepositories(response);
     }catch(err){
        console.log(err)
     }
   }

   function renderUserRepositories(){
      return repositories && repositories.map((repo,index) => {
         return (
            <RepositoryInfo 
               key = {index}
               title = {repo.full_name}
               author = {repo.owner.login}
            />
         )
      })
   }

   function renderUserStarredRepositories(){
      return starredRepositories.map((repo,index) => {
         return (
            <RepositoryInfo 
               key = {index}
               title = {repo.full_name}
               author = {repo.owner.login}
            />
         )
      })
   }


   return !error ? (
     
      <>
         <Navbar />
         <section className={styles.container}>
            <UserInfoHeader
               avatar_url={avatar_url}
               name={name}
               description={description}
            />
            <button
               onClick = {listUserStarredRepostories}
            >
               Listar Repositórios Starred
            </button>
            {renderUserRepositories()}
         </section>

      </>
   ): <div>Usuário não encontrado</div>
}

export async function getServerSideProps(context) {

   const { username } = context.query;

   try {
      const response = await githubApi.get(`/users/${username}`);
      const userRepositories = await getUserRepositories(username);

      const userInfo = response.data;

      return {
         props: {
            data: {
               name : userInfo.name,
               avatar_url : userInfo.avatar_url,
               description : userInfo.bio,
               repositories : userRepositories
            }
         }, // will be passed to the page component as props
      }
   } catch (err) {
   
      return {
         props: {
            data : {
              erorr : true
            }
         }
      }
   }
}

