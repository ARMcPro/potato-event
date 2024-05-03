document.addEventListener("DOMContentLoaded", function() {
    const faqData = 
`
What is Potato Event?
-The Potato Event is a scavenger hunt-esque event where you will complete tasks to obtain Potatoes. Almost each plot will contain 10 Potatoes(Points), waiting to be discovered by you!
There will be 4 different Potato difficulties:
4 Easy Potatoes
3 Medium Potatoes
2 Hard Potatoes
1 Super Hard Potato

You can search for hidden things on the map or complete exciting challenges to obtain Potatoes. Once you acquire a potato, you'll be notified with a message, a cool title, and sound effect.
To help you, dear player, collecting Potatoes, there will be hints avaiable on the site.

All collected Potaotes will be displayed on the event-dedicated website: https://event.dfplots.net/

Moreover you will be able to see which potatoes you got on which plot. 
Still, trying to understand? Go check the tutorial: /join 38181

Winners of this event will be determined by the number of potatoes collected. 


How many tickets do I win?
-Coming soon.


Why is the event called like that?
-In past, we chose to do the first Potato Event as a consequence of winning the DiamondFire Elections with the Potato Party. Lately the Event lead admin, hibao, just called it like that and we kept that name.


Wait a second, weren't the points called Diamonds?
-Yes, in the first event they were killed like so because it was an event hosted on a server called DiamondFire. Although, after many complaints, we decided to change their name to Potato in order to avoid confusion.


I found a bug on one of the plots involved in the event, what can I do?
-You can report it on the event discord server at:
https://discord.gg/uAHXwSB8s3


Is Lusacan1 single? 
-Most likely.


`.trim();
  
    const faqContainer = document.getElementById("faq-container");
    const faqHr = document.createElement("hr");
    faqContainer.appendChild(faqHr);
  
    // Splitting the string into individual questions and answers
    const faqEntries = faqData.split('\n\n\n');
  
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
            answerElement.innerHTML = answer.replace(/(https:\/\/[^\s]+)/g, "<a href='$1'>$1</a>").replace(/(?:\r\n|\r|\n)/g, '<br>');

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
  