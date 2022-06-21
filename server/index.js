const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_arcus'
});

app.use(cors())

app.use(express.json());

app.use(bodyParser.urlencoded({extended: true}));

app.get("/api/get", (req, res) => {

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const sqlQuery = "SELECT * FROM tbl_playeraccount"

    db.query(sqlQuery, (err, result) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    });
});

app.post("/api/insert", (req, res) => {

    const username = req.body.player_username;
    const email = req.body.player_email;
    const password = req.body.player_password;

    const sqlQuery = "INSERT INTO tbl_playeraccount (player_username, player_email, player_password) VALUES (?, ?, ?)"

    db.query(sqlQuery, [username, email, password], (err, result) => {
        if(err){
            console.log(err);
        }
        else{
            const sqlQuery = "SELECT * FROM tbl_playeraccount ORDER BY player_id DESC LIMIT 1"

            db.query(sqlQuery, (err, result) => {
                if(err){
                    console.log(err);
                }
                else{
                    res.send(result);
                }
            });
        }
    });
});

app.post("/api/update", (req, res) => {

    const id = req.body.player_id;
    const username = req.body.player_username;
    const email = req.body.player_email;
    const password = req.body.player_password;

    const sqlQuery = "UPDATE tbl_playeraccount SET player_username = ?, player_email = ?, player_password = ? WHERE player_id = ?"

    db.query(sqlQuery, [username, email, password, id], (err, result) => {
        if(err){
            console.log(err);
        }
        else{
            const sqlQuery = "SELECT * FROM tbl_playeraccount"

            db.query(sqlQuery, (err, result) => {
                if(err){
                    console.log(err);
                }
                else{
                    res.send(result);
                }
            });
        }
    });
});

app.post("/api/delete", (req, res) => {

    const id = req.body.player_id;

    const sqlQuery = "DELETE FROM tbl_playeraccount WHERE player_id = ?"

    db.query(sqlQuery, [id], (err, result) => {
        if(err){
            console.log(err);
        }
        else{
            const sqlQuery = "SELECT * FROM tbl_playeraccount"

            db.query(sqlQuery, (err, result) => {
                if(err){
                    console.log(err);
                }
                else{
                    res.send(result);
                }
            });
        }
    });
});


app.listen(3001, ()=>{
    console.log("running on port 3001");
});