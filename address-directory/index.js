require("dotenv").config();
const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.MONGO_URI);

let db;
const dbConnect = async () => {
  try {
    await client.connect();
    console.log("MongoDb Connected");
    db = client.db().collection("directory");
  } catch (e) {
    console.log(e);
  }
};

app.use(express.json());

//READ (GET ALL)
app.get("/", async (req, res) => {
  const data = await db.find({}).toArray();
  res.json(data);
});

//READ (GET SOME)
app.get("/address", async (req, res) => {
  const data = await db.findOne({ username: req.body.username });
  res.json(data);
});

//CREATE
app.post("/", async (req, res) => {
  await db.insertOne({
    username: req.body.username,
    address: req.body.address,
  });
  console.log("Entry Created");
  res.send(req.body);
});

//UPDATE
app.put("/", async (req, res) => {
  await db.updateOne(
    { username: req.body.username },
    { $set: { username: req.body.username, address: eq.body.address } }
  );
});

//DELETE
app.delete("/", async (req, res) => {
  await db.deleteOne({ username: req.body.username });
  console.log("Entry Deleted");
});

dbConnect().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server online at port ${process.env.PORT}`);
  });
});
