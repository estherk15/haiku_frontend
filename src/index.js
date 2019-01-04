const userEndpoint = "http://localhost:3000/api/v1/users"
const poemEndpoint = "http://localhost:3000/api/v1/poems"
const newUserContainer = document.querySelector("#new-user-container")
const newPoemContainer = document.querySelector("#new-poem-container")
const userPoemContainer = document.querySelector("#user-poem-container")
const selectContainer = document.querySelector("#select-user-container")
const dropdown = document.querySelector("#user-select-container")
const newPoemForm = document.querySelector("#new-poem-form")
const allContainer = document.querySelectorAll(".container")
let currentUserId //This variable allows you to pull user ID from dropdown so you can associate with the new poem you submit

function displayPoemContainers () {
  userPoemContainer.style.display = "block"
  newPoemContainer.style.display = "block"
  newUserContainer.style.display = "none"
  selectContainer.style.display = "none"
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

//when you click on a user, their existing poems will display on the page
dropdown.addEventListener("change", (event) => {
  currentUserId = parseInt(event.target.value)

  fetch(poemEndpoint)
    .then(response => response.json())
    .then(poemsData => {
      const userPoems = poemsData.filter(poem => poem.user.id == event.target.value)
      // allContainer.forEach(container => container.style.display = "none")
      // userPoemContainer.style.display = "block"
      // newPoemContainer.style.display = "block"
      displayPoemContainers()

      userPoems.forEach(poem => {
        userPoemContainer.innerHTML +=
          `<div class="" data-id=${poem.id}>
            <div><strong> ${poem.title}</strong></div>
            <div>${poem.content}</div>
          </div>
          `
      })
    })
})

//create a new user and persist to rails backend, show the new poem form, hide the initial forms
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
      .then(response => response.json())
      .then(newUserData => currentUserId = newUserdata.id)
  })
})

newPoemContainer.addEventListener("submit", (event) => {
  event.preventDefault()
  const title = event.target.title.value
  const line1 = event.target.line1.value
  const line2 = event.target.line2.value
  const line3 = event.target.line3.value
  const content = line1 + line2 + line3

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
  .then(poemData => console.log(poemData))
})

//make an API pull to get the syllable count for each line
newPoemContainer.addEventListener("input", (event) => {
  const line1 = newPoemForm.line1.value.split(" ")
  const line2 = newPoemForm.line2.value.split(" ")
  const line3 = newPoemForm.line3.value.split(" ")
  const sumContainer1 = document.querySelector("#line1-syllableCount")
  const sumContainer2 = document.querySelector("#line2-syllableCount")
  const sumContainer3 = document.querySelector("#line3-syllableCount")
  let line1Sum
  let line2Sum
  let line3Sum

  const syllableCount = (word) => { //returns a promise of the syllable count of one word
    return fetch(`https://api.datamuse.com/words?max=1&sp=${word}&qe=sp&md=s`)
      .then(response => response.json())
      .then(wordData => wordData[0].numSyllables)
  }

  let pr1 = line1.map((word) => {
    return syllableCount(word)
  })

  let pr2 = line2.map((word) => {
    return syllableCount(word)
  })

  let pr3 = line3.map((word) => {
    return syllableCount(word)
  })


  Promise.all(pr1)
  .then((arraySyllableCounts) => {
    return arraySyllableCounts.reduce((acc, el) => {
      return acc + el
    })
  })
  .then(sumValue => {
    sumContainer1.innerHTML = `<span class="input-group-text">${sumValue}</span>`
  })

  Promise.all(pr2)
  .then((arraySyllableCounts) => {
    return arraySyllableCounts.reduce((acc, el) => {
      return acc + el
    })
  })
  .then(sumValue => {
    sumContainer2.innerHTML = `<span class="input-group-text">${sumValue}</span>`
  })

  Promise.all(pr3)
  .then((arraySyllableCounts) => {
    return arraySyllableCounts.reduce((acc, el) => {
      return acc + el
    })
  })
  .then(sumValue => {
    sumContainer3.innerHTML = `<span class="input-group-text">${sumValue}</span>`
  })




  // line2Sum = Promise.all(pr2)
  // .then((arraySyllableCounts) => {
  //   return arraySyllableCounts.reduce((acc, el) => {
  //     return acc + el
  //   })
  // })
  //
  // line3Sum = Promise.all(pr3)
  // .then((arraySyllableCounts) => {
  //   return arraySyllableCounts.reduce((acc, el) => {
  //     return acc + el
  //   })
  // })
  //
  //
  // sumContainer2.innerHTML = `<span class="input-group-text">${line2Sum}</span>`
  // sumContainer3.innerHTML = `<span class="input-group-text">${line3Sum}</span>`



})

//you commented out the forms in HTML to figure out if you could reach the count in the word api.

// const syllableCount = (word) => { //returns a promise of the syllable count of one word
//   return fetch(`https://api.datamuse.com/words?max=1&sp=${word}&qe=sp&md=s`)
//     .then(response => response.json())
//     .then(wordData => wordData[0].numSyllables)
// }
//
// let promisesArray = (words) => { //returns an array of promises for syllable count of each word
//   words.map((word) => {
//     return syllableCount(word)
//   })
// }
//
// let pr1 = promisesArray(line1) //array of promises of syllable count for each line
// let pr2 = promisesArray(line2)
// let pr3 = promisesArray(line3)
//
// let sumSyllableCount = Promise.all(promisesArray) //returns sum of syllable counts
//     .then((arraySyllableCounts) => {
//       return arraySyllableCounts.reduce((acc, el) => {
//         return acc + el
//       })
//     })
//
// let sum1 = sumSyllableCount(pr1)
// console.
