// import dotenv from 'dotenv'
// import express from 'express'
// import { Client } from 'pg'

const dotenv = require("dotenv")
const mysql = require("mysql2/promise")
const express = require("express")
const { Client } = require("pg")

dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URL
})
client.connect()

const app = express()
const PORT = process.env.PORT || 5000

app.get('/', async (req, res) => {

  var con = await mysql.createConnection({
    host: "199.201.90.12",
    user: "phpmyadm_70",
    password: "#Bru1234",
    database: 'phpmyadm_70',
    // port: 3306
  });

  const [rows] = await con.query('SELECT * FROM alunos;');

  return res.json(rows);
});

app.get('/users', async (req, res) => {
  const result = await client.query('SELECT * FROM users;')

  return res.json({ users: result.rows })
});

app.get('/populate', async (req, res) => {
  await client.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL
    );
  `)

  await client.query(`
    INSERT INTO users (name) 
    VALUES ('Lucas'), ('Diogo'), ('Bruna'), ('Lucas');
  `)

  return res.json({ message: 'Populated' })
})

app.listen(PORT, () => console.log(`Listening on ${PORT}`))