const mysql=require("mysql2")
const db=require("./connections.js")

function viewAllEmployees(){
    const sql = `SELECT * FROM employees`;
    console.log(sql)
    db.query(sql, (err, rows) => {
      if (err) {
         console.error(err.message)
         return;
      }
      console.log(rows)
    });
};

function addEmployee({first_name,last_name,role_id,manager_id}){
    const sql = `INSERT INTO employees (first_name,last_name,role_id,manager_id)
      VALUES (?,?,?,?)`;
    const params = [first_name,last_name,role_id,manager_id];
    
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: body
      });
    });
};
  
module.exports={
    viewAllEmployees,addEmployee
}
 