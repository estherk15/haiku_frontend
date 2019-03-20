# Haiku Builder: The Front End

This JavaScript Single Page Application was built to help poetry enthusiasts create haikus with greater ease! Through the incorporation of the Datamuse API, poets can enter any string of words and easily find an automated syllable count for each line in their haiku. Haiku Builder follows the convention of a three line haiku with the consecutive syllable structure 5, 7, 5.

#### Ex.

<!-- Insert an example of a haiku poem  -->

## Installation

Start crafting your own haikus! To begin, fork this repository and clone it to your hard drive. CD into the folder and if you're in your terminal, enter ```open index.html``` to get your app running. Or in your editor, right click on index.html, click on copy full path, and paste in a browser address bar.

In order to persist your poems, you will need fork and clone the Ruby on Rails backend located [here](https://github.com/estherk15/haiku_backend).

## Structure

The `index.html` file hold the structure of the app. An `src` folder contains the `index.js` file which holds the JavaScript and DOM manipulation logic.

## Using the Application

#### User Login  

When you first open the app, you should see a user drop-down with the option to create a new user. If this is your first time using this app, enter your desired username into the "Create a user" input field and submit.

<!-- Insert a gif of the user login page -->

#### User poems

After identifying yourself as an existing user or creating a new username, you should see the user poems section. You can type any combination of words and a syllable count will appear in the grey box at the end of each input field.
