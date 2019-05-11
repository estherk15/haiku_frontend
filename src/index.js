const userEndpoint = `http://localhost:3000/api/v1/users`
const poemEndpoint = "http://localhost:3000/api/v1/poems"
const newUserContainer = document.querySelector("#new-user-container")
const newPoemContainer = document.querySelector("#new-poem-container")
const userPoemContainer = document.querySelector("#user-poem-container")
const selectContainer = document.querySelector("#select-user-container")
const dropdown = document.querySelector("#user-select-container")
const newPoemForm = document.querySelector("#new-poem-form")
const newPoemLine = document.querySelectorAll("#new-poem-line")
const loginDropdown = document.querySelector("#user-dropdown")
// const allContainer = document.querySelectorAll(".container")
let currentUserId //This variable allows you to pull user ID from dropdown so you can associate with the new poem you submit

//Invocation will toggle the user poem display to be visible, and the landing page to be hidden.
function displayPoemContainers () {
  userPoemContainer.style.display = "block"
  newPoemContainer.style.display = "block"
  newUserContainer.style.display = "none"
  selectContainer.style.display = "none"
}

function displayUserLogin() {
  newUserContainer.style.display = "none"
  selectContainer.style.display = "block"
}

function displayNewUserForm() {
  newUserContainer.style.display = "block"
  selectContainer.style.display = "none"
}

function fetchSyllableCount (event) {
      // Init a timeout variable to be used below
    var timeout = null;

    // Listen for keystroke events
    textInput.onkeyup = function (e) {

        // Clear the timeout if it has already been set.
        // This will prevent the previous task from executing
        // if it has been less than <MILLISECONDS>
        clearTimeout(timeout);

        // Make a new timeout set to go off in 800ms
        timeout = setTimeout(function () {
            console.log('Input Value:', textInput.value);
        }, 500);
    };

  const line = event.target.value.split(" ")

  //after a second after you've finished typing into the field,

  // const line1 = newPoemForm.line1.value.split(" ")
  // const line2 = newPoemForm.line2.value.split(" ")
  // const line3 = newPoemForm.line3.value.split(" ")
  // const sumContainer1 = document.querySelector("#line1-syllableCount")
  // const sumContainer2 = document.querySelector("#line2-syllableCount")
  // const sumContainer3 = document.querySelector("#line3-syllableCount")

  //*******************************************************************************************

  // Event listener should listen for an input in each line, not the overall div
  // If there is any input in that line then get the syllable count, else, nothing.

  const syllableCount = (word) => { //fn returns a promise of the syllable count of one word
    if(word.length > 0){ //prevents "" from counting as a syllable
      return fetch(`https://api.datamuse.com/words?max=1&sp=${word}&qe=sp&md=s`)
      .then(response => response.json())
      .then(wordData => wordData[0].numSyllables)
    }
    return 0
  }


  //
  // let pr1 = line1.map((word) => { //returns array of syllable count fetches
  //   return syllableCount(word)
  // })
  //
  // let pr2 = line2.map((word) => {
  //   return syllableCount(word)
  // })
  //
  // let pr3 = line3.map((word) => {
  //   return syllableCount(word)
  // })

  // Promise.all(pr1)
  // .then((arraySyllableCounts) => { //adds up all the syllable counts
  //   return arraySyllableCounts.reduce((acc, el) => {
  //     return acc + el
  //   })
  // })
  // .then(sumValue => { //takes the sum from the former promise and places it in the innerHTML
  //   sumContainer1.innerHTML = `<span class="input-group-text">${sumValue}</span>`
  // })
  //
  // Promise.all(pr2)
  // .then((arraySyllableCounts) => {
  //   return arraySyllableCounts.reduce((acc, el) => {
  //     return acc + el
  //   })
  // })
  // .then(sumValue => {
  //   sumContainer2.innerHTML = `<span class="input-group-text">${sumValue}</span>`
  // })
  //
  // Promise.all(pr3)
  // .then((arraySyllableCounts) => {
  //   return arraySyllableCounts.reduce((acc, el) => {
  //     return acc + el
  //   })
  // })
  // .then(sumValue => {
  //   sumContainer3.innerHTML = `<span class="input-group-text">${sumValue}</span>`
  // })
}

//Formats poems into traditional three lines
const poemFormat = (poemObj) => {
  return poemObj.content.split("-").join("</br>")
}

//dropdown with all existng user from db
fetch(userEndpoint)
  .then(response => response.json())
  .then(userData => {
    userData.forEach(user => {
      dropdown.innerHTML +=
        `<option value="${user.id}">${user.name}</option>`
    })
  })

// When the user identifies themselves as an existing user/new user, the proper form should appear in the jumbotron below the Haiku
loginDropdown.addEventListener("change", (event) => {
  if (event.target.value === "Existing User") {
    displayUserLogin()
  } else if (event.target.value === "New User") {
    displayNewUserForm()
  }
})

//when you click on a user, their existing poems will display on the page
dropdown.addEventListener("change", (event) => {
  currentUserId = parseInt(event.target.value)

  fetch(userEndpoint + "/" + `${currentUserId}`)
    .then(response => response.json())
    .then(poemsData => {
      // fn switches toggles between login and user page
      displayPoemContainers()
      poemsData.poems.forEach(poem => {
        userPoemContainer.innerHTML +=

          `    <div class="card" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">${poem.title}</h5>
                  <p class="card-text">${poemFormat(poem)}</p>
                </div>
              </div>`
      })
    })
})

//create a new user and persist to rails backend, show the new poem form, hide the initial forms
// This section will have to change because you no longer require the user ID prior to the use of the haiku builder
newUserContainer.addEventListener("submit", (event) => {
  event.preventDefault()
  const newUserInput = event.target.name.value

  displayPoemContainers()

  fetch(userEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({ name: newUserInput })
  })
  .then(response => response.json())
  .then(newUserData => currentUserId = newUserData.id)
})

//save a new poem to user
newPoemContainer.addEventListener("submit", (event) => {
  event.preventDefault()
  const title = event.target.title.value
  const line1 = event.target.line1.value
  const line2 = event.target.line2.value
  const line3 = event.target.line3.value
  const content = line1 + "-" + line2 + "-" +line3

  fetch(poemEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      title: title,
      content: content,
      user_id: currentUserId
    })
  })
  .then(response => response.json())
  .then(poemData => {
    const poemLines = poemData.content.split("-")
    const poemLinesPTag = poemLines.map(line => `${line}</br>`).join("")
    userPoemContainer.style.display = "block" //if this is the first poem, you have to set the display to block so you can see the poem <div>

    userPoemContainer.innerHTML +=
      `<div class="" data-id=${poemData.id}>
        <div><strong> ${poemData.title}</strong></div>
        <div>${poemLinesPTag}</div>
      </div>
      `
      `    <div class="card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">${poem.title}</h5>
              <p class="card-text">${poemFormat(poem)}</p>
            </div>
          </div>`
  })
  event.target.reset() //resets all the input to original placeholders
})



//Makes an API pull to get the syllable count for each line
newPoemLine.forEach(line => { //newPoemLine is node array of all input lines.
  let timeout = null

  line.addEventListener("keyup", (event) => { //once I input a value onto the input field
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      fetchSyllableCount()
    }, 500)
  })
})

//ToDo:
//Refactor the code so that you're only calling one function for the three lines.
//Find a way to display all poems broken up into traditional 3 line views
//CSS break up the page so that you can see all your poems and the new haiku form side by side
