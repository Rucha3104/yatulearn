const mysql= require('mysql2');
const connection = mysql.createConnection({
host: "localhost",
user: "root",
password: "Rucha@123", 
database: "p2"
});
connection.connect((err) => {
if (err) {
  console.log('Error connecting:'+ err.stack);
  return;
}
console.log('Connected');
});

connection.query("SELECT * FROM customers where cust_nm='Krishna'",function (err, results,feilds) {

if (err) throw err;

console.table(results);


});

 connection.end();