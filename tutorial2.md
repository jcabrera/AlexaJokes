# Build your first Alexa skill
* **Goal:** To set up an Alexa skill that calls your Lambda function when someone uses it, and test to make sure it's working
* **Time Frame:** We haven't run through this yet, but best guess is an hour or more.
* **Afterward:** The next step is to learn more about TypeScript and make some code changes to improve the Alexa skill.  This will include changing the code, testing that it's not obviously broken, sending it to AWS Lambda to run, and testing it to make sure it works as intended.

## Set up Alexa (THIS PART NOT YET FINISHED)

1. First, create an Amazon developer account (for reasons unknown, this is separate from your AWS account that we created before):
    1. In your browser, go to http://developer.amazon.com/
    1. Click `Sign In` on the top right
    1. If you already have a regular Amazon account, try signing in with that.  If you don't, click `Create your Amazon Developer account`
    1. For new accounts, enter your name, e-mail address, and a good password.  For convenience, it may be best to use the same e-mail address you used for your AWS account (including any dots in the name).  It is not required, though.  Then hit `Continue`.
    1. *Since I already have an account, I need to document this when one of you goes through it.*  Complete the rest of the Amazon Developer account setup, and if you're not signed in when that's done, sign in like above
1. Next, create an Alexa skill (TODO)
1. Configure the Alexa skill using the sample content in samples/ (TODO)
1. Point the Alexa skill to your Lambda (TODO)
1. Test the Alexa skill from the Alexa console (TODO)
1. If you have an Echo or other Alexa device, invite the Amazon account tied to your device to test the skill.  Otherwise, sign in to the simulator with your Amazon Developer account. (TODO)
1. Test the Alexa skill from an Echo, or from the simulator (TODO)

## Change the code for the Alexa skill

Congratulations!  Your first Alexa skill is working!

In the next section, we'll talk more about the code in the Alexa skill, what the different parts mean, and how to change it.  We'll do things like provide a list of jokes, and fix up the skill so that Alexa can tell them.

Later, we'll add knock-knock jokes where you have to have a back-and-forth conversation with Alexa to complete them.
