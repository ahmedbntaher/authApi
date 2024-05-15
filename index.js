const express=require('express');
const database = require('./src/database/db.config');
require('dotenv').config(); 
const app=express();
app.use(express.urlencoded({ extended: true}));
app.use(express.json());    
database.mongoose.connect(database.url, {
useNewUrlParser: true,
useUnifiedTopology:true
}
).then(()=>{
console.log('connected to database');
})
.catch(err => {
console.log(err);
});
app.get('/', (req, res)=>{
res.send({message: 'Hellm, Word!'});
})
require('./src/api/routes/routes')(app);
app.post("/api/v1/signin", signinUser);
app.post("/api/v1/signup", signupUser);
app.get("/api/v1/user_data", getUserData);
app.delete("/api/v1/users/:id", deleteUser);
app.put("/api/v1/updateUser", updateUser);
app.listen(process.env.PORT, ()=>{
console.log('listening on port', process.env.PORT);
});