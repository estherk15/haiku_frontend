# To Do:

**ReadMe**
- Take a screen shot of an example haiku to include in the read me.
- Demo gif of each component of the haiku app.
- What else needs to be in the ReadMe?

**Styling**
- Get the poems to show up in each card.
- line up each card in a fixed scroll on the side?
- Make the syllable box bigger?
- Make the syllable counter reset to empty if the input fields are empty.
- put more space between the new poem form and the existing user poem container

**App Decisions**
<!-- - Do you need a user login page?
- Can you keep the app simpler with a syllable counter without user info?
- If a user submits a poem, they must be a user? In order to have CRUD capabilities. Switch the user flow so that the haiku builder is accessible outside of a login, then 21Mar-->
- Refactor functions to so that you're not recalling same function three different times.
- Get rid of the user sign in function and just have a poems model in the backendß


<!-- - You changed the display style for the user login and the user poem sections, but you have to change the logic so that the event listener is on the user dropdown and the forms appear whtn you click on the specific user(existing/new) 21Mar-->
- Then you also need to add an event listener to the submit button, if the user is not logged in, they get an alert that says they need to login.
- The syllable counter turns to 1 when you enter a title

- create custom route so you can access the current user's poems instead of filtering through all poems.
