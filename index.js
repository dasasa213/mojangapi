const express = require("express");
const app = express();
app.use(express.json());
const mysql = require("mysql");

// サーバーを起動する
app.listen(4000, function() {
  console.log("Server started on port 3000");
});

app.get("/", (req, res) =>{
    res.send("レスOK");
});

const connection = mysql.createConnection({
  host     : 'ec2-3-93-160-246.compute-1.amazonaws.com',
  user     : 'bclymgxatvkjbh',
  password : '5432',
  database : 'd49d9t9bi6jmun'
});

// データベースに接続する
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

//user取得メソッド
// 全てのユーザーデータを取得する
app.get("/api/users", function(req, res) {
  connection.query("SELECT * FROM user", function(error, results, fields) {
    if (error) throw error;
    res.send(JSON.stringify(results));
  });
});

//USER情報をサーバーに配置する
const user = [
    { userid: 1, username: "TEST1"},
    { userid: 2, username: "TEST2"},
    { userid: 3, username: "TEST3"}
];

//データ取得(GETメソッド)
app.get("/api/user", (req, res) =>{
    res.send(user);
});

app.get("/api/user/:userid", (req, res) =>{
    const auser = user.find((c) => c.userid === parseInt(req.params.userid));
    res.send(auser);
});

//データを送信する（POSTメソッド）
app.post("/api/user", (req, res) => {
    const auser = {
        userid: user.length + 1,
        username: req.body.username
    };
    user.push(auser);
    res.send(user);
});

//データを更新する（PUTメソッド）
app.put("/api/user/:userid", (req, res) =>{
    const auser = user.find((c) => c.userid === parseInt(req.params.userid));
    auser.username = req.body.username;
    res.send(user);
});

//データを削除する（PUTメソッド）
app.delete("/api/user/:userid", (req, res) =>{
    const auser = user.find((c) => c.userid === parseInt(req.params.userid));
    const index = user.indexOf(auser);
    user.splice(index, 1);
    res.send(user);
});