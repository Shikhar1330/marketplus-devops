const jwt=require('jsonwebtoken');
function authenticate(req,res,next){const h=req.headers.authorization||'';const t=h.startsWith('Bearer ')?h.slice(7):null;if(!t)return res.status(401).json({error:'Authorization token required.'});try{req.user=jwt.verify(t,process.env.JWT_SECRET||'dev_secret');next();}catch(e){res.status(401).json({error:'Invalid token.'})}}
function requireRole(...roles){return(req,res,next)=>{if(!req.user||!roles.includes(req.user.role))return res.status(403).json({error:`Access denied. Required role: ${roles.join(' or ')}`});next();}}
module.exports={authenticate,requireRole};
