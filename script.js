const chatBox = document.getElementById('chatBox');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

// Aapka Vercel backend ka URL yahan set hai
const BACKEND_URL = 'https://api-key-dun.vercel.app/api/chat';

async function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    // User message screen par dikhao
    appendMessage(text, 'user-message');
    userInput.value = '';

    // Loading message dikhao
    const loadingId = appendMessage('Nova AI soch raha hai...', 'bot-message');

    try {
        const response = await fetch(BACKEND_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: text })
        });

        const data = await response.json();
        
        // Loading message hatao aur asli jawab dikhao
        document.getElementById(loadingId).remove();
        
        if (data.reply) {
            appendMessage(data.reply, 'bot-message');
        } else {
            appendMessage('Kuch gadbad ho gayi hai, phir se try karo!', 'bot-message');
        }
    } catch (error) {
        document.getElementById(loadingId).remove();
        appendMessage('Server se connect nahi ho paya!', 'bot-message');
    }
}

function appendMessage(text, className) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${className}`;
    msgDiv.innerText = text;
    
    const id = 'msg-' + Date.now();
    msgDiv.id = id;
    
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
    return id;
}

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});
