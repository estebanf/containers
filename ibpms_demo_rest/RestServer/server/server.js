'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
var faker = require('faker');

var app = module.exports = loopback();

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
setTimeout(function(){

boot(app, __dirname, function(err) {
  if (err) throw err;
  var ds = app.dataSources.demo_mysql;

  ds.isActual('Customer', function(err,actual){
    if(!actual){
      ds.automigrate('Customer', function(err){
        if(err) throw err;
        console.log("Customer table created");
        var data = [];
        for(var i=1; i < 100; i++){
          data.push({
            name: faker.company.companyName(),
            contact_name: faker.name.firstName() + ' ' + faker.name.lastName(),
            contact_phone: faker.phone.phoneNumber(),
            contact_email: faker.internet.email()
          })
        }
        app.models.Customer.create(data,function(err,customers){
          if (err) console.log(err);
        });
        console.log("Customer data created");
      })
    }
    else{
      console.log("Table exists");
    }
  })
  // app.dataSources.demo_mysql.automigrate('Customer', function(err){
  //   if(err) throw err;
  // })
  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
},15000);
