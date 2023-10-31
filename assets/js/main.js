const questions = [
    {
        "question": "In a future where humans can upload their consciousness to a digital world, what ethical dilemmas might arise?",
        "answers": [
            { "text": "Loss of personal identity", "correct": false },
            { "text": "Eradication of physical existence", "correct": false },
            { "text": "Enhanced human-machine collaboration", "correct": false },
            { "text": "Violation of digital rights and privacy", "correct": true }
        ]
    },
    {
        "question": "If time travel were possible, what would happen if someone met their past self?",
        "answers": [
            { "text": "A temporal paradox leading to unpredictable consequences", "correct": true },
            { "text": "Nothing significant, as it would be a paradox", "correct": false },
            { "text": "The past self would cease to exist", "correct": false },
            { "text": "They would become a time-traveling duo", "correct": false }
        ]
    },
    {
        "question": "What implications might arise if we discovered an alien civilization with technology far superior to ours?",
        "answers": [
            { "text": "Cooperative advancement in science and technology", "correct": false },
            { "text": "Potential subjugation or invasion by the advanced civilization", "correct": false },
            { "text": "Creation of an intergalactic alliance", "correct": false },
            { "text": "A reevaluation of humanity's place in the universe", "correct": true }
        ]
    },
    {
        "question": "If we could implant false memories into people's minds, what could be the consequences for society?",
        "answers": [
            { "text": "Enhanced personal experiences and emotional well-being", "correct": false },
            { "text": "Erosion of trust and uncertainty in personal memories", "correct": false },
            { "text": "Ethical concerns related to control and manipulation of memories", "correct": true },
            { "text": "Increased mental health and cognitive abilities", "correct": false }
        ]
    },
    {
        "question": "In a world where AI achieves superintelligence, what challenges might humanity face in coexisting with highly intelligent machines?",
        "answers": [
            { "text": "Ethical considerations regarding machine rights and responsibilities", "correct": true },
            { "text": "A harmonious coexistence with mutual benefits", "correct": false },
            { "text": "Job displacement and economic disruption", "correct": false },
            { "text": "A utopian society free of human conflicts", "correct": false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    const questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = 'block';
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Answer Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
