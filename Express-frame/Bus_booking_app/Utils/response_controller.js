const errResponse = (res,err)=>{
    let err_status = err.StatusCode
    let err_meassge  = err.message

    return res.status(err_status).json({
        "message": err_meassge,
        status : false

    })
}

const correctResponse = (res,data)=>{
    return res.status(200).json({
        data : data,
        status : true
    })
}



module.exports = {
    errResponse,
    correctResponse
}