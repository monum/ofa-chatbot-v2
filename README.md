# Office of Food Justice Chatbot v2
Development of the next version of a chatbot for the Office of Food Access

## Getting started with a chatbot
1. The best place to start is almost always pen and paper. Make a simple diagram of how you expect your users to navigate the options.
1. Another way to start, or once you have an initial diagram go ahead and use a digital tool to make it easier to edit and move things around. We used Lucidchart, but you could also use Figma, Visio, Google Slides, whatever works for you. A good starting point is a flowchart. Check out our latest [chatbot diagram](https://lucid.app/lucidchart/3b471da5-e2e9-48fe-9536-503505337aea/edit?viewport_loc=-823%2C-768%2C5410%2C3007%2C0_0&invitationId=inv_b741141a-96b7-455a-befb-4759efa12fcf) (things changed a bit when we moved to Twilio, but this is the most up-to-date version) 

## Getting Started with Twilio
1. Create a Twilio account, if your department or organization already has an ‘Organization’ created ask to be added. For the City of Boston, ask to be added to the MONUM organization to access OFJ’s chatbot.

1. To create a new flow or edit one, on the left-hand side navigation tab click on ‘Studio’ and then ‘[Flows](https://www.twilio.com/console/studio/flows)’. If this option is not available, click on ‘Explore Products’ and under Developer tools find ‘Studio’ and click the pin so it will be available next time. 
<img width="181" alt="image" src="https://user-images.githubusercontent.com/87198109/201346525-80e3c820-2f63-4d42-95da-5e7cd122db0c.png">

3. To create a new flow, follow [these steps](https://www.twilio.com/docs/studio/tutorials/how-to-build-a-chatbot). To check out the flow we designed take look at our JSON [here](https://github.com/monum/ofa-chatbot-v2/blob/main/flow.json). 
1. Once you have a flow designed, it is time to buy a phone number. Click ‘Phone numbers’ (in the left-hand side navigation bar) and under it ‘Manage’ and ‘Buy a number’. If the option ‘Phone numbers’ is not visible click on ‘Explore Products’ and look for the option and click the pin. 
1. Once that’s done, click on the phone number in ‘Active Numbers’. It should say Configure and Properties. Scroll all the way down to 'Messaging' and set it as follows:
   * Under ‘Messaging Service’ select the name of your flow.
   * Just below you should also find the option ‘A Message Comes In’ and set the options to Studio Flow and [name of your flow]. In our case it was OFA_Chatbot. 
   <img width="1014" alt="image" src="https://user-images.githubusercontent.com/87198109/201350034-462fc285-a299-482a-9454-757da5e6d5d9.png">
1. For testing purposes, you need add your phone as verified phone numbers. 
   * Go to Phone Numbers > Manage > Verified Caller IDs.
   * •	Click ‘Add a new Caller ID’ to add a new number. Input your number and choose the verification you prefer, SMS or Call. Once verified your number will show on the list of verified caller IDs.
<img width="603" alt="image" src="https://user-images.githubusercontent.com/87198109/201351370-bbe7ba70-ca9f-454b-a281-6a81fd8c59f5.png">
7. You can now begin testing the newly purchased number by sending it any message. Unfortunately, this is not free, but you can use your trial balance!

## Sending Bulk Messages with Google Sheets
1.	To send outgoing messages in bulk we used this [Google tutorial](https://www.youtube.com/watch?v=O1cfIlQye8M). Check out our script [here](https://github.com/monum/ofa-chatbot-v2/blob/main/sendMessagesWithSheets.js). <img width="1007" alt="image" src="https://user-images.githubusercontent.com/87198109/201366544-2986a1a0-accf-46d6-b98e-4530b436b2ff.png">
2.	To prepare an outgoing message, update the “Time Entered” with the date, “Phone Number”, “Name”, and “Language” fields.
3.	In the “Message Body” field, copy the formula in our spreadsheet that is located on cell B24 in the Sheet ‘Instructions’. This formula selects the correct message depending on the referral source and creates the message with the name and language provided.
=index(HelloTable,match(1,(D2 = Language)*(B2 = Referral),0),3)&C2&index(HelloTable,match(1,(D2 = Language)*(B2 = Referral),0),4)
4.	Setup your translations in the Sheet named ‘Instructions’. 
5.	Once you’re ready, send the messages by clicking ‘Send SMS > Send to All.’ The status column will update automatically.
<img width="553" alt="image" src="https://user-images.githubusercontent.com/87198109/201367998-98e5e5fc-d671-4e17-81b5-c25dc1cde71e.png">

## Log Responses in Airtable
1.  To log responses in Airtable you will need to use Twilio Functions -now named Functions (Classic). We used [this tutorial](https://www.youtube.com/watch?v=xjt9YhNFrno) to get us started. Our function is [here](https://github.com/monum/ofa-chatbot-v2/blob/main/logData.js).
2.  To use the function in Twilio Studio you will need to add ‘Make HTTP Request’ widget or a ‘Run Function’ widget. Configuration is similar between both in this case.
<img width="218" alt="image" src="https://user-images.githubusercontent.com/87198109/201380016-50e59572-7611-4367-9677-65badf381d96.png">

3.  First give the widget a name and configure. 
    * Request method: POST.
    * Request URL: [Your function URL]. Usually: https://mantis-cuscus-7403.twil.io/[your_function_name]
    * Depending on data that you setup your function to log you will need to configure the HTTP parameters. In our case:
      * triggerMessage: {{trigger.message.Body}}
      * phoneNumber: {{widgets.askBenefit.inbound.From}} 
      * language: {{flow.variables.language}}
    * Next, configure the transitions. 
<img width="178" alt="image" src="https://user-images.githubusercontent.com/87198109/201381664-0e2c6c98-dc14-42b0-ab06-741c1bbde102.png">

 4. Test it out! Check if your Airtable is logging the data. 

## Using Airtable as a database
1.	To use Airtable as a database for our messages we used [this tutorial](https://www.twilio.com/blog/airtable-database-read). Our function is [here](https://github.com/monum/ofa-chatbot-v2/blob/main/readAirtableMessages.js).
2.	To set up your function in Studio, add a ‘Run Function’ widget. 
<img width="194" alt="image" src="https://user-images.githubusercontent.com/87198109/201384875-a591c097-d41e-49ee-a398-521ca64ba191.png">

3.	Configure the widget. 
    * Give the widget a name
    * Select from the ‘Function URL’ drop-down menu the function you wish to use.
    * Setup the function parameters. In our case:
       * language: {{flow.variables.language}} – we are using a variable record which language users are contacting us in based on their initial interaction.
<img width="209" alt="image" src="https://user-images.githubusercontent.com/87198109/201384923-bb4342b4-72ca-48ce-959a-04e1af3ee2dc.png">

## Using variables in Twilio to read what users have texted
1.	Add a ‘Variable’ widget and give it a name
2.	Define the variable values using [Liquid Template Language](https://www.twilio.com/docs/studio/user-guide/liquid-template-language).
3.	This is how we defined our language variable based on the key word we had assigned each language:
{% assign text = trigger.message.Body | downcase | rstrip %} {%- case text -%} {%- when 'comida' or 'cancelar' -%} SPA {%- when 'food' or 'nothanks' or 'no thanks' -%} ENG {%- when 'manje' -%} HCR {%- when 'thức ăn' -%} VIE {%- when '食物' -%} CHI {%- when 'طعام' -%} ARA {%- when 'komida' -%} CVC {%- when 'alimento' -%} POR {%- when 'raashin' or 'maya mahadsanid' -%} SOM {%- endcase -%}

