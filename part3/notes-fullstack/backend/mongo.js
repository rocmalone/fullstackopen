const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Give password as argument')
    process.exit(1)
}

// process.argv[2] is the third command line parameter
const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.swo5f7l.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

// Create new note
const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})
// 
const Note = mongoose.model('Note', noteSchema)

// const note = new Note({
//     content: 'HTML is Easy',
//     important: true,
// })

// note.save().then(result => {
//     console.log('note saved!')
//     mongoose.connection.close()
// })


// Fetch note
Note.find({  }).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})
