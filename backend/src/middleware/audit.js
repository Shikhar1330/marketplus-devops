const pool=require('../db/pool');
async function audit(action,resource,email='system'){try{await pool.query('INSERT INTO audit_logs(user_email,action,resource) VALUES($1,$2,$3)',[email,action,resource]);}catch(e){console.error(e.message)}}
module.exports={audit};
