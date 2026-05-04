const client=require('prom-client');
client.collectDefaultMetrics({prefix:'marketplus_'});
const httpRequests=new client.Counter({name:'marketplus_http_requests_total',help:'Total HTTP requests',labelNames:['method','route','status']});
const httpDuration=new client.Histogram({name:'marketplus_http_request_duration_seconds',help:'HTTP duration',labelNames:['method','route','status'],buckets:[0.05,0.1,0.2,0.5,1,2,5]});
function metricsMiddleware(req,res,next){const start=process.hrtime();res.on('finish',()=>{const d=process.hrtime(start);const s=d[0]+d[1]/1e9;const route=req.route?.path||req.path;httpRequests.inc({method:req.method,route,status:String(res.statusCode)});httpDuration.observe({method:req.method,route,status:String(res.statusCode)},s)});next()}
module.exports={client,metricsMiddleware};
