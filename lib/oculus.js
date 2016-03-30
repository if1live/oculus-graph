var https = require('https');
var querystring = require('querystring');

var VERSION = '0.0.1';
var USER_AGENT = 'Dalvik/2.1.0 (Linux; U; Android 5.1.1; SM-G920L Build/LMY47X) [FBAN/OculusHorizon;FBAV/1.10.0;FBDV/SM-G920L;FBCR/SKTelecom;FBLC/ko_KR;FBSV/5.1.1;FBBD/samsung;FBBV/25632194;FBCA/armeabi-v7a:armeabi;FBMF/samsung;FBPN/com.oculus.horizon;]';


function OculusGraph(authKey) {
  this.authKey = authKey;
}
OculusGraph.VERSION = VERSION;
OculusGraph.USER_AGENT = USER_AGENT;
module.exports = OculusGraph;

OculusGraph.prototype.createOptions = function(opts) {

  var defaultOptions = {
    host: 'graph.oculus.com',
    port: 443,
    method: 'GET',
    headers: {
      'Authorization': this.authKey,
      'x-oculus-store-version': 'v2',
      'X-Oculus-Feature': 1,
      'User-Agent': USER_AGENT,
    },
  };

  var options = {};
  if(typeof(opts) !== 'undefined') {
    options = JSON.parse(JSON.stringify(opts));
  }

  // copy default values if not exist
  for(var key in defaultOptions) {
    if(typeof(options[key]) === 'undefined') {
      options[key] = defaultOptions[key];
    }
  }

  return options;
};

/*
  callback : function(data, statusCode, headers) {...}
  data : javascript object
 */

OculusGraph.prototype.request = function(options, callback) {
  var req = https.request(options, function(res) {
    var data = '';
    res.on('data', function(d) {
      data += d;
    });
    res.on('end', function() {
      callback(JSON.parse(data), res.statusCode, res.headers);
    });
  });
  req.end();
};

OculusGraph.prototype.requestGraphQL = function(graphql, queryParams, callback) {
  var query = {
    q: graphql,
    query_params: JSON.stringify(queryParams),
  };
  var options = this.createOptions({
    path: '/graphql?' + querystring.stringify(query),
  });
  this.request(options, callback);
};

OculusGraph.prototype.requestSections = function(callback) {
  var q = `viewer() {
    app_store.override(<app_store_override>) {
      id,
      name,
      sections {
        nodes {
          id,
          section_name,
        },
      },
    },
  }`;
  var query_params = {
    app_store_override: "NONE",
    concepts_store_override: "NONE"
  };
  this.requestGraphQL(q, query_params, callback);
};
