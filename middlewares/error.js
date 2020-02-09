const error=(err,req,res,next)=>{
    if(err){
      console.log('error in parsing json')
    }
    else{
      next()
    }
  }

  module.exports=error