const express = require('express')
const config = require('config')
const path = require('path')
const mongoose = require('mongoose')

const app = express()

app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/link', require('./routes/link.routes'))
app.use('/t', require('./routes/redirect.routes'))

if(process.env.NODE_ENV === 'production'){
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', ()=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

PORT = config.get('port') || 8000

async function start(){
    try{
        await mongoose.connect(config.get("mongoUri"))
        .then(()=>{
            console.log('Connected to MongoDB');
        })
        .catch((e)=>{
             console.log("Failed to connect to MongoDB");
        })
        app.listen(PORT, ()=>{ console.log(`Server working in PORT: ${PORT}`) })
    }catch(e){
        console.log("Server Error", e.message);
        process.exit()
    }
}

start()