let GA = require('googleanalytics'),
config = {
    "user": process.env.GOOGLE_ANALYTICS_USER,
    "password": process.env.GOOGLE_ANALYTICS_PWD
}
, ga = new GA.GA(config);

ga.login(function(err, token) {
    var options = {
        'ids': 'ga:<profileid>',
        'start-date': '2010-09-01',
        'end-date': '2010-09-30',
        'dimensions': 'ga:pagePath',
        'metrics': 'ga:pageviews',
        'sort': '-ga:pagePath'
    };

    // ga.get(options, function(err, entries) {
    //    util.debug(JSON.stringify(entries));
    // });
});
;

function formatEntries(entries){
  let formatted;
  /*
  do stuff with entries
   */
  return formatted
}

function getInfo(req){
    return new Promise((resolve, reject)=>{
      ga.get(options, function(err, entries) {
        if(err)
          return reject(err) 
         return resolve( formatEntries(entries) )
      });
    })
}

function analyze(req, res, next){
    getInfo(req.params)
      .then((info)={
        res.json(info)
      });

}


module.exports = (app)=>{
    app.use('google-analytics', analyze);
    return app
}

