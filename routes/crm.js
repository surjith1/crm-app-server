import express from 'express';
import {client} from '../index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router =express.Router();
async function genHashedPassword(password) {
    const NO_OF_ROUNDS =10;
    const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
    console.log("Salt Value : ",salt);
    const hashPassword = await bcrypt.hash(password,salt);
    console.log("Hashed Password", hashPassword);
    return hashPassword;
}

router.post('/registration', async (req, res) => { 
    const {username,firstname,lastname,password,usertype} = req.body;
    const hashedPassword = await genHashedPassword(password)
   console.log(hashedPassword);
   const isUserExist = await getUserByName(username)
   console.log("Username : ",isUserExist)
   if(isUserExist) {
    res.status(401).send({msg : "Choose Another username :"})
   }
   else {
       const result = await createSignupUser({ 
    username:username,
    firstname:firstname,
    lastname:lastname,
    password:hashedPassword,
    usertype:usertype
});
res.send(result);
   }
})

router.post('/login', async (req, res) => { 
    const {username,firstname,lastname,password,usertype} = req.body;
   
   const userFromDB = await getUserByName(username,firstname,lastname,usertype)
console.log(userFromDB);
//check for user name

if(!userFromDB) {
    res.status(401).send({msg: "Invalid Credentials"})
}
else {
    const storedPassword = userFromDB.password;
    const isPasswordMatch = await bcrypt.compare(password,storedPassword);
console.log(isPasswordMatch);
if( isPasswordMatch) {
  const token = jwt.sign({id: userFromDB._id },process.env.SECRET_KEY)
    res.send({msg:"Successfully Loged in", token:token})
}

else {
    res.status(401).send({msg: "Invalid Credentials"})   
}
}

})
router.post('/forgot-password', async (req, res) => { 
    const {username, password} = req.body;
    const user = {
        username:username,
        password:password
    }
   
   const usernameDB = await getUserByName(username)
console.log(usernameDB);
//check for user name

if(usernameDB) {
    res.status(401).send({msg: "User Already Registered"})
}
else {
    const result = await createSignupUser({ 
        username:username,
        password:password,
    });
   res.send(result);
   
}

})

export const usersRouter = router;
 //store signup username into db
 async function createSignupUser(data) {
    return await client.db("CRMAPP").collection("CRM").insertOne(data);
}
async function getUserByName(username,firstname,lastname,usertype) {
    return await client.db("CRMAPP").collection("CRM").findOne({
        username:username,
        firstname:firstname,
        lastname:lastname,
        usertype:usertype
    });
}