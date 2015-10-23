'use strict';
let google =  require('googleapis')
// pull in json keyfile
, key = require('../../dwr-lep.key')
;


const raw = String.raw;
const VIEW_ID = 'ga:97455722';

let jwtClient = new google.auth.JWT(
	  key.client_email
	  , null
	  , key.private_key
	  ,['https://www.googleapis.com/auth/analytics.readonly']
	  , null
);

jwtClient.authorize(function (err, tokens) {
  if (err) {
    console.log(err);
    return;
  }
  let analytics = google.analytics('v3');
  queryData(analytics);
});

function queryData(analytics) {
  analytics.data.ga.get({
    'auth': jwtClient
    , 'ids': VIEW_ID
    , 'metrics': 'ga:pageviews'
    , 'start-date': '2015-01-01'
    , 'end-date': 'today'
    // , 'dimensions': 'ga:pagePath'
    // , 'sort': '-ga:pageviews',
    // , 'max-results': 10,
    // , 'filters': raw`ga:pagePath=~/ch_[-a-z0-9]+\.html$`,
  }, function (err, response) {
    if (err) {
      console.log(err);
    }
    console.log(JSON.stringify(response, null, 4));
  });  
}

// let ga = require('../g-analyze');

// ga({params: {}},  {json: obj=>console.log(obj)}, function(){console.log('NEXT CALLED', 'with args:', arguments)})