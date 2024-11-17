// script.js
const questions = [
  "I am excited by learning new things and exploring different ideas.",
  "I actively seek to improve my creativity and try new ways to approach challenges.",
  "I prefer to plan my activities and tasks well in advance.",
  "I always follow through with my commitments, even when they require extra effort.",
  "I feel comfortable socializing with unfamiliar people.",
  "I enjoy taking charge and leading group discussions or activities.",
  "I am willing to help others without expecting anything in return.",
  "I avoid conflict in order to keep the peace, even when I have valid points to share.",
  "I often worry about potential negative outcomes or things going wrong.",
  "I remain calm and composed even in stressful or challenging situations."
];

const options = ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"];

const form = document.getElementById('personalityTest');
const questionsContainer = document.getElementById('questions');

// Generate questions dynamically
questions.forEach((question, index) => {
  const questionDiv = document.createElement('div');
  questionDiv.classList.add('question');
  
  const label = document.createElement('label');
  label.textContent = `${index + 1}. ${question}`;
  
  const answersDiv = document.createElement('div');
  answersDiv.classList.add('answers');

  options.forEach(option => {
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = `q${index}`;
    input.value = option;

    const labelOption = document.createElement('label');
    labelOption.textContent = option;

    answersDiv.appendChild(input);
    answersDiv.appendChild(labelOption);
  });

  questionDiv.appendChild(label);
  questionDiv.appendChild(answersDiv);
  questionsContainer.appendChild(questionDiv);
});

// Handle form submission and calculate personality type
form.addEventListener('submit', function(event) {
  event.preventDefault();
  
  let score = 0;

  questions.forEach((_, index) => {
    const selectedAnswer = document.querySelector(`input[name="q${index}"]:checked`);
    if (selectedAnswer) {
      const value = selectedAnswer.value;
      // Increment score based on answer
      score += options.indexOf(value); // 0 = Strongly Agree, 4 = Strongly Disagree
    }
  });

  // Classify personality based on score
  let personality = '';
  if (score <= 10) {
    personality = 'You might be an introvert, calm and analytical.';
  } else if (score <= 20) {
    personality = 'You seem to be a balanced individual, open to new ideas.';
  } else if (score <= 30) {
    personality = 'You appear to be an extrovert, enthusiastic and social.';
  } else {
    personality = 'You might be highly ambitious and driven, seeking leadership roles.';
  }

  // Show result
  document.getElementById('result').style.display = 'block';
  document.getElementById('personalityResult').textContent = personality;
});