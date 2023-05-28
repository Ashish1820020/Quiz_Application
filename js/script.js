//selecting all required elements
const start_button = document.querySelector(".start_button button");
const info_box = document.querySelector(".info_box");
const exit_button = info_box.querySelector(".buttons .quit");
const continue_button = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

// on clicking the start button
start_button.onclick = ()=>{
    info_box.classList.add("activeInfo"); 
}

// on clicking the exit button
exit_button.onclick = ()=>{
    info_box.classList.remove("activeInfo");
}

// on clicking the continue button
continue_button.onclick = ()=>{
    info_box.classList.remove("activeInfo"); 
    quiz_box.classList.add("activeQuiz");
    showQuetions(0);
    queCounter(1);
    startTimer(15);
    startTimerLine(0);
}

let timeValue =  15;
let question_count = 0;
let current_question_num = 1;
let userScore = 0;
let counter;     //setting up the timeintervel for the time
let counterLine; //setting up the timeintervel for the line
let widthValue = 0; //setting up the length of the line

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// on clicking the restart button
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); 
    result_box.classList.remove("activeResult"); 
    timeValue = 15; 
    question_count = 0;
    current_question_num = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(question_count);
    queCounter(current_question_num); 
    clearInterval(counter);
    clearInterval(counterLine); 
    startTimer(timeValue); 
    startTimerLine(widthValue); 
    timeText.textContent = "Time Left"; //change the text of timeText to Time Left
    next_button.classList.remove("show"); //hide the next button
}

// on clicking the quit button
quit_quiz.onclick = ()=>{
    window.location.reload(); //reload the current window
}

const next_button = document.querySelector("footer .next_button");
const bottom_ques_counter = document.querySelector("footer .total_que");

// on clicking the next button
next_button.onclick = ()=>{
    if(question_count < questions.length - 1){ 
        question_count++; 
        current_question_num++; 
        showQuetions(question_count); 
        queCounter(current_question_num); //passing current_question_num value to queCounter
        clearInterval(counter);
        clearInterval(counterLine); 
        startTimer(timeValue); 
        startTimerLine(widthValue); 
        timeText.textContent = "Time Left"; 
        next_button.classList.remove("show"); 
    }else{
        clearInterval(counter); 
        clearInterval(counterLine);
        showResult();
    }
}

// getting questions and options from array
function showQuetions(index){
    const question_text = document.querySelector(".question_text");

    //creating new question and options 
    let question_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = 
    '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';

    question_text.innerHTML = question_tag; //appending the question 
    option_list.innerHTML = option_tag; //appending the oprions
    
    const option = option_list.querySelectorAll(".option");

    for(i=0; i < option.length; i++){
        option[i].addEventListener("click", optionSelected);
    }
}

// creating the new div tags which for icons
let tickIconTag = '<div class="icon tick"><i class="fa-solid fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//Answer chacking after option is selected
function optionSelected(){
    let answer = this;
    const optionSpan = option_list.querySelectorAll(".option span");
    clearInterval(counter); 
    clearInterval(counterLine); 
    let userAns = answer.textContent; //user selected option
    let correcAns = questions[question_count].answer; //correct option
    const allOptions = option_list.children.length; //all option items
    
    if(userAns == correcAns){ //correct oprion is selected 
        userScore += 1; 
        answer.classList.add("correct"); 
        answer.insertAdjacentHTML("beforeend", tickIconTag); 
    }else{ //wrong option is selected
        answer.classList.add("incorrect"); 
        answer.insertAdjacentHTML("beforeend", crossIconTag);
        console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){ 
                option_list.children[i].setAttribute("class", "option correct"); 
                console.log(option_list.children[i]);
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); 
            }
        }
    }

    //once user select an option then disabled all options
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); 
    }
    next_button.classList.add("show"); 
}

// Showing the Result
function showResult(){
    info_box.classList.remove("activeInfo"); 
    quiz_box.classList.remove("activeQuiz"); 
    result_box.classList.add("activeResult"); 
    const scoreText = result_box.querySelector(".score_text");

    // Checking score and adding corresponding result
    if (userScore > 3){ 
        let scoreTag = '<span>and congrats! , You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag; 
    }
    else if(userScore > 1){
        let scoreTag = '<span>and nice , You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{ 
        let scoreTag = '<span>and sorry , You got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}


// Handling the Timer
function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; 
        time--; 
        if(time < 9){ 
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; 
        }
        // Showing correct answer after time off
        if(time < 0){ 
            clearInterval(counter); 
            timeText.textContent = "Time Off"; 
            const allOptions = option_list.children.length; 
            let correcAns = questions[question_count].answer; 
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAns){ 
                    option_list.children[i].setAttribute("class", "option correct");
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); 
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled");
            }
            next_button.classList.add("show");
        }
    }
}

//Handling Timer line 
function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1; 
        time_line.style.width = time + "px";
        if(time > 549){
            clearInterval(counterLine); 
        }
    }
}

// Handling question count
function queCounter(index){
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag; 
}