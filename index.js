import express from "express";
import sqlite3 from "sqlite3";
import path from "path";
import { createServer } from "http";
import { fileURLToPath } from 'url';

import { initDb, insertTestData, printTodos } from "./model/db.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url)); // needed for using EJS modules

//// SERVER CONFIG
process.env.PORT = process.env.PORT ?? 10000;
const serverOptions = {};

//// DATABASE
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    initDb(db);
    insertTestData(db);
});

//// APPLICATION
const app = express();
app.set('view engine', 'pug');

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static(path.join(__dirname, 'public')));

// routes
app.route('/')
    // render main page
    .get(async (req, res) => {
        res.render('todos');
    })

app.route('/todos')
    // get json with all todos
    .get(async (req, res) => {
        // attempt to grab todos from db
        db.serialize(() => {
            const sql = `SELECT * FROM todos;`;
            db.all(sql, {}, (err, rows) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('server error');
                    return;
                }
                res.status(200).json(rows);
            });
        });
    })
    // create new todo
    .post(async (req, res) => {

    });

//// START SERVER
const server = createServer(serverOptions, app).listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}...`)
});