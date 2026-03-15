const err_response = (res,err)=>{
    const StatusCode = err.StatusCode
    const errmessage = err.message

    return res.status(StatusCode).json({
        messsage : errmessage,
        status:false
    })
}

const correctResponse = (res,data)=>{
    return res.status(200).json({
        data : data,
        status : true
    })
}

module.exports ={err_response, correctResponse}