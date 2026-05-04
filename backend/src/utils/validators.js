function isValidEmail(email){return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)}
function isStrongPassword(password){return typeof password==='string'&&password.length>=8}
function isValidRole(role){return ['ADMIN','EDITOR','ANALYST','VIEWER'].includes(role)}
function isValidSentiment(s){return ['POSITIVE','NEGATIVE','NEUTRAL'].includes(s)}
module.exports={isValidEmail,isStrongPassword,isValidRole,isValidSentiment};
