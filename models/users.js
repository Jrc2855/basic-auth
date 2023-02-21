'use strict';

//-----Dependencies-----//
require('dotenv').config();
const express = require('express');
const base64 = require('base-64');
const bcrypt = require('bcrypt');
const { Sequelize, DataTypes } = require('sequelize');
const PORT = process.env.PORT || 3002;
const app = express();

app.use(express.json());


//-----Model the user data-----//

const userModel = sequelizeDatabase.define('user', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})

userModel.beforeCreate((user) => {
  console.log('our user', user);
});

// I apologize in advance for bad naming conventions lol
const authUser = async(req, res, next) => {
  let { authorization } = req.headers;
  let authString = authorization.split(' ')[1];
  let decodedAuthStr = base64.decode(authString);
  let [username, password] = decodedAuthStr.split(':');
  let slimShady = await userModel.findOne({where: {username}});
  if(slimShady) {
    let realSlimShady = await bcrypt.compare(password, user.password);
    if(realSlimShady){
      req.slimShady = slimShady;
      next();
    } else {
      next('Just Imitating(password incorrect');
    }
  } else {
    next('All you other slim shadys (password incorrect)');
  }
  req.slimShady = 'still working';
  next();
};

app.post('/signup', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const secretHandshake = await bcrypt.hash(password, 10);

    let newGuy = await userModel.create({
      username,
      password: secretHandshake,
    });
    res.status(201).send(newGuy)
  } catch(e){
    next('you done messed up A-A-Ron!');
  };
});

app.post('/signin', authUser, ( req, res, next)=> {
  res.status(200).send(req.slimShady);
})