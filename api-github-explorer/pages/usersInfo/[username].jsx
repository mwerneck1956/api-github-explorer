import { useRouter } from 'next/router'
import { useState } from 'react'
import { Button } from '../../components/Button'
import { Navbar } from '../../components/Navbar'
import { Preloader } from '../../components/Preloader'
import { RepositoryInfo } from '../../components/RepositoryInfo'
import { UserInfoHeader } from '../../components/UserInfoHeader'
import { UserNotFound } from '../../components/UserNotFound'
import { getUserRepositories, githubApi, getUserStarredRepositories } from '../../services/githubApi'

import styles from './styles.module.scss'


const activeButtonStyle = {
   color: '#9B51E0',
   borderBottom: '3px solid #8B3ED3',
   borderRadius : '0',
   transtion : 'all 0.2s'
}

export default function usersInfo({ data }) {

   const router = useRouter()
   const { username } = router.query

   const { name, avatar_url, description, repositories, error } = data;

   //Váriavel para guardar a lista ativa do momento, se é de listagem
   //de repositórios starred, ou respositórios do usuário
   const [activeRepositoriesList,setActiveRepositoriesList] = useState('userRepos');

   const [userRepositories, setUserRepositories] = useState([]);
   const [starredRepositories, setStarredRepositories] = useState([]);
   const [fetching, setFetching] = useState(false);

 

   async function listUserRepostories() {
      try {
         setFetching(true)
         setActiveRepositoriesList('userRepos')

         const userRepositories = await getUserRepositories(username);
         setUserRepositories(userRepositories);

      } catch (err) {
         console.log(err)
      } finally {
         setFetching(false)
      }
   }

   async function listUserStarredRepostories() {
      try {
         setActiveRepositoriesList('starredRepos')
         setFetching(true)

         const starredRepositories = await getUserStarredRepositories(username);
         setStarredRepositories(starredRepositories);
      } catch (err) {
         console.log(err)
      } finally {
         setFetching(false)
      }
   }

   function renderUserRepositories() {
      return repositories.length > 0 ? (
         <>
            <h2>
               Listando Repositórios de {name}
            </h2>
            {
               repositories.map((repo, index) => {
                  return (
                     <RepositoryInfo
                        key={index}
                        title={repo.full_name}
                        author={repo.owner.login}
                        linkToRepository ={repo.html_url}
                     />
                  )
               })
            }

         </>
      ) : renderRepositoriesNotFound()
   }

   function renderUserStarredRepositories() {
      return starredRepositories.length > 0 ? (
         <>
            <h2>
               Listando Repositórios estrelados por {name}
            </h2>
            {
               starredRepositories.map((repo, index) => {
                  return (
                     <RepositoryInfo
                        key={index}
                        title={repo.full_name}
                        author={repo.owner.login}
                        linkToRepository ={repo.html_url}
                     />
                  )
               })
            }

         </>
      ) : renderRepositoriesNotFound()
   }

   function renderRepositoriesNotFound() {
      return (
         <div>
            <h2 className={styles.repositoriesNotFound}>
               Nenhum repositório encontrado!
            </h2>
         </div>
      )
   }

   return (
      <>
         <Navbar />
               <section className={styles.container}>
                  {
                     !error? 
                     <>
                        <UserInfoHeader
                        avatar_url={avatar_url}
                        name={name}
                        description={description}
                     />
                     <Button
                        onClick={() => listUserStarredRepostories()}
                        name = "listStarredRepositories"
                        className={`${styles.container__listReposButton}`}
                        style = {activeRepositoriesList === 'starredRepos' ? activeButtonStyle : {}}
                     >
                        Listar Repositórios Starred
                     </Button>
                     <Button
                        name = "listUserRepositories"
                        className={styles.container__listStarredReposButton}
                        onClick={() => listUserRepostories()}
                        style = {activeRepositoriesList === 'userRepos' ? activeButtonStyle : {}}
                     >
                        Listar Repositórios
                     </Button>
            
                     {activeRepositoriesList === 'starredRepos' ? 
                        renderUserStarredRepositories() : 
                        renderUserRepositories()
                     }

                     {fetching && <Preloader />}

                     </> : <UserNotFound />
                  
                  }
               </section>
            
         

      </>
   )

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
               name: userInfo.name,
               avatar_url: userInfo.avatar_url,
               description: userInfo.bio,
               repositories: userRepositories
            }
         }, // will be passed to the page component as props
      }
   } catch (err) {

      return {
      props: {
            data: {
               error: true
            }
         }
      }
   }
}

