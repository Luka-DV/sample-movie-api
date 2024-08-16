
const path = require("path");

const express = require("express");
const app = express();

const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");

const PORT = process.env.PORT;
const connectionUri = process.env.connectionString;

const client = new MongoClient(connectionUri,  {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
}
);

app.use(cors());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
})

async function runClient() {

    try {
        await client.connect(); //connect to DB(optional)
        console.log('Connected to Le Database!');
    
        const db = client.db("sample_mflix"); //database
        const movieCollection = db.collection("movies") //returns reference/creates a new db colleciton
    
        app.get("/api/:movieName", async (req, res) => {
            const movieName= req.params.movieName
                .split(" ")
                .map(word => word[0].toUpperCase() + word.slice(1))
                .join(" "); //make it capitalized

            //console.log("MOVIE NAME: ", movieName);

            const query = { title: movieName };
        
            const queryResults = await movieCollection.find(query).toArray(); //you need to use a method like toArray() here to access the documents;

            //console.log("GET results: ", queryResults);
            res.json(queryResults)
            
        })
    } catch (error) {
        console.error(error)
    }

}

runClient();



app.listen(PORT, () => {
    console.log(`Server running on PORT#: ${PORT}. You better go catch it!`)
})