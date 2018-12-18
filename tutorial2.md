# Build your first Alexa skill
* **Goal:** To set up an Alexa skill that calls your Lambda function when someone uses it, and test to make sure it's working
* **Time Frame:** We haven't run through this yet, but best guess is an hour or more.
* **Afterward:** The next step is to learn more about TypeScript and make some code changes to improve the Alexa skill.  This will include changing the code, testing that it's not obviously broken, sending it to AWS Lambda to run, and testing it to make sure it works as intended.

## Set up Alexa

1. First, create an Amazon developer account (for reasons unknown, this is separate from your AWS account that we created before):
    1. In your browser, go to http://developer.amazon.com/
    1. Click `Sign In` on the top right
    1. If you already have a regular Amazon account, try signing in with that.  If you don't, click `Create your Amazon Developer account`
    1. For new accounts, enter your name, e-mail address, and a good password.  For convenience, it may be best to use the same e-mail address you used for your AWS account (including any dots in the name).  It is not required, though.  Then hit `Continue`.
    1. *Since I already have an account, I need to document this when one of you goes through it.*  Complete the rest of the Amazon Developer account setup, and if you're not signed in when that's done, sign in like above
1. Next, create an Alexa skill:
    1. Click `Alexa` on the main developer dashboard screen
    1. Mouse over `Your Alexa Consoles` on the top right, then click `Skills`
    1. Click `Create Skill`
    1. Enter the "Skill name" of `Alexa Jokes` and make sure `Custom` is selected underneath
    1. Click `Create skill`
    1. Click the `Fact skill`.  It will be convenient to start with some of the basics in place, such as being able to for help.  Then click `Choose` to create the skill
1. Now it's time to configure the Alexa skill:
    1. You should be looking at a screen that says "Alexa Developer Console" on the top left, and then under that, "Your Skills, Alexa Jokes, Build, Test, ..."
    1. Click the "Invocation" entry on the left side
    1. Replace the "Skill Invocation Name" text with the words you want people to use to tell Alexa to use you're skill.  This can be virtually anything, but for now, put in `a green clown`.  Then click `Save Model` above.
    1. Remember that an "intent" is the Alexa word for a request or command.  The "fact skill" we started with has one custom intent, the "GetNewFactIntent", which for that skill means, "the person asked the skill to tell them a fact".  We don't need that since our skill doesn't deal with "facts".
    1. Click the trash can on the left next to `GetNewFactIntent` and then click `Delete Intent`
    1. Click `Add Intent` or the `Add` button next to "Intents" on the left.
    1. Under "Create custom intent" enter `TellMeAJokeIntent` and hit `Create custom intent`
    1. In the area for "Sample utterances", type one of the things someone might say to ask for a joke (an "utterance" is something somebody said, so it wants samples of what people might say that will cause Alexa to use this intent -- things they might say when they want the skill to tell them a joke).  Hit Enter after each one, and put in another intil you have at least five.  Even if you're entering a question, don't include punctuation (that is, don't include a period or question mark).  Here are some ideas:
        * Tell me a joke
        * Do you know any good jokes
        * What's a good joke
        * Have you heard a good joke lately
        * Hit me with a funny one
        * Make me laugh
    1. Click on the left where it says "Intents (6)".  Make sure it shows the `TellMeAJokeIntent` and says that it has at laest 5 utterances.
    1. Click `Save Model` along the top (DON'T FORGET THIS!)
1. Point the Alexa skill to your Lambda:
    1. Click `Endpoint` on the left
    1. Switch to a browser window that's open to the AWS Console.  If needed, open a new tab (`Command-T`) or window (`Command-N`) and search for AWS console, then go there and sign in.
    1. Go to the Lambda area of the console, e.g. by hitting the `Services` link in the top bar, typing `lambda` into the search field, and clicking `Lambda` when the suggestion appears
    1. Go to `Functions` in the left side of the Lambda console, and then click the name of your `AlexaJokes` function
    1. On the top right of the screen for that Lambda function, it should show the ARN of the function, something like `ARN - arn:aws:lambda:us-east-1:...:AlexaJokes`.  Highlight the ARN value with the mouse (the part after the dash, from "arn:" to "AlexaJokes") and copy it with `Command-C`
    1. Switch back to the browser window with the Alexa console, and paste the ARN of the Lambda into the box next to `Default Region` and then hit the `Save Endpoints` button above
1. Check your skill configuration:
    1. Click `Invocation` on the left side
    1. Click `Build Model` along the top.  It will tell you the build has started, then take a bit of time (perhaps a minute), then hopefully tell you "Build Successful"
1. Test the Alexa skill from the Alexa console:
    1. Click `Test` in the black bar at the top
    1. Where it says "Test is disabled for this skill" click `Off` and select `Development`
    1. You should see "Alexa simulator" with a blue bar below it, then "English (US)" under that, with a text box next to it that says "Type or click and hold the mic"
    1. In that last box, type `open a green clown` and hit Enter.  Remember, "a green clown" is what we set as the words that mean Alexa should use your skill -- so this is basically saying "start up your skill"
    1. If you have audio on your computer (speakers or headphones, with the volume on), you should hear Alexa say "Hi there.  Ask me to tell a joke".  If not, don't worry, you can still see the response.
    1. On the right side of the screen, you should see a blue bar that says `Hi there.  Ask me to tell a joke!`  That's from your Lambda function!  Below that, there are large text areas with "JSON Input" and "JSON Output" for this request.  Those are the message Alexa sent to your Lambda, and the response your Lambda sent back.
        * This is a great example of the power of using other people's libraries in your code.  Your Lambda function does not have any code to create all that text in the response.  It only has entries like `speak('Hi there.  Ask me to tell a joke!')` and the Alexa library has all the code to convert that into the elaborate JSON response that Alexa requires.  If you peek at the "JSON Reponse", however, you can see part inside of it that says `<speak>Hi there.  Ask me to tell a joke!</speak>`, which is what that specific code got turned into.
    1. Note that you your skill can't actually tell a joke yet -- the Lambda function doesn't know how to do it.  For instance, if one of your sample utterances was "make me laugh", try typing `make me laugh` in the "Type or click and hold the mic" box and hit Enter.  (If that wasn't one, put in a different one -- but something other than "tell me a joke").  Alexa should respond with "Sorry, I can't understand the command. Please say again."
        * If you look closely at the "JSON Input" box -- the request that Alexa sent to your skill -- the last block of text near the bottom should be a "request" with "type" set to "IntentRequest".  If Alexa recognized what you said, the intent "name" should be set to "TellMeAJokeIntent".  That means she figured out what you were trying to do, but the request failed because your Lambda just doesn't yet handle it.  If she did not understand your command, the intent "name" is probably set to "FallbackIntent" -- which means, "I heard something but I couldn't find an intent for it"
    1. If you want to try a couple other things that should work, try typing "help" or "stop" into the box and hitting Enter.  Though if you type "stop" and she says "Goodbye", then you'll need to type "open a green clown" again to get her back into your skill if you want to play around more.
1. If you have an Echo or other Alexa device, invite the Amazon account tied to your device to test the skill.  Otherwise, sign in to the simulator with your Amazon Developer account. (THIS PART NOT WRITTEN YET)
1. Test the Alexa skill from an Echo, or from the simulator (THIS PART NOT WRITTEN YET)

## Change the code for the Alexa skill

Congratulations!  Your first Alexa skill is working!

In the next section, we'll talk more about the code in the Alexa skill, what the different parts mean, and how to change it.  We'll do things like provide a list of jokes, and fix up the skill so that Alexa can actually tell them!

Later, we'll add knock-knock jokes where you have to have a back-and-forth conversation with Alexa to complete them.
