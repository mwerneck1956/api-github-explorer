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

   const { name, avatar_url, description, userRepositories , error } = data;

   //Váriavel para guardar a lista ativa do momento, se é de listagem
   //de repositórios starred, ou respositórios do usuário
   const [activeRepositoriesList,setActiveRepositoriesList] = useState('userRepos');

   //Como na renderização inicial da página é Server Side Rendering, jogo
   //o valor dos repositórios do usuário no meu state
   const [repositories,setRepositories] = useState(userRepositories)

   const [fetching, setFetching] = useState(false);

 

   async function listRepostories(repositoryType) {
      try {
         setFetching(true)
         
         if(repositoryType === 'userRepos'){
            setActiveRepositoriesList('userRepos')
            const userRepositories = await getUserRepositories(username);
            setRepositories(userRepositories);
         }else{
            setActiveRepositoriesList('starredRepos')
            const userRepositories = await getUserStarredRepositories(username);
            setRepositories(userRepositories);
         }  
            
      } catch (err) {
         console.log(err)
      } finally {
         setFetching(false)
      }
   }

   function renderRepositories() {
      return repositories.length > 0 ? (
         <>
            {
               repositories.map((repo, index) => {
                  return (
                     <RepositoryInfo
                        key={index}
                        title={repo.full_name}
                        author={repo.owner.login}
                        linkToRepository ={repo.html_url}
                        stargazersCount = {repo.stargazers_count}
                        forksCount = {repo.forks_count}
                        openIssuesCount = {repo.open_issues}
                     />
                  )
               })
            }
         </>
      ) : renderRepositoriesNotFound()
   }

   function renderRepositoriesNotFound() {
      return (
            <h2 className={styles.repositoriesNotFound}>
               Nenhum repositório encontrado!
            </h2>
      )
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
               <Button
                  onClick={() => listRepostories('starredRepos')}
                  name = "listStarredRepositories"
                  className={`${styles.container__listReposButton}`}
                  style = {activeRepositoriesList === 'starredRepos' ? activeButtonStyle : {}}
               >
                  Listar Repositórios Starred
               </Button>
               <Button
                  name = "listUserRepositories"
                  className={styles.container__listStarredReposButton}
                  onClick={() => listRepostories('userRepos')}
                  style = {activeRepositoriesList === 'userRepos' ? activeButtonStyle : {}}
               >
                   Listar Repositórios
               </Button>

         
               {!fetching ? renderRepositories() : <Preloader/>}
            </section>
      </>

   ) : <UserNotFound /> 

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
               userRepositories: userRepositories
            }
         }, // will be passed to the page component as props
      }
   } catch (err) {
      return {
         props: {
               data: {
                  error: true,
               }
            }
         }
   }
}

