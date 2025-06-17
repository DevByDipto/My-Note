const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

//user: simpleDBUser
// pass: NtdRXoRuOmNREbFB
app.use(cors());
app.use(express.json()); 

const uri =
  "mongodb+srv://simpleDBUser:NtdRXoRuOmNREbFB@cluster0.nc8opzq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; 

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
}); 

async function run(params) {
  try {
    await client.connect(); 
    const database = client.db("usersdb"); 
    const userscollection = database.collection("users"); 

    app.get("/users", async (req, res) => {
      const cursor = userscollection.find(); 
      const result = await cursor.toArray(); 
      res.send(result);
    });

    app.get("/details/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);

      const user = await userscollection.findOne({ _id: new ObjectId(id) });
      res.send(user);
    });

    app.put("/edit/:id", async (req, res) => {
      const id = req.params.id;
      const user = req.body;
      const filter = { _id: new ObjectId(id) };

      const updateDoc = {
        $set: {
          email: user.email,
          password: user.password,
        },
      };
      const options = { upsert: true };
      const result = await userscollection.updateOne(
        filter,
        updateDoc,
        
      );
      res.send(result);
    });

    app.post("/users", async (req, res) => {
      console.log("data in the server", req.body);
      const newUser = req.body;
      const result = await userscollection.insertOne(newUser);
      res.send(result);
    });

    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }; 

      const result = await userscollection.deleteOne(query);
      res.send(result);
    });

    await client.db("admin").command({ ping: 1 }); 
  } finally {
  }
}
run().catch(console.log);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  // console.log(`Example app listening on port ${port}`)
});
