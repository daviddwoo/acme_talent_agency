const express = require('express');
const app = express();
const path = require('path');
const { models: {Skill, Client, ClientSkills}, syncAndSeed } = require('./db')

app.use('/dist', express.static(path.join(__dirname, '..', 'dist')));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json())

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, '..', 'src', 'index.html')));

app.get('/api/skills', async(req, res, next) => {
  try {
    res.send(await Skill.findAll({
      include: [ClientSkills]
    }));
  }
  catch(ex) {
    next(ex);     
  }
}); 

app.get('/api/clients', async(req, res, next) => {
  try {
    res.send(await Client.findAll({
      include: [ClientSkills]
    }));
  }
  catch(ex) {
    next(ex);
  }
}); 

app.get('/api/clientSkills', async(req, res, next) => {
  try {
    res.send(await ClientSkills.findAll())
  }
  catch(ex) {
    next(ex);   
  } 
});

app.put('/api/skills/:id', async(req, res, next) => {
  try {
    const skill = await Skill.findByPk(req.params.id);
    res.send(await skill.update(req.body))
  }
  catch(ex) { 
    next(ex); 
  }
}); 

app.post('/api/clientSkills/', async(req, res, next) => {
  try {
    res.send(await ClientSkills.create(req.body));
  }
  catch(ex) {
    next(ex);
  }  
}); 
 
app.delete('/api/clientSkills/:id', async(req, res, next) => {
  try {
    const clientSkill = await ClientSkills.findByPk(req.params.id);
    await clientSkill.destroy();
    res.sendStatus(204);
  }
  catch(ex) {
    next(ex);  
  } 
});

const init = async() => {
  try {
    await syncAndSeed();
    const port = process.env.PORT || 3000;
    app.listen(port, ()=> console.log(`listening on port ${port}`));  
  }
  catch(ex) {
    console.log(ex);
  }
};

init();
    