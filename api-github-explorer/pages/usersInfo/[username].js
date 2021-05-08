import { useRouter } from 'next/router'
import { Navbar } from '../../components/Navbar'
import { githubApi } from '../../services/githubApi'




export default function usersInfo({ data }) {
   
   const router = useRouter()
   const { username } = router.query
   return (
      <>
         <Navbar />
      </>
   )
}

export async function getServerSideProps(context) {

   const { username } = context.query;

   try {

      const userInfo = await githubApi.get(`/users/${username}`);

      console.log(userInfo)

      return {
         props: {
            data: userInfo.data
         }, // will be passed to the page component as props
      }
   } catch (err) {
      console.log(JSON.stringify(err))
      return {
         props: {
            data : {
              erorr : err.message
            }
         }
      }
   }
}

