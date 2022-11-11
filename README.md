# Office of Food Justice Chatbot v2
Development of the next version of a chatbot for the Office of Food Access

## Getting started with a chatbot
1. The best place to start is almost always pen and paper. Make a simple diagram of how you expect your users to navigate the options.
1. Another way to start, or once you have an initial diagram go ahead and use a digital tool to make it easier to edit and move things around. We used Lucidchart, but you could also use Figma, Visio, Google Slides, whatever works for you. A good starting point is a flowchart. Check out our latest [chatbot diagram](https://lucid.app/lucidchart/3b471da5-e2e9-48fe-9536-503505337aea/edit?viewport_loc=-823%2C-768%2C5410%2C3007%2C0_0&invitationId=inv_b741141a-96b7-455a-befb-4759efa12fcf) (things changed a bit when we moved to Twilio, but this is the most up-to-date version) 

## Getting Started with Twilio

1. Create a Twilio account, if your department or organization already has an ‘Organization’ created ask to be added. For the City of Boston, ask to be added to the MONUM organization to access OFJ’s chatbot.

1. To create a new flow or edit one, on the left-hand side navigation tab click on ‘Studio’ and then ‘[Flows](https://www.twilio.com/console/studio/flows)’. If this option is not available, click on ‘Explore Products’ and under Developer tools find ‘Studio’ and click the pin so it will be available next time. <img width="181" alt="image" src="https://user-images.githubusercontent.com/87198109/201346525-80e3c820-2f63-4d42-95da-5e7cd122db0c.png">
 
1. To create a new flow, follow [these steps](https://www.twilio.com/docs/studio/tutorials/how-to-build-a-chatbot). To check out the flow we designed take look at our JSON [here]. 
1. Once you have a flow designed, it is time to buy a phone number. Click ‘Phone numbers’ (in the left-hand side navigation bar) and under it ‘Manage’ and ‘Buy a number’. If the option ‘Phone numbers’ is not visible click on ‘Explore Products’ and look for the option and click the pin. 
1. Once that’s done, click on the phone number in ‘Active Numbers’. It should say Configure and Properties. Scroll all the way down to 'Messaging Services' and set it as follows:
   * A Message Comes In > Studio Flow >[Your flow name]
1. To receive messages from the chatbot, go to Phone Numbers > Manage > Verified Caller IDs. When testing, every number must go through this process. Click the red plus (+) button to add a new number, then click “text you instead” to input a code. When this is done correctly, your number will show on the list of verified caller IDs.
 
1. You can now begin testing the newly purchased number by sending it any message. Unfortunately, this is not free, but you can use your trial balance!

