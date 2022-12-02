const app = require('./app')

require('./db').connectToMongoDB() // Connect to MongoDB
require('dotenv').config()
 
app.get('/', (req, res) => {
    res.send('Welcome to the To-Do List App, Log in or Sign up to manage your schedule list');
})

const PORT = process.env.PORT 

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
