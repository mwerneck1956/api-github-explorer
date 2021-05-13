const axios = require('axios');


export const githubApi = axios.create({
  baseURL: 'https://api.github.com/',     
  headers : {
    'Authorization' : 'token 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'
  }
});


const API_ROUTES_URL = process.env.API_ROUTES_URL || 'http://localhost:3000'

export async function getUserByUsername(username){
   try{
      //const user = await axios.get(`${process.env.API_ROUTE_URL}/getGithubUserByUsername?username=${username}`)
      const response = await axios.get(`${API_ROUTES_URL}/api/getGithubUserByUsername?username=${username}`)

      return response.data;
   }catch(err){
   
      let errorMessage = err.response && err.response.statusText;

      if(err.response && err.response.status === 404)
         errorMessage = 'User Not Found!'

      throw new Error(
         errorMessage
      );
   }
}

/*

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

*/

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