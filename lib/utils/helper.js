
const { raw } = require('express');
const fetch = require('node-fetch');


async function getZipcodes(zipcode){

  const api_url = `https://api.zip-codes.com/ZipCodesAPI.svc/1.0/FindZipCodesInRadius?zipcode=${zipcode}&maximumradius=5&minimumradius=0&country=ALL&key=${process.env.ZIPCODE_KEY}`;
  
  const raw_res = await fetch(api_url); //raw response
  console.log('RAW RES', raw_res);
  const zipcodes = await raw_res.json(); // converted json
  return zipcodes; //list of objects 

}

module.exports = getZipcodes;
