var fs = require('fs'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Listing = require('./ListingSchema.js'),
    config = require('./config');

/* Connect to your database using mongoose - remember to keep your key secret*/
mongoose.connect(config.db.uri,{ useNewUrlParser: true });


/**************************************************************************/

//  Find the document that contains data corresponding to Library West,
//  then log it to the console.

var findLibraryWest = function() {

  Listing.find({code: 'LBW'}, function(err, listing) {
    if (err) throw err;

    console.log(listing);
  });

};

/**************************************************************************/

/*
  Find the document with the code 'CABL'. This cooresponds with courses that
  can only be viewed on cable TV. Since we live in the 21st century and most
  courses are now web based, go ahead and remove this listing from your
  database and log the document to the console.
 */

var removeCable = function() {

   var query = {code: 'CABL'};

   Listing.findOneAndRemove(query, function(err, listing) {
     if (err) throw err;

     console.log(listing);
   });

};

/**************************************************************************/

//  Phelps Lab address is incorrect. Find the listing, update it, and then
//  log the updated document to the console.

var updatePhelpsLab = function() {

  var query = {code: 'PHL'};
  var update = {address: "1953 Museum Rd, Gainesville, FL 32603, United States"};

  Listing.findOneAndUpdate(query, update, {new : true}, function(err, listing) {
    if (err) throw err;

    console.log(listing);
  });
};

/**************************************************************************/

// Retrieve all listings in the database, and log them to the console.

var retrieveAllListings = function() {

    Listing.find({}, function(err, listings){
      if(err) throw err;

      console.log(JSON.stringify(listings, null, 1));
    });

};

/**************************************************************************/

findLibraryWest();
removeCable();
updatePhelpsLab();
retrieveAllListings();
