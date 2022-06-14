import express from 'express';
import {client} from '../index.js'
import { auth } from '../middleware/auth.js'

const router =express.Router();
router.get('/', async (req, res) => {
    const movie = await getAllMovies();
    res.send(movie);
})
router.get('/:id', async (req, res) => {
    const {id} =req.params;
    const movie = await getMovieById(id);
    res.send(movie);
})
router.post('/', async (req, res) => {
    const data = req.body;
    const result = await createMovie(data);
    res.send(result);
})
router.put('/:id', async (req, res) => {
    const data = req.body;
    const {id} = req.params;
    const result = await updateMovie(id, data);
    res.send(result);
})
router.delete('/:id', async (req, res) => {
    const {id} =req.params;
    const movie = await deleteMovie(id);
    //const movie = movies.find((mv)=>mv.id===id)
    movie.deletedCount > 0 ? res.send(movie) : res.status(401).send({msg:"No Such Movie Found"});
})


export const crmdetailRouter = router;

async function getAllMovies() {
    return await client.db("CRMAPP").collection("data").find({}).toArray();
}

async function getMovieById(id) {
    return await client.db("CRMAPP").collection("data").findOne({ id: id });
}

async function createMovie(data) {
    return await client.db("CRMAPP").collection("data").insertMany(data);
}

async function deleteMovie(id) {
    return await client.db("CRMAPP").collection("data").deleteOne({ id: id });
}

async function updateMovie(id, data) {
    return await client.db("CRMAPP").collection("data").updateOne({ id: id }, { $set: data });
}