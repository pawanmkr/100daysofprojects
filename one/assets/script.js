const questions = [
  {
    questionText: "Commonly used data types DO NOT include:",
    options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    answer: "3. alerts",
  },
  {
    questionText: "Arrays in JavaScript can be used to store ______.",
    options: [
      "1. numbers and strings",
      "2. other arrays",
      "3. booleans",
      "4. all of the above",
    ],
    answer: "4. all of the above",
  },
  {
    questionText:
      "String values must be enclosed within _____ when being assigned to variables.",
    options: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
    answer: "3. quotes",
  },
  {
    questionText:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    options: [
      "1. JavaScript",
      "2. terminal/bash",
      "3. for loops",
      "4. console.log",
    ],
    answer: "4. console.log",
  },
  {
    questionText:
      "Which of the following is a statement that can be used to terminate a loop, switch or label statement?",
    options: ["1. break", "2. stop", "3. halt", "4. exit"],
    answer: "1. break",
  },
];

let score = 0;
let seconds = 50;
let yourName = "";
let decrease;

const time = document.querySelector(".time-left");
const startCard = document.querySelector(".starter-card");
const questionCard = document.querySelector(".question-card");
const qLabel = document.querySelector(".questionLabel");
const options = Array.from(document.querySelectorAll(".options"));
const alert = document.querySelector(".alert");
const finalScore = document.querySelector(".final-score");
const highScore = document.querySelector(".high-score");
const clearScore = document.querySelector(".clear-score");
const scoreField = document.querySelector(".score");
const leaderBoard = document.getElementById("leaderboard");
const submitButton = document.querySelector(".submit-btn");
const domname = document.getElementById("name");
const content = document.querySelector(".content");
const back = document.querySelector(".back-btn");

function endQuiz() {
  questionCard.classList.add('qsvisible');
  finalScore.classList.remove('fcvisible');
  highScore.classList.add("hsvisible");
  scoreField.innerText = score;
  clearInterval(decrease);
}

function loadQuestion(number) {

  console.log("in the loadquestion initial is " +  initial);

  if(number < 5 && seconds > 0) {
    startCard.classList.add("scvisible");
    questionCard.classList.remove("qsvisible");

    qLabel.innerText = questions[number].questionText;
    let optionNumber = 0;

    options.forEach((option)=> {
      option.innerText = questions[number].options[optionNumber];
      optionNumber++;
    });
  }
  else {
    endQuiz();
  }

}

let initial = 0;
const startButton = document.querySelector(".start-btn");

startButton.addEventListener('click', () => {
  loadQuestion(0);

  decrease = setInterval(() => {
    if(seconds > 0) {
      seconds -= 1;
      time.innerText = "Time: " + seconds + "s";
    }
    else {
      clearInterval(decrease);
      endQuiz();
    }
  }, 1000)


  options.forEach((option)=> {
    option.addEventListener('click', () => {

      if(option.innerText === questions[initial].answer) {
        alert.innerText = "Correct!";
        score += 1;
      }
      else {
        alert.innerText = "Incorrect!";
        seconds -= 10;
      }
      
      initial++;
      loadQuestion(initial);
      
    })
  });

});

function showHighScore () {
  startCard.classList.add("scvisible");
  questionCard.classList.add('qsvisible');
  finalScore.classList.add("fcvisible");
  highScore.classList.remove("hsvisible");

  for (let i = 2; i <= localStorage.length; i++) {
    const scoreBoard = document.createElement("li");
    content.appendChild(scoreBoard);

    scoreBoard.innerText = localStorage[i];
  }
}

leaderBoard.addEventListener('click', ()=>{
  showHighScore();
});

let id = localStorage.length;
submitButton.addEventListener('click', ()=>{ 
  id++;
  localStorage.setItem(id, (domname.value + " : " + score));
  showHighScore();
});

clearScore.addEventListener('click', ()=>{
  localStorage.clear();
  content.innerHTML = "";
})

back.addEventListener('click', ()=>{
  location.reload();
})



