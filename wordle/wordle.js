// remove this line
// it's just here to shows it works
// window.alert("works!");



const getWord = (dictionary) =>{
  const N = Object.keys(dictionary).length
  const randomNum = Number.parseInt(Math.random() * N)
  
  console.log(randomNum)
}



const getDict = async() =>{
  const res = await fetch("https://api.masoudkf.com/v1/wordle", {headers: {"x-api-key": "sw0Tr2othT1AyTQtNDUE06LqMckbTiKWaVYhuirv",},})
  const json = await res.json();
  const {dictionary} = json 
  console.log(dictionary)
  getWord(dictionary)
}



  const darkMode = () =>{
    let body = document.body
    if (body.getPropertyValue("background-color") === "#FFFFFF"){
      document.body.style.backgroundColor = "#252525";
      document.body.style.color = "#FFFFFF";
    }
  }


