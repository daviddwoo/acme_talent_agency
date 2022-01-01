const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_client_db');
const { STRING } = Sequelize;

const Client = conn.define('client', {
  name: {
    type: STRING,
    unique: true,
    allowNull: false
  }
});

const Skill = conn.define('skill', {
  name: {
    type: STRING,
    unique: true,
    allowNull: false
  }
});

const ClientSkills = conn.define('clientSkills', {
  
})

// Skill.belongsToMany(Client, { through: 'ClientSkills'});
// Client.belongsToMany(Skill, { through: 'ClientSkills'});
ClientSkills.belongsTo(Client);
ClientSkills.belongsTo(Skill);
Client.hasMany(ClientSkills);
Skill.hasMany(ClientSkills);

const data = {
  clients: ['Moe', 'Lucy', 'Curly', 'Larry', 'Ethyl'],
  skills: ['dancing', 'coding', 'acting', 'eating', 'sleeping']
};

const syncAndSeed = async() => {
  try {
    await conn.sync({force:true});
    const [moe, lucy, curly, larry, ethyl] = await Promise.all(data.clients.map((client) => Client.create({name: client})));
    const [dancing, coding, acting, eating, sleeping] = await Promise.all(data.skills.map((skill) => Skill.create({name: skill})));

    // await Promise.all([
    //   moe.addSkill(dancing),
    //   moe.addSkill(coding),
    //   lucy.addSkill(acting),
    //   lucy.addSkill(dancing),
    //   curly.addSkill(eating),
    //   larry.addSkill(sleeping),
    //   larry.addSkill(acting)
    // ]);

    await Promise.all([
      ClientSkills.create({clientId: moe.id, skillId: dancing.id}),
      ClientSkills.create({clientId: moe.id, skillId: coding.id}),
      ClientSkills.create({clientId: lucy.id, skillId: acting.id}),
      ClientSkills.create({clientId: lucy.id, skillId: eating.id}),
      ClientSkills.create({clientId: curly.id, skillId: eating.id}),
      ClientSkills.create({clientId: curly.id, skillId: dancing.id}),
      ClientSkills.create({clientId: larry.id, skillId: acting.id})
    ])
  }
  catch(ex) {
    console.log(ex);
  }
};

module.exports = {
  models: {
    Client,
    Skill,
    ClientSkills
  },
  syncAndSeed
}

