//@Author ismael alves
import mongoose from 'mongoose'

export default function validateId (req, resp, next){
  if(!mongoose.Types.ObjectId.isValid(req.params.id)){
    next({name:'NotFound'})
  }else{
    next()
  }
}