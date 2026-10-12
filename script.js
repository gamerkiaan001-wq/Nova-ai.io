const chatBox = document.getElementById('chatBox');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

// आपकी दी गई Gemini API Key यहाँ सेट है
const API_KEY = "AQ.Ab8RN6Iy9MdkrsZvmMmiP2EIe9dZBNi5lXrD9ss3J7tVeS7qIA"; 

async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    // यूजर का मैसेज स्क्रीन पर दिखाएं
    appendMessage(message, 'user-message');
    userInput.value = '';

    // "सोच रहा है..." वाला मैसेज दिखाएं
    const loadingId = appendMessage("Nova AI सोच रहा है...", 'bot-message');

    try {
        // सीधे Google Gemini API को कॉल करें
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: message }]
                }]
            })
        });

        const data = await response.json();
        
        // "सोच रहा है" वाला लोडिंग मैसेज हटा दें
        const loadingElement = document.getElementById(loadingId);
        if (loadingElement) loadingElement.remove();

        if (data.candidates && data.candidates[0].content.parts[0].text) {
            const aiReply = data.candidates[0].content.parts[0].text;
            appendMessage(aiReply, 'bot-message');
        } else {
            appendMessage("माफ़ कीजिए, कोई जवाब नहीं मिला।", 'bot-message');
        }

    } catch (error) {
        console.error("Error:", error);
        const loadingElement = document.getElementById(loadingId);
        if (loadingElement) loadingElement.remove();
        appendMessage("कनेक्शन में कुछ दिक्कत आई है।", 'bot-message');
    }
}

// चैट बॉक्स में मैसेज जोड़ने का फंक्शन
function appendMessage(text, className) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${className}`;
    messageDiv.id = 'msg-' + Date.now();
    messageDiv.textContent = text;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
    return messageDiv.id;
}

// सेंड बटन और Enter की पर क्लिक इवेंट
sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
