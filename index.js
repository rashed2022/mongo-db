const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();


const app = express();


app.use(cors());
app.use(bodyParser.json());

const uri = process.env.DB_PATH;

let client = new MongoClient(uri, { useNewUrlParser: true });

//database connection


//get
app.get('/', (Req, res) => res.send('thanks everyone'));

app.get('/items', (req, res) =>{
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("fireOnion").collection("foodItems");
        collection.find().toArray((err, documents) =>{
            if(err){
                console.log(err);
                res.status(500).send({message:err});
            }
            else{
             res.send(documents);
            }
        })
        // client.close();
    });
});

app.get('/features', (req, res) =>{
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("fireOnion").collection("features");
        collection.find().toArray((err, documents) =>{
            if(err){
                console.log(err);
                res.status(500).send({message:err});
            }
            else{
             res.send(documents);
            }
        })
        // client.close();
    });
});


app.get('/item/:key', (req,res) => {
    const key = req.params.key;

    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("fireOnion").collection("foodItems");
        collection.find({key}).toArray((err, documents) =>{
            if(err){
                console.log(err);
                res.status(500).send({message:err});
            }
            else{
             res.send(documents[0]);
            }
        })
        // client.close();
    })
})

//post
app.post('/addItems', (req, res) => {
    //save to database
    const product = req.body;
    client = new MongoClient(uri, { useNewUrlParser: true });
    console.log(product);
    client.connect(err => {
        const collection = client.db("fireOnion").collection("foodItems");
        collection.insert(product, (err, result) =>{
            if(err){
                console.log(err);
                res.status(500).send({message:err});
            }
            else{
             res.send(result.ops[0]);
            }
        })
        // client.close();
    });
  
})

app.post('/addFeatures', (req, res) => {
    //save to database
    const features = req.body;
    client = new MongoClient(uri, { useNewUrlParser: true });
    console.log(features);
    client.connect(err => {
        const collection = client.db("fireOnion").collection("features");
        collection.insert(features, (err, result) =>{
            if(err){
                console.log(err);
                res.status(500).send({message:err});
            }
            else{
             res.send(result.ops[0]);
            }
        })
        // client.close();
    });
  
})

app.post('/placeOrder', (req, res) => {
    //save to database
    const orderDetails = req.body;
    orderDetails.orderTime = new Date();
    console.log(orderDetails);
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("fireOnion").collection("orders");
        collection.insertOne(orderDetails, (err, result) =>{
            if(err){
                console.log(err);
                res.status(500).send({message:err});
            }
            else{
             res.send(result.ops[0]);
            }
        })
        // client.close();
    });
  
})


const port = process.env.PORT || 4000;
app.listen(port, () => console.log('listening to port 4000.'));