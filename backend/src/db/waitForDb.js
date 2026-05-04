const pool = require('./pool');
(async()=>{for(let i=1;i<=30;i++){try{await pool.query('SELECT 1');console.log('Database ready');await pool.end();return;}catch(e){console.log(`Waiting for database ${i}/30`);await new Promise(r=>setTimeout(r,2000));}}process.exit(1);})();
