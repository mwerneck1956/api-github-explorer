import { githubApi } from "../../services/githubApi";

export default async function handler(req,res) {
    try{
        const {username} = req.query;
    
        const response = await githubApi.get(`users/${username}`)
        
        res.status(200).json(response.data)

    }catch(err){
        return res.status(err.response && err.response.status || 500).json({error : 'a'})
    }
}
