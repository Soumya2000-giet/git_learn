const db = require('../utils/connection')

const post = require('../models/s_posts')


const {err_response, correctResponse} = require('../utils/response_handler')


const addpost = async (req,res)=>{

    const {link_id, description} = req.body

try {
    const result = await post.create({
        link_id : link_id,
        description : description
    })
    correctResponse(res,result)
}


 catch(err){
        console.log(err)
         err_response(res, {StatusCode : 500,message : "unable to add data into post table"})
    }
}

const getpost = async(req, res)=>{
    try{
        const result = await post.findAll()

        correctResponse(res,result)
    }

    catch(err){
        console.log(err)
        err_response(res, {StatusCode : 500,message : "unable to fetch from post table"})
    }
}



module.exports ={
    addpost,
    getpost,
 
}

