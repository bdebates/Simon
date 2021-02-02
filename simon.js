let boxes = document.getElementsByClassName("boxes");
let easyGame = document.getElementById("centerBox");
let easyGameNew = document.getElementById("easyGameNew");
let score = document.getElementById("score");
let computerDifficulty = 0;
let currentIndex = 0;
let computerBoxesArr = [];
let userBoxesArr = [];
let testE;
easyGame.addEventListener("click", (e) => {
  computerDifficulty++;
  continueGameEasy();
});
easyGameNew.addEventListener("click", (e) => {
  computerDifficulty = 0;
  currentIndex = 0;
  computerBoxesArr = [];
  userBoxesArr = [];
  computerDifficulty++;
  continueGameEasy();
});
const enableUser = (enableBool) => {
  for (let i = 0; i < boxes.length; i++) {
    if (enableBool) {
      boxes[i].addEventListener("mousedown", (e) => {
        e.target.style.opacity = 1;
        window.setTimeout(() => {
          e.target.style.opacity = 0.5;
          if (userBoxesArr.length >= computerBoxesArr.length) {
            if (enableUser(false)) {
              score.innerText += /*`You are currently on game ${computerDifficulty++}*/ `. You have won so far!`;
            } else {
              score.innerText = `You unfortunately lost on level ${computerDifficulty}!`;
            }
          }
        }, 100);
        userBoxesArr.push(parseInt(e.target.id.split("").pop()));
      });
    } else {
      //   if (userBoxesArr.length === computerBoxesArr) {
      //   boxes[i].removeEventListener("mousedown", enableUser, (e) => {});
      let old_element = boxes[i];
      let new_element = old_element.cloneNode(true);
      old_element.parentNode.replaceChild(new_element, old_element);
      //   }
    }
  }
  if (!enableBool) {
    return compareUserComp();
  }
};

const computerChoiceHard = (difficulty) => {
  for (let i = 0; i < difficulty; i++) {
    computerBoxesArr.push(Math.floor(Math.random() * 4));
  }
};
const computerChoiceEasy = () => {
  computerBoxesArr.push(Math.floor(Math.random() * 4));
};
const computerChoiceExec = () => {
  window.setTimeout(() => {
    boxes[computerBoxesArr[currentIndex]].style.opacity = 1;
    window.setTimeout(() => {
      boxes[computerBoxesArr[currentIndex]].style.opacity = 0.5;
    }, 500);
    window.setTimeout(() => {
      if (currentIndex == computerBoxesArr.length - 1) {
        currentIndex = 0;
        enableUser(true);
      } else {
        currentIndex++;
        computerChoiceExec(computerBoxesArr);
      }
    }, 500);
  }, 1000);
};
const compareUserComp = () => {
  let win = false;
  for (let i = 0; i < computerBoxesArr.length; i++) {
    if (computerBoxesArr[i] === userBoxesArr[i]) {
      win = true;
    } else {
      win = false;
      break;
    }
  }
  userBoxesArr = [];
  //   console.log(win);
  return win;
};
const continueGameEasy = () => {
  score.innerText = `You are currently on level ${computerDifficulty}`;
  enableUser(false);
  computerChoiceEasy();
  computerChoiceExec();
};
