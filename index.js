import express from "express";
import path from "path";
import { createServer } from "http";
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url)); // needed for using EJS modules

//// SERVER CONFIG
process.env.PORT = process.env.PORT ?? 10000;
const serverOptions = {};

//// APPLICATION
const app = express();
app.set('view engine', 'pug');

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static(path.join(__dirname, 'public')));

// routes
app.route('/')
    .get(async (req, res) => {
        res.render('todos');
    })
    .post(async (req, res) => {
        res.status(500).send('post -- not implemented');
    })

//// START SERVER
const server = createServer(serverOptions, app).listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}...`)
});