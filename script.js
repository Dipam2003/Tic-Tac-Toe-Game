let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#resetBtn");
let msgContainer = document.querySelector(".msg-Container");
let msg = document.querySelector("#msg");
let newBtn = document.querySelector("#newBtn");


let turnX = true; // Track the turn of playerX & playerO
let moveCount = 0; // Count moves for draw check

const winPatterns = [// Store all winning patterns in a MultiDimensional Array
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];


// enable function to enable all boxes
const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText="";
        box.classList.remove("X", "O");
    }
};

// reser Game function
const resetGame = () => {
    turnX = true;
    moveCount = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
};


boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnX == true){
            box.innerText = "X"; //playerX turn
            box.classList.add("X");
            turnX = false;
        }else{
            box.innerText = "O";// playerO turn
            box.classList.add("O");
            turnX = true;
        }
        box.disabled = true;
        moveCount++;
        checkWinner();
    });
});


// disable function to disable all boxes after win
const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
};



// showWinner function
const showWinner = (winner) => {
    if (winner === "X") {
        msg.innerHTML = `Congratulations, Winner is <span class="X">"${winner}"</span>`;
    } else {
        msg.innerHTML = `Congratulations, Winner is <span class="O">"${winner}"</span>`;
    }
    msgContainer.classList.remove("hide");
    disableBoxes();
};


// showDraw function
const showDraw = () => {
   msg.innerText = "It's a Draw!";
   msgContainer.classList.remove("hide");
};


// checkWinner function
const checkWinner = () => {
    let winnerFound = false;


    // Winning Conditions
    for(let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText; // postion 1 value - X or O
        let pos2Val = boxes[pattern[1]].innerText; // position 2 value - X or O
        let pos3Val = boxes[pattern[2]].innerText; // position 3 value - X or O

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                showWinner(pos1Val);
                winnerFound = true;
                return;
            }
        }
    }
    
    // Draw Condition
    if(!winnerFound && moveCount === 9){
        showDraw();
    }
};

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click",resetGame);