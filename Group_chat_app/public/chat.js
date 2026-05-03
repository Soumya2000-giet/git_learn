document.addEventListener("DOMContentLoaded", async() => {
    const chatMessages = document.getElementById("chatMessages");

    function getCurrentTime() {
        const now = new Date();
        return now.getHours() + ":" + now.getMinutes().toString().padStart(2, '0');
    }

    window.createMessage = async function(text, type, username = "You") {
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

    try{

        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:3000/user/message/receive", {
            headers: { Authorization: token }
        });

        const messages = res.data

        console.log(messages)

        messages.forEach(msg => {

            createMessage(msg.message,"sent")
            
        });

    }

    catch(err){
        console.log(`error is fetching message ${err}`)
    }

    

    window.sendMessage = async function() {
        const input = document.getElementById("messageInput");
        const text = input.value.trim();

        if (!text) return;

       

        try {
        const token = localStorage.getItem("token");

        const res = await axios.post("http://localhost:3000/user/message/send",
            { message: text },
            { headers: { Authorization: token } }
        );

        console.log(res)
        // Show message instantly
        createMessage(text, "sent");

        input.value = "";

    } catch (err) {
        console.error(err);
    }

        // setTimeout(() => {
        //     createMessage("Reply: " + text, "received", "User2");
        // }, 800);
    }

    
    document.getElementById("messageInput").addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            sendMessage();
        }
    });
});