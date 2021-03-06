'use strict';
/*
 'use strict' is not required but helpful for turning syntactical errors into true errors in the program flow
 http://www.w3schools.com/js/js_strict.asp
*/

/*
 Modules make it possible to import JavaScript files into your application.  Modules are imported
 using 'require' statements that give you a reference to the module.

  It is a good idea to list the modules that your application depends on in the package.json in the project root
 */
var util = require('util');
var https = require('https');

/*
 Once you 'require' a module you can reference the things that it exports.  These are defined in module.exports.

 For a controller in a127 (which this is) you should export the functions referenced in your Swagger document by name.

 Either:
  - The HTTP Verb of the corresponding operation (get, put, post, delete, etc)
  - Or the operationId associated with the operation in your Swagger document

  In the starter/skeleton project the 'get' operation on the '/hello' path has an operationId named 'hello'.  Here,
  we specify that in the exports of this module that 'hello' maps to the function named 'hello'
 */
module.exports = {
  get: getHttp
};

/*
  Functions in a127 controllers used for operations should take two parameters:

  Param 1: a handle to the request object
  Param 2: a handle to the response object
 */
function getHttp(req, response) {
  // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
  var entireRequest = req.swagger;
  //var hello = name ? util.format('Hello, %s', name) : 'Hello, stranger!';

  var url = 'https://api.usergrid.com/prabhat/sandbox';

    https.get(url, function(res) {
        var body = '';

        res.on('data', function(chunk) {
            console.log("here");
            body += chunk;
        });

        res.on('end', function() {
           // var ugResponse = JSON.parse(body)
            console.log ("ended");
            response.json (JSON.parse(body));
        });
    }).on('error', function(e) {
        console.log("Got error: ", e);
    });

  // this sends back a JSON response which is a single string
  //res.json(entireRequest);
}
