const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Victim = require('../models/Victim');
const Volunteer = require('../models/Volunteer');
const NGO = require('../models/NGO');
const Official = require('../models/Officials');

mongoose.connect('mongodb://localhost:27017/yourdb', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});

async function hashPasswords(Model, roleName) {
  const users = await Model.find();
  for (let user of users) {
    if (user.password && !user.password.startsWith('$2b$')) { // not hashed
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      await user.save();
      console.log(`${roleName} password hashed for: ${user.email}`);
    }
  }
}

async function main() {
  await hashPasswords(Victim, 'Victim');
  await hashPasswords(Volunteer, 'Volunteer');
  await hashPasswords(NGO, 'NGO');
  await hashPasswords(Official, 'Official');

  console.log('✅ All passwords fixed!');
  mongoose.disconnect();
}

main().catch(err => {
  console.error(err);
  mongoose.disconnect();
});
