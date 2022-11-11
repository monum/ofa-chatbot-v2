// Spreadsheet column names mapped to 0-based index numbers.
var TIME_ENTERED = 0;
var PHONE_NUMBER = 4;
var MESSAGE = 5;
var STATUS = 6;
var LANGUAGE = 3;
var NAME = 2;
var REFERRAL = 1;

// Enter your Twilio account information here.
var TWILIO_ACCOUNT_SID = '[YOUR ACCOUNT SID]';
var TWILIO_SMS_NUMBER = '[YOUR NUMBER]';
var TWILIO_AUTH_TOKEN = '[YOUR AUTH TOKEN]';
var TWILIO_FLOW = '[YOUR FLOW ID]'

/**
 * Installs a trigger in the Spreadsheet to run upon the Sheet being opened.
 * To learn more about triggers read:
 * https://developers.google.com/apps-script/guides/triggers
 */
function onOpen() {
  // To learn about custom menus, please read:
  // https://developers.google.com/apps-script/guides/menus
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Send SMS')
      .addItem('Send to all', 'sendSmsToAll')
      .addToUi();
};  

/**
 * Sends text messages listed in the Google Sheet
 */
function sendSmsToAll() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var rows = sheet.getDataRange().getValues();
  
  // The `shift` method removes the first row and saves it into `headers`.
  var headers = rows.shift();
  
  // Try to send an SMS to every row and save their status.
  rows.forEach(function(row) {
    row[STATUS] = sendSms(row[PHONE_NUMBER], row[MESSAGE], row[NAME], row[LANGUAGE], row[REFERRAL]);
  });
  
  // Write the entire data back into the sheet.
  sheet.getRange(2, 1, rows.length, headers.length).setValues(rows);
}


/**
 * Sends a message to a given phone number via SMS through Twilio.
 * To learn more about sending an SMS via Twilio and Sheets: 
 * https://www.twilio.com/blog/2016/02/send-sms-from-a-google-spreadsheet.html
 *
 * @param {number} phoneNumber - phone number to send SMS to.
 * @param {string} message - text to send via SMS.
 * @param {string} name - name of person to be contacted
 * 
 * @return {string} status of SMS sent (successful sent date or error encountered).
 */
function sendSms(phoneNumber, message, name, language, referral) {
  var twilioUrl = 'https://studio.twilio.com/v2/Flows/'+ TWILIO_FLOW +'/Executions';

  try {

    var options ={
      method: 'post',
      headers: {
        "Content-Type": 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + Utilities.base64Encode(TWILIO_ACCOUNT_SID + ":" + TWILIO_AUTH_TOKEN)
      },
      payload: {
        To: "+"+ phoneNumber.toString(),
        Body: language,
        Parameters: JSON.stringify({name: name, language:language, message:message, to:"+"+ phoneNumber.toString(), referral:referral}),
        From: TWILIO_SMS_NUMBER,
      },
    };
    
    UrlFetchApp.fetch(twilioUrl,options); 
    
    return 'sent: ' + new Date();
  } catch (err) {
    return 'error: ' + err;
  }
}
