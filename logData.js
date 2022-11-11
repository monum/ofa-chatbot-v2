const airtable = require("airtable");
const twilio = require("twilio");

exports.handler = function (context, event, callback) {
 const base = new airtable({
   apiKey: context.AIRTABLE_API_KEY,
 }).base(context.AIRTABLE_BASE_ID);
 base("Input").create(
   [
     {
       fields: {
         PhoneNumber: event.PhoneNumber,
         benefitchoice: event.benefitchoice,
         pickupchoice: event.pickupchoice,
         learnchoice: event.learnchoice,
         enrollSNAP:event.enrollSNAP,
         triggerMessage:event.triggerMessage,
         language: event.language,
         referral:event.referral,
         languageReferral:event.languageReferral
       },
     },
   ],
   function (error, records) {
     if (error) {
       console.error(error);
       callback(error);
       return;
     } else {
       callback(null, "Success!");
     }
   }
 );
};
