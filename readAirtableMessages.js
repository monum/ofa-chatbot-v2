const airtable = require("airtable");
const twilio = require("twilio");
let response = {};


exports.handler = function (context, event, callback) {
 const base = new airtable({
   apiKey: context.AIRTABLE_API_KEY_OFAMESSAGES,
 }).base(context.AIRTABLE_BASE_ID_OFAMESSAGES);
 
const lang = event.language;
 
 return base("Messages")
   .select()
   .all()
   .then((records) => {
     records.forEach((record) => {
         response[record.get("Key")] =  record.get(lang);
     });

     callback(null, response);
   })
   .catch((error) => {
     callback(error);
   });
};
