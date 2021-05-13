const axios = require('axios');

const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN || '';

export const githubApi = axios.create({
  baseURL: 'https://api.github.com/',     
  headers : {
    'Authorization' : token
  }
});

export async function getUserByUsername(username){
   try{
      const response = await githubApi.get(`users/${username}`)

      return response.data
   }catch(err){
      let errorMessage =  err.response && err.response.statusText || err.message;

      if(err.response && err.response.status === 404)
         errorMessage = 'User Not Found!'

      throw new Error(
         errorMessage
      );
   }
}

export async function getUserRepositories(username){
   try{
      const response = await githubApi.get(`/users/${username}/repos`);
      
      return response.data
      
   }catch(err){
      throw new Error(err.response && err.response.statusText || err.message)
   }
}  

export async function getUserStarredRepositories(username){
   try{
      const response = await githubApi.get(`/users/${username}/starred`);
      
      return response.data
      
   }catch(err){
      throw new Error( err.response && err.response.statusText || err.message)
   }
}  