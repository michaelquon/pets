const express = require('express');
const app = express();
const port = 8000;
const path = require('path');
const bp = require('body-parser');
app.use(bp.json());

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/pets');
app.use(express.static(path.join(__dirname + '/pets-app/dist')));

const PetsSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: [true, "This name is already taken."], minlength: 3},
    type: {type: String, required: true, minlength: 3},
    description: {type: String},
    skill1: {type: String},
    skill2: {type: String},
    skill3: {type: String},
    likes: {type: Number, required: true, default: 0}},
    {timeStamps: true});
   
    mongoose.model('Pets', PetsSchema);
    var Pets = mongoose.model('Pets')
   
app.get('/pets', (req, res)=>{
    console.log("Getting all Pets from Server")
    Pets.find({}, null, {sort: {type: 1}}, (err, pets)=>{
        if(err){
            console.log(err);
            res.json({message: "Error", error: err})
        }
        else{
            res.json({message: "Success", data: pets})
        }
    })

});

app.get('/pets/:id', (req,res)=>{
    console.log("Getting one pet from Server")
    Pets.findOne({_id: req.params.id},(err, pet)=>{
        if(err){
            console.log(err)
            res.json({message: "Error", error: err})
        }
        else{
            res.json({message: "Error", data: pet})
        }
    })
});

app.post('/pets', (req,res)=>{
    console.log("Confirmation form posted to server")
    var newPets = new Pets({name: req.body.name, 
                            type: req.body.type, 
                            description: req.body.description,
                            skill1: req.body.skill1,
                            skill2: req.body.skill2,
                            skill3: req.body.skill3})
    newPets.save((err)=>{
        if(err){
            console.log(newPets.errors)
            res.json({message: "Error", error: err});
        }
        else{
            res.json({message: "Success"})
        }
    })
});

app.put('/pets/:id', (req,res)=>{
    var pet = Pets.update({_id: req.params.id}, {name: req.body.name, 
                                                type: req.body.type, 
                                                description: req.body.description,
                                                skill1: req.body.skill1,
                                                skill2: req.body.skill2,
                                                skill3: req.body.skill3},
                                                {runValidators: true}, (err)=>{
        if(err){
            console.log(err)
            res.json({message: "Error", error: err})
        }
        else{
            res.json({message: "Successful Update"})
        }
    })
});

app.delete('/pets/:id', (req,res)=>{
    Pets.remove({_id: req.params.id}, (err)=>{
        if(err){
            console.log(err);
            res.json({message: "Error", error: err})
        }
        else{
            res.json({message: "Successful Removal"})
        }
    })
});

app.put('/pets/likes/:id', (req,res)=>{
    console.log("im at server",req.body)
    var likes = Pets.update({_id: req.params.id}, {likes: req.body.count},(err)=>{
        console.log("server side likes",likes._update)
        if(err){
            res.json({message: "Error", error: err})
        }
        else{
            
            res.json({message: "Successful Like", likes: likes._update.likes})
        }
    })
})

app.all('*', (req,res,next)=>{
    res.sendFile(path.resolve("./pets-app/dist/index.html"))
});

app.listen(port,()=>{
    console.log(`We on port ${port}`);
});