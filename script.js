const questions = [
  { text: "I enjoy exploring new ideas and experiences.", trait: "Openness" },
  { text: "I like to think creatively and challenge conventional ideas.", trait: "Openness" },
  { text: "I plan ahead and organize my tasks efficiently.", trait: "Conscientiousness" },
  { text: "I take pride in completing tasks thoroughly and on time.", trait: "Conscientiousness" },
  { text: "I feel energized when I am with other people.", trait: "Extraversion" },
  { text: "I enjoy being the center of attention in social settings.", trait: "Extraversion" },
  { text: "I empathize with others and value their perspectives.", trait: "Agreeableness" },
  { text: "I strive to maintain harmony and avoid conflict in relationships.", trait: "Agreeableness" },
  { text: "I often worry about things that could go wrong.", trait: "Neuroticism" },
  { text: "I feel stressed easily and take a while to calm down.", trait: "Neuroticism" }
];

const options = ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"];
const form = document.getElementById("personalityTest");
const questionsContainer = document.getElementById("questions");

// Generate questions dynamically
questions.forEach((q, index) => {
  const questionDiv = document.createElement("div");
  questionDiv.classList.add("question");
  questionDiv.innerHTML = `
    <label>${index + 1}. ${q.text}</label>
    <div class="answers">
      ${options
        .map(
          (option, i) =>
            `<label><input type="radio" name="q${index}" value="${4 - i}">${option}</label>`
        )
        .join("")}
    </div>
    <hr>
  `;
  questionsContainer.appendChild(questionDiv);
});

// Handle form submission
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const scores = { Openness: 0, Conscientiousness: 0, Extraversion: 0, Agreeableness: 0, Neuroticism: 0 };

  questions.forEach((q, index) => {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    if (selected) {
      scores[q.trait] += parseInt(selected.value);
    }
  });

  // Determine the dominant personality type
  const dominantTrait = Object.keys(scores).reduce((a, b) => (scores[a] > scores[b] ? a : b));

  const personalityDefinitions = {
    Openness: "Curious, imaginative, and open to new experiences.",
    Conscientiousness: "Organized, reliable, and goal-oriented.",
    Extraversion: "Outgoing, energetic, and social.",
    Agreeableness: "Kind, compassionate, and cooperative.",
    Neuroticism: "Sensitive to stress, with frequent mood swings."
  };

  const resultElement = document.getElementById("result");
  resultElement.style.display = "block";
  document.getElementById("personalityResult").textContent = `Your personality type is: ${dominantTrait} - ${personalityDefinitions[dominantTrait]}`;

  // Scroll smoothly to the result section
  resultElement.scrollIntoView({ behavior: "smooth" });
});
