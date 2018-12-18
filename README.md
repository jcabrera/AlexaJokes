# Tutorial: Building an Alexa skill on a Mac
In this tutorial, we're going to build and run an Alexa app (called an "Alexa skill").  By request, this first skill will tell jokes.  (Though Alexa can already do that, you'll be able to make a list of just your favorites.)  In the process, you'll learn what you need to build other, more unique skills.

We'll build this skill using TypeScript, which is basically a variation of JavaScript.  It has some advantages over "plain JavaScript" that make your first programs easier to get right.  But know that TypeScript and JavaScript are quite similar, and use many of the same tools.

We will run the skill in Amazon Web Services -- specifically AWS Lambda, which is free for our kind of use, as well as being (relatively) easy to set up with Lambda.  We'll talk more about AWS and Lambda later.

## What you need in order to follow this tutorial

- A Mac, with macOS 10.11 El Capitan or newer (and Internet access)
- An e-mail address
- A credit card
- A working cell phone
- An interest in programming
- *An Echo or other Alexa device is nice-to-have, but there's an online
simulator if you don't have one*

**NOTE 1:** The credit card part is because the Alexa skill runs in Amazon Web Services (AWS). This tutorial will only do things that are free, but you need to provide a credit card and accept a phone call in order to open the account. (And, to be completely transparent, someone could rack up charges by doing things in AWS that are not covered by this tutorial. Some level of discretion is necessary.)

**NOTE 2:** You don't need to know JavaScript or TypeScript coming in (though you must be willing to learn).  You don't need to have your machine set up with any particular apps or features -- we'll install everything you need as part of the tutorial.

## Start the tutorial!

1. Start by looking at the [Overview of an Alexa skill](OVERVIEW.md)
1. Next, follow the steps to [Run your first Lambda](tutorial1.md), which includes installing all the tools you need to develop a Lambda, and generating, customizing, and testing this initial code.  *This will typically take several hours.*
1. Next, follow the steps to [Build your first Alexa skill](tutorial2.md), which includes configuring the skill, pointing it to your existing Lambda function, and testing it to make sure it's working.  *This will probably take at least an hour.*
1. Coming soon: **Update the code for the Alexa skill**  In this part of the tutorial we'll talk more about the code in the Alexa skill, what the different parts mean, and how to change it.  We'll do things like provide a list of jokes, and fix up the skill so that Alexa can tell them.