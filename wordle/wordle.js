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
  currentWord = word
  currentHint = hint
}

var currentWord
var currentHint
var viewTheme = true

const getDict = async() =>{
  const res = await fetch("https://api.masoudkf.com/v1/wordle", {headers: {"x-api-key": "sw0Tr2othT1AyTQtNDUE06LqMckbTiKWaVYhuirv",},})
  const json = await res.json();
  const {dictionary} = json 
  getWordAndHint(dictionary)
}

const darkMode = () =>{
  let mainBody = document.body
  if (viewTheme){
    let navbar = document.querySelector("#topBar")
    navbar.style.borderBottom = "solid 1px #CACACA"
    mainBody.style.backgroundColor = "#252525"
    mainBody.style.color = "#FFFFFF"
    viewTheme = false
  }

  else{
    mainBody.style.backgroundColor = "#FFFFFF"
    mainBody.style.color = "#000000"
    viewTheme = true
  }
}

let letterList = []

const checkAnswer = () =>{

}

const fillTable = () =>{

}

function takeInput(){
  let letter = document.getElementById("input").value
  if (letter.match(/[a-zA-z]/) != null && letter.length == 1){
    console.log(letter)
  }

  else if (letter.toLowerCase() == "backspace"){
    
  }
  
}



