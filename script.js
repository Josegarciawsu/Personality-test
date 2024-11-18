const questions = [
  "I am excited by learning new things and exploring different ideas.", // Openness
  "I actively seek to improve my creativity and try new ways to approach challenges.", // Openness
  "I prefer to plan my activities and tasks well in advance.", // Conscientiousness
  "I always follow through with my commitments, even when they require extra effort.", // Conscientiousness
  "I feel comfortable socializing with unfamiliar people.", // Extraversion
  "I enjoy taking charge and leading group discussions or activities.", // Extraversion
  "I am willing to help others without expecting anything in return.", // Agreeableness
  "I avoid conflict in order to keep the peace, even when I have valid points to share.", // Agreeableness
  "I often worry about potential negative outcomes or things going wrong.", // Neuroticism
  "I remain calm and composed even in stressful or challenging situations." // Neuroticism (inverse)
];

const options = ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"];

const form = document.getElementById('personalityTest');
const questionsContainer = document.getElementById('questions');

// Dynamically generate questions
questions.forEach((question, index) => {
  const questionDiv = document.createElement('div');
  questionDiv.classList.add('question');
  questionDiv.innerHTML = `
    <label>${index + 1}. ${question}</label>
    <div class="answers">
      ${options
        .map(
          (option, i) =>
            `<label><input type="radio" name="q${index}" value="${i}">${option}</label>`
        )
        .join("")}
    </div>
    <hr>
  `;
  questionsContainer.appendChild(questionDiv);
});

// Handle form submission
form.addEventListener('submit', function (event) {
  event.preventDefault();

  const traits = [0, 0, 0, 0, 0]; // Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism

  questions.forEach((_, index) => {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    if (selected) {
      const value = parseInt(selected.value);
      const traitIndex = Math.floor(index / 2); // Map question pairs to traits
      traits[traitIndex] += value;
    }
  });

  const maxIndex = traits.indexOf(Math.min(...traits));
  const personalityTypes = [
    "Openness: Curious, imaginative, and open to new ideas.",
    "Conscientiousness: Organized, reliable, and goal-oriented.",
    "Extraversion: Outgoing, energetic, and sociable.",
    "Agreeableness: Kind, compassionate, and cooperative.",
    "Neuroticism: Sensitive to stress, with frequent mood swings."
  ];

  document.getElementById('result').style.display = 'block';
  document.getElementById('personalityResult').textContent = `Your personality type is: ${personalityTypes[maxIndex]}`;
});
