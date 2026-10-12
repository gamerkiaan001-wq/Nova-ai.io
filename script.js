const chatBox = document.getElementById('chatBox');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

// Aapka Vercel backend ka URL yahan set hai
const BACKEND_URL = 'https://api-key-dun.vercel.app/api/chat';

async function sendMessage() {
    const inputField = document.getElementById('user-input'); // या जो भी तुम्हारी इनपुट आईडी हो
    const message = inputField.value;
    
    if (!message) return;

    console.log("Message bheja ja raha hai..."); // यह चेक करने के लिए कि फंक्शन चल रहा है या नहीं

    try {
        const response = await fetch('https://api-key-dun.vercel.app/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: message })
        });

        const data = await response.json();
        console.log("Server se jawab aaya:", data);
        
        // यहाँ चैट में जवाब दिखाने का कोड होगा
    } catch (error) {
        console.error("Connection Error:", error);
    }
}
