const mongoose = require('mongoose')

const developerSchema = new mongoose.Schema({
  nome: {type: String,
    required: true
  },
  sexo: { type:String,
    maxlength: 1, 
  },
  idade: Number,
  hobby: String, 
  datanascimento: Date 
})


developerSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model( 'Person', developerSchema )

// nome: varchar
// sexo: char
// idade: integer
// hobby: varchar
// datanascimento: date