# Build and run your first Lambda function
* **Goal:** To set up all your development tools, most of the needed accounts, and build, upload, and run your first Lambda.
* **Time Frame:** This part of the tutorial typically takes several hours.  There is a lot of first-time setup!
* **Afterward:** The next step is to set up the Alexa side of things to call your Lambda, then test your skill from Alexa.

## Local Machine Setup
1. To run Terminal, which you'll need for many of the rest of these commands:
    1. Hit Command-Space and start typing `Terminal` and click `Terminal` when you see it in the list (or you can hit Enter if it's the first entry)
    1. When it opens a Terminal window, you can type `echo "Hello"` and then Enter to make sure it's working
    1. As a side note, one of the original developer operating systems was UNIX.  One of the original command-line interfaces on UNIX was the Bourne shell.  (The "shell" is the thing that handles your typed commands in Terminal.)  When someone later decided to make a better shell than the Bourne shell, they called it the Bourne Again SHell, or BASH.  Which is why you may see "bash" from time to time in Terminal.  The most comparable thing on Windows is PowerShell.
1. To set up the source control tool Git:
    1. Run `git` from Terminal -- if it prompts to install the developer tools, then do it
    1. Run `git config --global user.name "John Doe"` but with your real name instead of John Doe
    1. Run `git config --global user.email johndoe@example.com` but with your real e-mail instead of that example one.  Make sure you remember whether you use dots in the e-mail address or not.
    1. Run `git config --global core.autocrlf input` to configure line endings (Windows and Mac/Linux use different characters to indicate the end of a line)
    1. Run `git config --global core.editor "emacs"` (You may find the commands for Emacs to be obscure now, but you'll thank me later.  *At least half of that statement is true.*)
1. To set up a source control account on GitHub (the cloud side of Git that we'll use):
    1. Go to GitHub.com in your browser
    1. On the front page on the right side, you can create an account.  Put in a username that's not too arrogant or offensive (it is going to be public), the EXACT SAME e-mail address you set for Git above, and a good-quality password, then hit `Sign up for GitHub`
    1. I don't want to sign up for a fake account just to see the rest of this process, so I'll document it when the first one of you goes through it. 
1. To install the code editor Visual Studio Code:
    1. Google for VSCode
    1. Click the `Download for Mac` button
    1. Double-click the file it downloaded (you can use Finder and look in the `Downloads` directory on the left).  It should open a new Finder window 
    1. Move the app that it created to the `Applications` directory (you will need to enter an administrator password)
    1. Hit Command-Space and start typing `Visual` and click `Visual Studio Code` when you see it in the list (or you can hit Enter if it's the first entry)
        * If it asks whether you want to open it because it was downloaded from the Internet, hit `Open`
1. To install NVM to download and manage your versions of Node to run JavaScript apps on your machine:
    1. If Terminal is running but isn't showing, hold down `Command` and hit `Tab` (keep holding Command the whole time).  It will show icons for every app you have open.  Each time you hit `Tab` the highlight will move over to the next app in the list.  When it's on Terminal, let go of the keys and Terminal should pop to the front.
    1. Run `ls ~/.bash*` from Terminal.  If you don't see `.bash_profile` or `.bashrc` then run `touch .bash_profile` from Terminal
    1. Google for NVM
    1. On the main NVM page, scroll down past the file listing until you get to the installaltion instructions
    1. Copy and paste the install command on the NVM page into Terminal and then hit Enter to install NVM
    1. Still in Terminal, hit `Command-N` to open a new Terminal window so it will see NVM.  (You can close the old Terminal window.)
    1. Run `nvm install lts/carbon` from the new terminal window
1. To install Homebrew (must be done as administrator), which will let you install additional software:
    1. Google for Homebrew (all one word)
    1. Go to the result for the Mac package manager (not an alcoholic beverage), and copy and paste the install command there into a Terminal window to start the install
        * Remember, that must be done as an administrator.  If it doesn't work, get an administrator to open their account and do it for you.
    1.  The Homebrew install may take some time
1. Install the AWS Command-Line Interface (CLI) that you'll use for your machine to control stuff in AWS
    1. Run `brew install awscli` from Terminal.  This will install the AWS CLI tool using Homebrew, which is a million times easier than trying to sort out the PIP/Python procedure they provide on the official installation page (given the oddball versions of Python on macOS)
        * This may take some time, especially if you're on an older version of macOS
    1. Run `aws` from Terminal and make sure it doesn't complain that the command wasn't found

## AWS Account Setup
1. Google for `AWS Console` and go there
1. Click `Create a free account`
1. Complete the account setup.  You will need an **e-mail address**, **credit card**, and working **cell phone** to receive a call
1. Once the account is set up, go back to the AWS Console if needed, and click `Sign In to the Console`
1. Under `Find services` type `IAM` and then click the IAM entry.  This is the "Identity and Access Management" section, where you create users and groups and permissions that things need to run.
1. Create a user with permissions to run the AWS Command-Line Interface (CLI).  This user will have Administrator permissions for your AWS account, so it is a "CLI Administrator".  Here's how:
    1. Click `Users` on the left then the `Add user` button on top
    1. Put in a name like `CLIAdmin` and check the box for `Programmatic access`
    1. Hit `Next: Permissions`
    1. Hit `Create group`
    1. Put in the Group name of `Administrators` and click the box to the left of `AdministratorAccess`
    1. Hit `Create group`
    1. Check the box to the left of `Administrators` and hit `Next: Tags`
    1. Hit `Next: Review`
    1. **Be Careful**: you must not leave the next screen before finishing the following steps!  Do not hit the forward/back buttons or close the browser window or reload the page or anything!
    1. Hit `Create user` and leave that screen open
    1. In Terminal, run `aws configure`
    1. When it asks for the AWS Access Key ID, copy and paste the visible Access Key ID from the browser window into Terminal (Command-C to copy, Command-V to paste).  Make sure you get the whole thing (from first character to last), and hit Enter
    1. When it asks for the AWS Secret Access Key, hit the "show" link on the browser window, to the right of where the Access Key ID was.  It should automatically highlight the Secret Access Key for you to hit Command-C, but if not, highlight it yourself and copy it.  Paste it into the terminal window.  Make sure the whole thing is there and then hit Enter.
    1. When it asks for the default region, enter `us-east-1` and hit Enter.
    1. Just hit Enter for the default output format question.
    1. In Terminal, run `aws iam list-groups` and make sure it doesn't complain (it should show some data including the 
    "GroupName" of "Administrators" for the group that you create a moment ago)
1. Create a Role with the permissions that your Lambda will need to run
    1. Click `Roles` on the left side of the IAM browser window (we're done with the user screen you were supposed to be careful with)
    1. Click `Create role`
    1. Click `Lambda` then `Next: Permissions`
    1. In the "Search" box next to "Filter policies" enter `lambda`
    1. Check the box to the left of `AWSLambdaBasicExecutionRole`
    1. Click `Next: Tags` then `Next: Review`
    1. Enter `AlexaLambda` for the Role Name and then hit `Create role`

## Project Setup
1. Make your own copy of the starter code:
    * I would like you to be able to save your changes to the cloud so they can't be lost.  Also, sending code back and forth to GitHub is a part of programming you should get used to.  However, there are a number of people using this tutorial.  If you all saved your changes back to MY ORIGINAL repository (a "repository" is the place that holds code for a project), it would quickly get to be a mess.  Instead, I'll have you copy it to a repository of your own, and work with that!  This is called making a "fork" of the original.
    1. In your browser, go to GitHub.com and sign in if you haven't already.
    1. Visit the original page for this project: https://github.com/ammulder/AlexaJokes
    1. Click `Fork` in the top-right corner.  After a few moments, you should be at a screen that include something like this on top:
    ```
    YourUserName/AlexaJokes
    forked from ammulder/AlexaJokes
    ```
    4. Now you have your own copy of the "AlexaJokes" starter code in a repository of your own.  You can change those files and save them without altering the original ones, and you own't get anyone else's changes interfering with yours.
1. Copy the starter code from your GitHub repository to your local machine:
    1. In Terminal, create a directory to hold your coding projects.  I recommend calling it `dev` because it's shorter to type than `development` or `code` or `projects` or whatever, but you can pick the name you like.  Run something like `mkdir dev` (mkdir creates a directory, and whatever you type after it will be the name of the directory.  Don't use spaces in the name at this point.)
    1. Go to the new directory with `cd dev` (cd is "change directory", and you give it the name of the directory you want to go to)
    1. Use the Git command Clone to copy a code repository from the cloud to your machine.  It will remember where this code came from and let you synchronize to or from the cloud any time you want (more or less).  First, you need to get the address to clone.  If you still have your GitHub window open in the browser, go there.  Otherwise, start at GitHub.com and sign in and click `YourUserName/AlexaJokes` on the left under "Repositories"
    1. Click the `Clone or Download` button on the right side
    1. The small screen that pops up has a text field with something like `https://github.com/...` in it.  Click the icon to the right of that (an arrow pointing into a clipboard) to copy that address (as if you selected it all and hit Command-C).
    1. Go back to Terminal and enter `git clone ` and then a space and then hit `Control-V` to paste in the URL to your repository.  It should look something like `git clone https://github.com/YourUserName/AlexaJokes.git`  Then hit Enter.
    1. That should copy the code from your AlexaJokes repository on GitHub to a new directory called "AlexaJokes" on your machine.
        * NOTE: It technically created a whole source code repository on your local machine.  We'll get to that later.  What's important now is that it copied all the code and configuration files.
    1. You can rename that directory by running something like `mv AlexaJokes alexa` (mv means "move" or "rename" -- the first thing after that is the old name, and the second thing is the new name, so this would change the name of AlexaJokes to just "alexa" to be shorter.  You can pick whatever name you like, or just leave it as AlexaJokes, but don't try to use spaces in the name yet.)
    1. Change to the directory that you just put the code in -- you can type `cd Ale` (or `cd` then a space and then the first couple letters of the name you gave it) and then hit `Tab`.  Tab is the auto-complete character in Bash.  If the first few letters you typed were enough to uniquely identify a program or file or directory, it will finish the name for you.  If not, it will do nothing, and you can hit tab again to see a list of all matching options.  It is much quicker to use Tab than to type out entire directory names.  When you hit it this time after A-l-e, it should have changed the command you're entering from `cd Ale` to `cd AlexaJokes` -- and then you can hit Enter.
    1. Try tab-completion to change to the "lambda" directory inside AlexaJokes -- for instance `cd la[TAB] [ENTER]` to change to the `lambda` directory
    1. Try running `pwd` to "print working directory" see the name of the current directory you're in.  It might be something like `/Users/YourUserName/dev/AlexaJokes/lambda`
1. Download and install the libraries you need to work with this code
    1. In Terminal, make sure you're in the lambda directory, within the `AlexaJokes` project.  Remember, you can use `pwd` to check.
    1. Run `nvm use` to set the version of Node you want to work with.  Node is what we need to work with JavaScript and TypeScript projects, which is what we'll be using for this.  This NVM command should say `Found ... with version <lts/carbon>` and then `Now using node v8.11.2 (npm v5.6.0)` or something similar.
        * NOTE: this only worked because the initial code you copied included a file called `.nvmrc` with the version of node listed that you should use.  We picked `lts/carbon` which refers to the 8.x Long-Term-Support version of Node, and best matches what the Lambda will run in when sent to AWS.  Remember, we previously ran `nvm install lts/carbon` to make sure we had that version installed on our machine.
    1. Run `npm install` to download the libraries we need, and the libraries THEY need, and then libraries THEY need... Every modern project is built by taking advantage of hard work that other people have done -- which means using these libraries that hold other people's code.  For instance, we use one that knows how a program can use AWS features, and one that knows how to run in AWS Lambda, and one that knows how to handle Alexa requests.  Installing the libraries will take a minute.  There will be WARN messages... ignore them for now.
        * NOTE: this only worked because the initial code you copied included a `package.json` file listing the libraries we need.  For future projects, you might need to create that yourself... but this time I've done that much for you.
    1. Run `npm install -g gulp` to install a "global" version of Gulp.  That means you'll be able to run Gulp from *any project* that uses this particular version of Node.  Gulp is the helper tool that we will use to check that our code is correct and do things like send our code to AWS.
 1. Set up the project
    1. Run `gulp lambda:init` to create the most basic code and configuration to create an AWS Lambda function using the TypeScript language.
        * NOTE: this only worked because the code you copied included a `gulpfile.js` file that under the covers defined the `lambda:init` task.  And THAT only worked because the `package.json` includes a development-time dependency on a library called `aws-lambda-typescript`.  You can have a look at `package.json` by running `less package.json` in Terminal.  Use arrow keys to scroll and `Q` to quit.  ("less" is a file viewer that you can use to inspect any file from Terminal.)
    1. Make sure the code is working by running `gulp lambda:build`.  This will process it all and complain about any problems.  We're about to save our work to the cloud, and it's always best to make sure it works first!  That way other people you might be working with don't download bad code, which might prevent them from doing the work they're trying to do.
1. Save your work to the cloud        
    1. Run `git status` to check what the commands above have done to your code.  You should see five files listed under "Untracked files": `debug.js`, `index.ts`, `lambda-config.js`, `package-lock.json`, and `tsconfig.json`.  "Untracked" means that they're not in source control, so they won't be sync'd to GitHub.  Sometime you don't want a file in source control, but that's unusual -- in this case, we want to include those.
    1. Run `git add *.js *.ts *.json` to add all five files to source control.  Git add takes a list of files to add to source control.  In Bash, `*` is a wildcard, which matches any characters.  So `*.js` means "match any file whose name starts with any characters and ends with dot-j-s", which includes both `debug.js` and `lambda-config.js`.  You don't always WANT to use a wildcard -- you might not want to move, edit, or delete all those files at the same time -- but it saves time when you DO want to do something with a number of files at once.  Anyway, `git add *.js *.ts *.json` ends up producing a list like `debug.js gulpfile.js lambda-config.js index.ts package.json package-lock.json tsconfig.json tslint.json` and passes all those to `git add`.
        * NOTE: it added more files than just the five we meant -- there are a few others in that list.  But they were already in source control, and `git add` just ignores anything that's already been added.  So in this case, it's OK.
    1. Run `git status` again.  You should now see all five files listed as `new file:` instead of under `Untracked files`
    1. Run `git commit -a` (meaning, commit all).  "Commit" means "save, and remember how everything looked at this time".
    1. The commit command will have opened up a new screen to enter your commit message.  You are now in the Emacs text-file-editor (assuming you followed the directions way above).  You have to enter a message with each commit.  Type a message such as `Set up a Lambda using TypeScript`
    1. To save your commit message and exit Emacs all at once, type `Control-X` then `Control-C` to exit Emacs.  It will ask you whether you want to save (along the bottom of the window), and you should hit `y`.  (If you instead hit `n` it will note that you have unsaved changes -- "modified buffers" -- and ask whether you really want to quit.  Then you can type yes or no, depending.)
    1. When your commit completes successfully, you should see a message that shows what was done (5 files added, etc.) and has a copy of your commit message.  However, so far it has only saved these changes to your LOCAL Git repository -- that is, to the source control on your machine.
    1. Now that your local changes are saved, try sending them up to the cloud with `git push`.
        * NOTE: sometimes Git push doesn't work because the cloud has changes that aren't on your machine yet.  But that shouldn't happen yet when you're the only one working in this repository.
    1. To double-check that your changes went through, look at the GitHub repository in your Web browser.  If it's still open, great.  Otherwise go to GitHub.com and sign in if needed and then click the `AlexaJokes` repository in your repository list.
    1. Once you have your repository open in the browser, click the `lambda` directory in the file listing, and you should see your five new files there.

## Customize and run your first Lambda in AWS
1. Go to Visual Studio Code (or open it if it's not running)
1. Open the project:
    1. Hit `Open folder...` in blue text
    1. Select your username from the "Favorites" list on the left
    1. Navigate to `dev` and click the `AlexaJokes` directory and when AlexaJokes is highlighted in blue, hit `Open` (if you used other names for these directories, you'll need to select your names for them here)
1. Set up the first working version of an Alexa Lambda function:
    1. Open the `lambda` directory on the left (click it to show or hide its contents), and double-click `index.ts` to open in in an editor window on the right.
        * NOTE: If the file name in the tab above the edit area is in italics, you only single-clicked so you're only previewing it.  Double-click the name on the left so the file name in the tab is in regular text.
    1. You should see a file with about 9 lines of code.  It's a default Lambda handler, which is not useful to us because it doesn't work with Alexa.
    1. Open the `samples` directory on the left and click the `lambda-index.ts` file to open it on the right.  Click anywhere in it.
    1. Hit `Command-A` to "select all", then `Command-C` to copy all that text
    1. Click the tab labeled `index.ts` above the edit area to select that file.  Hit `Command-A` to select all the existing (bad) code, and `Command-V` to paste in the good code.
    1. You should see that the tab for `index.ts` above the edit area now has a little dot in it.  That indicates that the code HAS NOT BEEN SAVED.  Likewise, if you look at the top left of the VSCode window, you should see a `1` in a blue circle over the top of an icon with a couple papers.  That indicates that you have 1 UNSAVED FILE in your project.  Why am I making a big deal of this?  When you run Terminal commands, they WILL NOT SEE UNSAVED CODE.  This is bad, and it will drive you crazy that your code seems to be not working when you send it to AWS, and then you later discover that it was never saved.
    1. Hit `Command-S` to save the code.
    1. In fact, let's fix that right now:
        1. Go to the menu bar all the way at the top of your screen, and select `Code / Preferences / Settings`
        1. In the "Search Settings" box type `Save`
        1. Scroll down if needed until you see `Files: Auto Save` set to `off`
        1. Change it to `onWindowChange`.  That means you can save files by hand whenever you want, but also if you switch from the VSCode window to a Terminal window, any unsaved files will be saved automatically.  You'll always send the latest code to AWS.  Whew!
    1. Right now we just want to see this run.  We'll look through it in more detail and start making changes later.
1. Prepare to send the Lambda code to AWS to run there:
    1. Like we just did, copy the content of `lambda-config.js` under `samples` into the file `lambda-config.js` in the `lambda` directory.  
    1. In your browser window, Go to the AWS console.  If you don't have it up any more, Google for `AWS Console`, go there, and hit `Sign in to the console` or the text `Or sign in to the console`
    1. Go to IAM in the console.  If you're somewhere else, you can usually use the `Services` link in the top bar and type `iam` on the screen that comes up and click the link it offers to IAM.
    1. Hit Roles on the left.
    1. Click the link for the name of the Role you created earlier.  This should be something like `AlexaLambda`
    1. Copy the value for "Role ARN".  You can do this by clicking the icon for two pieces of paper, to the right of the ARN value (it should briefly say "Copied" when you do that).
    1. Go back to VSCode and the `lambda-config.js` file.  Paste the Role ARN in place of the value to the right of `role:`.  Make sure that there are single quotes around the Role ARN and a comma after the last quote after you paste the Role ARN in -- so either replace just the part inside the quotes, or replace the whole right side and then put the quotes and comma back.  It should look like this with a bunch of stuff in the middle in place of the "...":
    ```
      role: 'arn:aws:iam ... /AlexaLambda',
    ```
    1. As configured, your Lambda will be named "AlexaJokes". If you'd like something different, change the value for the `functionName` in that same file.  To make sure you don't use an invalid function name, use only letters and numbers in the name for now.  Make sure it ends up with single quotes around the name.  This time it doesn't need a comma at the end, because it is the last entry in the list.
1. Upload the Lambda!
    1. Run `gulp lambda:build` again, just to make sure everything is still working
    1. Run `gulp lambda:deploy` to send the code up to AWS.  Make sure you don't see anything that says "Error" in the output.
1. Configure and test the Lambda function:
    1. Go back to the AWS console.  Go to the "Lambda" area.  Remember, you can hit `Services` at the top, then start typing "lambda", and click `Lambda` when it suggests it to you
    1. When you get to Lambda, you want to be in `Functions` on the left.  If that's not already highlighted, click it.
    1. On the right, you should see the name of the function you configured in `lambda-config.js` -- which was `AlexaLambda` by default, but you may have changed it.  Click that Lambda name.
    1. In the `Designer` box under `Add triggers` click `Alexa Skills Kit`
    1. Under "Configure triggers" and "Skill ID verification", click `Disable`
    1. Click `Add`
    1. Click `Save` at the top right
    1. Hit `Command-R` to reload the page
    1. In the top "Designer" box, you should see a box for "Alexa Skills Kit"
    1. On the top next to "Text" click `Select a test event...` then `Configure test events`
    1. Under "Event template" select `Amazon Alexa Start Session`.  You can type "Alexa" into the search box if it helps to narrow down the list to find that one.
    1. Under "Event name" enter `AlexaStart` or `AlexaStartSession` (it doesn't allow spaces)
    1. Hit `Create`
    1. Hit the `Test` button near the top right
    1. Click `Details` in the green box.  You should see output including `<speak>Hi there.  Ask me to tell a joke!</speak>`  That shows that the Lambda itself is working, though it's not yet connected to Alexa.

## Set up Alexa 

Congratulations!  Your Mac is set up for development, and your Lambda function is working!

Next, we'll [Build your first Alexa skill](tutorial2.md), which includes configuring the skill, pointing it to your existing Lambda function, and testing it to make sure it's working.

Later, we'll work with the code of the skill to change it around and add more features.