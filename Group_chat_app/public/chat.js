document.addEventListener("DOMContentLoaded", () => {
    const chatMessages = document.getElementById("chatMessages");

    function getCurrentTime() {
        const now = new Date();
        return now.getHours() + ":" + now.getMinutes().toString().padStart(2, '0');
    }

    window.createMessage = function(text, type, username = "You") {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", type);

        if (type === "received") {
            const user = document.createElement("div");
            user.classList.add("username");
            user.innerText = username;
            messageDiv.appendChild(user);
        }

        const msgText = document.createElement("div");
        msgText.innerText = text;

        const time = document.createElement("div");
        time.classList.add("timestamp");
        time.innerText = getCurrentTime();

        messageDiv.appendChild(msgText);
        messageDiv.appendChild(time);

        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    window.sendMessage = function() {
        const input = document.getElementById("messageInput");
        const text = input.value.trim();

        if (!text) return;

        createMessage(text, "sent");
        input.value = "";

        setTimeout(() => {
            createMessage("Reply: " + text, "received", "User2");
        }, 800);
    }

    document.getElementById("messageInput").addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            sendMessage();
        }
    });
});