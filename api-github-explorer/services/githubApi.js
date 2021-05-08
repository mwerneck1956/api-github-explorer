const axios = require('axios');

export const githubApi = axios.create({
  baseURL: 'https://api.github.com/', 
});

export async function getUserByUsername(username){
   try{
      const response = await githubApi.get(`users/${username}`)

      return response.data
   }catch(err){
      console.log(err)
   }
}
