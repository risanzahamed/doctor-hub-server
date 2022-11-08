const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
        const servicesCollection = client.db("doctorHub").collection("services")
        const myServiceCollection = client.db("doctorHub").collection("my-services")
        const myReviewCollection = client.db("doctorHub").collection("my-review")

        // 3 tour collections
        app.get('/services', async(req, res)=>{
            const query = {}
            const cursor = servicesCollection.find(query).limit(3)
            const service = await cursor.toArray()
            res.send(service)
        })

           // 3 tour collections
        app.get('/services-collection', async(req, res)=>{
            const query = {}
            const cursor = servicesCollection.find(query)
            const service = await cursor.toArray()
            res.send(service)
        })

        // single data load api
        app.get('/services/:id',async(req, res)=>{
            const id = req.params.id
            const query = {_id: ObjectId(id)}
            const singleService = await servicesCollection.findOne(query)
            res.send(singleService)
        })

        // Post api for my service

        app.post('/my-service',async(req, res)=>{
            const service = req.body
            const result = await myServiceCollection.insertOne(service)
            res.send(result)
        })

          // Get api for my service

        app.get('/my-service', async(req, res)=>{
            const cursor = myServiceCollection.find({})
            const service = await cursor.toArray()
            res.send(service)
        })


          // Post api for my review

          app.post('/my-review',async(req, res)=>{
            const review = req.body
            const result = await myReviewCollection.insertOne(review)
            res.send(result)
          })

          // Get api for my review

          app.get('/my-review', async(req, res)=>{
            const cursor = myReviewCollection.find({})
            const review = await cursor.toArray()
            res.send(review)
        })

    }
    finally{

    }
}
run()

app.listen(port, ()=>{
    console.log(`Tour Server is running on port: ${port}`);
})