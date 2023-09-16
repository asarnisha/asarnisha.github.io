const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = 3000;
const mongoURI = "mongodb+srv://asar:8760307318@cluster0.uiogxzf.mongodb.net/"; // Replace with your MongoDB Atlas connection string

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/store-location', (req, res) => {
    const locationData = req.body.locationData;
    
    MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
        if (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
            return;
        }

        const db = client.db("location"); // Replace with your database name
        const collection = db.collection("location"); // Replace with your collection name

        const timestamp = new Date().toLocaleString();
        const dataToInsert = {
            locationData: locationData,
            timestamp: timestamp
        };

        collection.insertOne(dataToInsert, (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send("Internal Server Error");
            } else {
                res.status(200).send("Location data stored successfully.");
            }
            client.close();
        });
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
