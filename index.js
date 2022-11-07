const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000
const app = express()


// middleware

app.use(cors())
app.use(express.json())

app.get('/', (req, res)=>{
    res.send('server is activated')
})


// tour-website
// bFcWgbv55P3wEgfo


const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.h3zxwhp.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

console.log(uri);

function run (){
    try{
        const tourCollection = client.db("tour-website").collection("tour")

        // 3 tour collections
        app.get('/tour', async(req, res)=>{
            const query = {}
            const cursor = tourCollection.find(query).limit(3)
            const tour = await cursor.toArray()
            res.send(tour)
        })

           // 3 tour collections
        app.get('/tour-collection', async(req, res)=>{
            const query = {}
            const cursor = tourCollection.find(query)
            const tour = await cursor.toArray()
            res.send(tour)
        })
    }
    finally{

    }
}
run()

app.listen(port, ()=>{
    console.log(`Tour Server is running on port: ${port}`);
})