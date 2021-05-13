export default async function handler(req,res) {
    try{
        const {username} = req.query;
    
        const response = await githubApi.get(`users/${username}`)
        
        res.status(200).json(response.data)

    }catch(err){
        return res.status(err.response && err.response.status || 500).json({
            error : {
                status : err.response && err.response.status || 500,
                message : err.response && err.response.statusText || 'Internal Server Error'
            }
        })
    }
}