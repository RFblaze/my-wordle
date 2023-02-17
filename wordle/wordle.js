// remove this line
// it's just here to shows it works
// window.alert("works!");

const getWordAndHint = (dictionary) =>{
  const N = Object.keys(dictionary).length
  const randomNum = Number.parseInt(Math.random() * N)
  const wordAndHint = dictionary[randomNum]
  console.log(wordAndHint)
  const {word} = wordAndHint
  const {hint} = wordAndHint
  currentWord = word.toLowerCase()
  currentHint = hint
}

var currentWord
var currentHint
var viewTheme = true
var viewInstr = false

var currentBoxIndex = 0
var letterList = []
var currentRow = 0
var numOfTries = 0

const getDict = async () =>{
  const res = await fetch("https://api.masoudkf.com/v1/wordle", {headers: {"x-api-key": "sw0Tr2othT1AyTQtNDUE06LqMckbTiKWaVYhuirv",},})
  const json = await res.json();
  const {dictionary} = json 
  getWordAndHint(dictionary)
}

window.onload = () =>{
  document.getElementById("input").focus()
  getDict()
}

const darkMode = () =>{
  let mainBody = document.body
  if (viewTheme){
    let navbar = document.querySelector("#topBar")
    navbar.style.borderBottom = "solid 1px #CACACA"
    let buttons = document.getElementsByClassName("topButto")
    
    for(let button of buttons){
      button.style.color = "#FFFFFF"
    }

    let inputBox = document.getElementById("input")
    inputBox.style.color = "#FFFFFF"
    
    let instructions = document.getElementById("instructions")
    instructions.style.borderLeft = "solid 1px #FFFFFF"

    let tableRows = document.getElementsByTagName("td")

    document.getElementById("bottomText").style.color = "black"

    for(let row of tableRows){
      row.style.color = "#FFFFFF"
      row.style.border = "solid 1px #FFFFFF"
    }

    mainBody.style.backgroundColor = "#333"
    mainBody.style.color = "#FFFFFF"

    viewTheme = false
  }

  else{
    let navbar = document.querySelector("#topBar")
    navbar.style.borderBottom = "solid 1px #252525"
    let buttons = document.getElementsByClassName("topButto")
    
    for(let button of buttons){
      button.style.color = "#000000"
    }

    let inputBox = document.getElementById("input")
    inputBox.style.color = "#000000"
    
    let tableRows = document.getElementsByTagName("td")

    let instructions = document.getElementById("instructions")
    instructions.style.borderLeft = "solid 1px #252525"

    for(let row of tableRows){
      row.style.color = "#000000"
      row.style.border = "solid 1px #000000"
    }

    mainBody.style.backgroundColor = "#FFFFFF"
    mainBody.style.color = "#000000"

    viewTheme = true
  }
}

const showHint = () =>{
  let hintSection = document.getElementById("bottomText")
  hintSection.innerHTML = `Hint: ${currentHint}`
  hintSection.style.display = "block"
}

const showInstr = () =>{
  let instructions = document.getElementById("instructions")
  if (!viewInstr){
    instructions.style.display = "block"
    viewInstr = true
  }
  else{
    instructions.style.display = "none"
    viewInstr = false
  }
}

const fail = () =>{
  let answerSection = document.getElementById("bottomText")
  answerSection.style.backgroundColor = "#FF6060"
  answerSection.style.display = "block"
  answerSection.innerHTML = `You missed the word ${currentWord} and lost!`
}


const congrats = () =>{
  let gameBody = document.getElementById("game")
  let gameTable = document.getElementsByTagName("table")
  gameTable[0].style.display = "none"
  let inputBox = document.getElementById("input")
  inputBox.style.display = "none"

  let instructions = document.getElementById("instructions")
  instructions.style.display = "none"

  let victoryGif = document.createElement("img")
  victoryGif.src = "congrats_fkscna.gif"
  victoryGif.style.width = "360px"
  victoryGif.style.height = "360px"
  gameBody.appendChild(victoryGif)

  let answerSection = document.getElementById("bottomText")
  answerSection.style.backgroundColor = "rgb(90, 230, 90)"
  answerSection.style.display = "block"
  answerSection.innerHTML = `You answered the word ${currentWord} correctly!`
}



const checkAnswer = () =>{
  let allBoxes = document.getElementsByTagName("td")
  let currentIndex = currentRow * 4
  let greens = 0
  console.log("chekking")
  let i = currentIndex
  for (let char of letterList){
    if (currentWord.includes(char)){
      if(currentWord.indexOf(char) == letterList.indexOf(char)){
        allBoxes[i].style.backgroundColor = "green"
        console.log("Green")
        greens += 1
      }
      else{
        allBoxes[i].style.backgroundColor = "yellow"
        console.log("Yellow")
      }
    }
    else{
      allBoxes[i].style.backgroundColor = "#555555"
      console.log("Gray")
    }
    i += 1
  }
  letterList = []
  currentRow += 1
  numOfTries += 1
  console.log(greens)
  if (greens === 4){
    congrats()
  }

  else if (numOfTries === 4){
    fail() 
  }

}

const fillTable = (letter) =>{
  let allBoxes = document.getElementsByTagName("td")
  let numOfBoxes = allBoxes.length
  letterList.push(letter)
  capitalLetter = letter.toUpperCase()

  allBoxes[currentBoxIndex].append(capitalLetter)
  currentBoxIndex += 1
}

// const deleteTable = () =>{
//   currentBoxIndex -= 1
//   let allBoxes = document.getElementsByTagName("td")
//   letterList.pop()
//   console.log(allBoxes[currentBoxIndex])
//   allBoxes[currentBoxIndex].innerHTML = "";
// }

document.addEventListener("keyup", (event) => {
  if (event.key === "Enter" && letterList.length === 4){
    checkAnswer()
  }

  else if (event.key === "Enter" && letterList.length != 4){
    window.alert("You must complete the word first")
  }
})

const takeInput = () => {
  let inputBox = document.getElementById("input")
  let letter = inputBox.value
  inputBox.value = ""
  if (letter.match(/[a-zA-z]/) != null && letter.length == 1){
    console.log(letter)
    fillTable(letter)
  }
  else if (letter.toLowerCase() == "backspace"){
    letterList.pop()
  }
  
  return
}
