document.addEventListener("DOMContentLoaded", function() {
    const faqData = 
    `Question 1
-Answer 1

Question 2
-Answer 2
but multiple lines

Question 3
-Answer 3`;
  
    const faqContainer = document.getElementById("faq-container");
    const faqHr = document.createElement("hr");
    faqContainer.appendChild(faqHr);
  
    // Splitting the string into individual questions and answers
    const faqEntries = faqData.split('\n\n');
  
    // Creating HTML elements for each question and answer
    faqEntries.forEach(function(entry) {
        const faqHr = document.createElement("hr");
        const [question, answer] = entry.split("\n-").map(str => str.trim());
        const faqItem = document.createElement("div");
        faqItem.classList.add("faq-item");
    
        const questionElement = document.createElement("div");
        questionElement.classList.add("question");
        questionElement.classList.add("prevent-select");
        questionElement.textContent = question;
        const toggle = document.createElement("span");
        toggle.classList.add("toggle");
        toggle.textContent = "+";
        questionElement.appendChild(toggle);
    
        const answerElement = document.createElement("div");
        answerElement.classList.add("answer");
        if (answer) {
            answerElement.textContent = answer;
        } else {
            answerElement.textContent = "No answer provided.";
        }
        
        // Toggle functionality
        questionElement.addEventListener("click", function() {
            if (answerElement.style.display === "block") {
            answerElement.style.display = "none";
            toggle.textContent = "+";
            } else {
            answerElement.style.display = "block";
            toggle.textContent = "-";
            }
        });
    
        faqItem.appendChild(questionElement);
        faqItem.appendChild(answerElement);
        faqContainer.appendChild(faqItem);
        faqContainer.appendChild(faqHr);
    });
  });
  