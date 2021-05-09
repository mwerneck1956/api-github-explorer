const axios = require('axios');

export const githubApi = axios.create({
  baseURL: 'https://api.github.com/',     
  headers : {
     'User-Agent' : 'Github-Users-Explorer',
     'Authorization' : 'token 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'
  }
  
});

export async function getUserByUsername(username){
   try{
      const response = await githubApi.get(`users/${username}`)

      return response.data
   }catch(err){
      console.log(err)
   }
}

export async function getUserRepositories(username){
   try{
      const response = await githubApi.get(`/users/${username}/repos`);
      
      return response.data
      
   }catch(err){
      throw new Error(err)
   }
}  

export async function getUserStarredRepositories(username){
   try{
      const response = await githubApi.get(`/users/${username}/starred`);
      
      return response.data
      
   }catch(err){
      throw new Error(err)
   }
}  