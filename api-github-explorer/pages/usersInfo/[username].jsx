import { useRouter } from 'next/router'
import { useState } from 'react'
import { Button } from '../../components/Button'
import { Navbar } from '../../components/Navbar'
import { Preloader } from '../../components/PreLoader'
import { RepositoryInfo } from '../../components/RepositoryInfo'
import { UserInfoHeader } from '../../components/UserInfoHeader'
import { UserNotFound } from '../../components/UserNotFound'
import { getUserRepositories, githubApi, getUserStarredRepositories } from '../../services/githubApi'

import styles from './styles.module.scss'


export default function usersInfo({ data }) {


   const { name, avatar_url, description, repositories, error } = data;

   const [listStarredRepositories, setListStarredRepositories] = useState(false);
   const [userRepositories, setUserRepositories] = useState([]);
   const [starredRepositories, setStarredRepositories] = useState([]);
   const [fetching, setFetching] = useState(false);

   const router = useRouter()
   const { username } = router.query


   async function listUserRepostories() {
      try {
         setFetching(true)

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
               Nenhum repositório encontrado...
            </h2>
         </div>
      )
   }

   return (
      <>
         <Navbar />
         {
            !error ?
               <section className={styles.container}>
                  <UserInfoHeader
                     avatar_url={avatar_url}
                     name={name}
                     description={description}
                  />
                  <Button
                     onClick={() => {
                        setListStarredRepositories(true)
                        listUserStarredRepostories()
                     }}
                     className={styles.container__listReposButton}
                  >
                     Listar Repositórios Starred
                  </Button>
                  <Button
                     className={styles.container__listStarredReposButton}
                     onClick={() => {
                        setListStarredRepositories(false)
                        listUserRepostories()
                     }}
                     
                  >
                     Listar Repositórios
                  </Button>
                  {fetching && <Preloader />}
                  {listStarredRepositories ? renderUserStarredRepositories() : renderUserRepositories()}
               </section>
               : <UserNotFound />
         }

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

