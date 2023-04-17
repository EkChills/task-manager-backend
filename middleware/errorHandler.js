const {createCustomError,customApiError} = require('../errors/customError')

const errorHandlerMiddleware = (err,req,res,next) => {
  if(err instanceof customApiError) {
    return res.status(err.statusCode).json({msg:err.message})
  }
  return res.status(500).send('something went wrong please try again')
}

module.exports = {errorHandlerMiddleware}