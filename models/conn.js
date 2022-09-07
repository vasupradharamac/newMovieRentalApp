const db = require('diskdb');


function connectDb(){
  db.connect('./models/data', ['movies','users','rents']);
  if(db.movies==null||db.users==null||db.rents==null){
    console.log("Db intialise error!")
  }else{
      console.log("DB setup complete")
      console.log(db)
  }
}

connectDb()

function getDbo(){
  return db
}

module.exports={
  getDbo,
}