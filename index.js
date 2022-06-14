import express from "express";
import { MongoClient } from "mongodb";
import cors from 'cors';
import env from 'dotenv';
import { usersRouter } from "./routes/crm.js";
import { auth } from "./middleware/auth.js";
import { crmdetailRouter } from "./routes/movies.js";

const app = express();
env.config();
//console.log(process.env);
const PORT = process.env.PORT;
const MONGO_URL=process.env.MONGO_URL;
 const createConection = async ()=> {
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("Mongo Db is Connected ✌ 😊 👌.");
    return client;
 }
 export const client = await createConection();
app.use(cors());
const crm = [
    {
        "id": "100",
        "name": "The Batman (2022)",
        "rating": 8,
        "trailer": "https://www.youtube.com/embed/mqqft2x_Aa4",
        "description": "When the Riddler, a sadistic serial killer, begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption and question his family's involvement.",
        "image": "https://m.media-amazon.com/images/M/MV5BOGE2NWUwMDItMjA4Yi00N2Y3LWJjMzEtMDJjZTMzZTdlZGE5XkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg"
    },
    {
        "id": "101",
        "name": "The Northman",
        "rating": 7.8,
        "trailer": "https://www.youtube.com/embed/oMSdFM12hOw",
        "description": "From visionary director Robert Eggers comes The Northman, an action-filled epic that follows a young Viking prince on his quest to avenge his father's murder.",
        "image": "https://upload.wikimedia.org/wikipedia/en/thumb/8/8c/The_Northman.png/220px-The_Northman.png"
    },
    {
        "id": "102",
        "name": "Thor: Love and Thunder",
        "rating": 7.7,
        "trailer": "https://www.youtube.com/embed/tgB1wUcmbbw",
        "description": "Thor enlists the help of Valkyrie, Korg and ex-girlfriend Jane Foster to fight Gorr the God Butcher, who intends to make the gods extinct.",
        "image": "https://m.media-amazon.com/images/M/MV5BMzJjZWYzNTctODgwOS00OGNiLTg4MjktMDlmNWUxNjczMzljXkEyXkFqcGdeQXVyMTM1MTE1NDMx._V1_QL75_UX190_CR0,0,190,281_.jpg"
    }
    
];
const todaylead=[
    {
    "id": "1",
    "leadName": "Christopher Maclead",
    "company": "Rangoni Of Florence",
    "email": "christopher-maclead@gmail.com",
    "phone": "555-555-5555",
    "leadOwner ": "surjith"
},
{
    "id": "2",
    "leadName": "Carissa Kidman",
    "company": "Oh My Goodknits Inc",
    "email": "carissa-kidman@yahoo.com",
    "phone": "555-555-5555",
    "leadOwner ": "surjith"
},
{
    "id": "3",
    "leadName": "James Merced",
    "company": "Kwik Kopy Printing",
    "email": "james-merced@gmail.com",
    "phone": "555-555-5555",
    "leadOwner ": "surjith"
}

];
//express.json() //Converting to JSON 
app.use(express.json());
app.use("/crm", usersRouter);
app.use("/crmdetails", crmdetailRouter);
app.get('/', (req, res) => {
    res.send(`Hi Welcome to CRM App API at Port #${PORT} `)
})

app.get('/crmdetails/todayleads', (req, res) => {
    res.send(todaylead)
})
// app.post('/crmdetails/todayleads', (req, res) => {
//     const data=req.body;   
//     res.send(data)
// })

app.listen(PORT, () => console.log(`Local host running on ${PORT}`));