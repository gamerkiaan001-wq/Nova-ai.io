const chatBox = document.getElementById('chatBox');
const userInput = document.getElementById('userInput'); // यहाँ सही आईडी सेट की है
const sendBtn = document.getElementById('sendBtn');

// Aapka Vercel backend ka URL yahan set hai
const BACKEND_URL = 'https://api-key-dun.vercel.app/api/chat';

async function sendMessage() {
    const message = userInput.value.trim();
    
    if (!message) return;

    // 1. User ka message chat box mein dikhayein
    appendMessage(message, 'user-message');
    userInput.value = ''; // Input box ko khali karein

    console.log("Message bheja ja raha hai...");

    try {
        const response = await fetch(BACKEND_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: message })
        });

        const data = await response.json();
        console.log("Server se jawab aaya:", data);

        if (data.reply) {
            // 2. AI ka jawab chat box mein dikhayein
            appendMessage(data.reply, 'bot-message');
        } else {
            appendMessage("Server se koi jawab nahi mila.", 'bot-message');
        }
        
    } catch (error) {
        console.error("Connection Error:", error);
        appendMessage("सर्वर سے कनेक्ट نہیں ہو पाया!", 'bot-message');
    }
}

// Chat box mein message add karne ka helper function
function appendMessage(text, className) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${className}`;
    messageDiv.textContent = text;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto scroll to bottom
}

// Button click aur Enter key par message bhejne ke liye
sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
