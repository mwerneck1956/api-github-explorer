import { useRouter } from 'next/router'
import { useState } from 'react'
import { Button } from '../../components/Button'
import { Navbar } from '../../components/Navbar'
import { Preloader } from '../../components/Preloader'
import { RepositoryInfo } from '../../components/RepositoryInfo'
import { UserInfoHeader } from '../../components/UserInfoHeader'
import { GenericError } from '../../components/GenericError'
import { getUserRepositories, githubApi, getUserStarredRepositories, getUserByUsername } from '../../services/githubApi'

import Head from 'next/head'


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

   const { name, avatar_url, description, userRepositories } = data;


   //Váriavel para guardar a lista ativa do momento, se é de listagem
   //de repositórios starred, ou respositórios do usuário
   const [activeRepositoriesList,setActiveRepositoriesList] = useState('userRepos');

   //Como na renderização inicial da página é Server Side Rendering, jogo
   //o valor dos repositórios do usuário no meu state
   const [repositories,setRepositories] = useState(userRepositories)

   const [fetching, setFetching] = useState(false);
   const [error,setError] = useState(data.error)
 

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
         
         setError(false);

      } catch (err) {
         setError(err.message)
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
                        key={repo.id}
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
         <Head>
            <title>Github User Info | {username} </title>
            <meta name="description" content={`${username} info`}/>
            <link rel="icon" href="/favicon.ico" />
         </Head>
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
                  List Starred Repositories
               </Button>
               <Button
                  name = "listUserRepositories"
                  className={styles.container__listStarredReposButton}
                  onClick={() => listRepostories('userRepos')}
                  style = {activeRepositoriesList === 'userRepos' ? activeButtonStyle : {}}
               >
                  List Repositories
               </Button>
         
               {!fetching ? renderRepositories() : <Preloader/>}
            </section>
      </>

   ) : <GenericError title = {error}/> 

}
export async function getServerSideProps(context) {

   const { username } = context.query;

   try {
      const userInfo = await getUserByUsername(username);
      const userRepositories = await getUserRepositories(username);


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
                  error: err.message,
               }
            }
         }
   }
}

