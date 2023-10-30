import { isValidObjectId } from "mongoose";

function checkObjectId(req,res,next){
  if(!isValidObjectId(req.params.id)){
    const error= new Error(`Invalid oject Id of ${req.params.id}`)
    res.status(404)
    next(error)
  }
}


const errorHandler = (err, req,res,next) =>{

  let statusCode = res.statusCode === 200 ? 500 : res.statusCode ? res.statusCode : 500
  let message = err.message

  res.status(statusCode).json({
    message,
    stack : process.env.NODE_ENV === 'production' ? "🥞": err.stack
  })
}

export { errorHandler, checkObjectId}