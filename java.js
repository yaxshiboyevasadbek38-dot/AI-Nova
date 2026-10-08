const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const chatContainer = document.getElementById("chatContainer");
const welcome = document.getElementById("welcome");
const newChat = document.getElementById("newChat");
const themeBtn = document.getElementById("themeBtn");
const chatHistory = document.getElementById("chatHistory");


// ===============================
// MESSAGE FUNCTIONS
// ===============================

function addMessage(text, type) {

    if (welcome) {
        welcome.style.display = "none";
    }

    const message = document.createElement("div");

    message.className = `message ${type}`;

    const avatar = document.createElement("div");

    avatar.className = "message-avatar";

    avatar.textContent = type === "user" ? "U" : "✦";

    const content = document.createElement("div");

    content.className = "message-content";

    const messageText = document.createElement("div");

    messageText.className = "message-text";

    messageText.innerHTML = text;

    content.appendChild(messageText);

    message.appendChild(avatar);
    message.appendChild(content);

    chatContainer.appendChild(message);

    scrollToBottom();
}


// ===============================
// TYPING ANIMATION
// ===============================

function showTyping() {

    const message = document.createElement("div");

    message.className = "message ai";

    message.id = "typingMessage";

    message.innerHTML = `
        <div class="message-avatar">✦</div>

        <div class="message-content">

            <div class="message-text typing">

                <span></span>
                <span></span>
                <span></span>

            </div>

        </div>
    `;

    chatContainer.appendChild(message);

    scrollToBottom();
}


function removeTyping() {

    const typing = document.getElementById("typingMessage");

    if (typing) {
        typing.remove();
    }
}


// ===============================
// AI RESPONSE
// ===============================

function generateAIResponse(question) {

    const text = question.toLowerCase();

    if (
        text.includes("salom") ||
        text.includes("assalom") ||
        text.includes("hello")
    ) {

        return `
            Salom! 👋 Men <b>Nova AI</b>man.
            <br><br>
            Bugun nima qilamiz? Men senga sayt yaratish,
            kod yozish, g‘oya topish yoki o‘qishda yordam bera olaman. 🚀
        `;
    }


    if (
        text.includes("sayt") ||
        text.includes("web") ||
        text.includes("website")
    ) {

        return `
            Zo‘r! 🔥 Sayt yaratish uchun bir nechta kuchli g‘oyam bor:
            <br><br>

            <b>1.</b> AI yordamchi 🤖<br>
            <b>2.</b> Online portfolio 👨‍💻<br>
            <b>3.</b> Startup platforma 🚀<br>
            <b>4.</b> Online kurs platformasi 📚<br>
            <b>5.</b> Social network 🌎
            <br><br>

            Xohlasang, men senga <b>0 dan professional sayt</b>
            strukturasi va kodini ham yozib beraman.
        `;
    }


    if (
        text.includes("html") ||
        text.includes("css") ||
        text.includes("javascript") ||
        text.includes("js")
    ) {

        return `
            Albatta! 💻
            <br><br>

            Men HTML, CSS va JavaScript bilan ishlashda yordam bera olaman.
            <br><br>

            Masalan:
            <br>
            <b>HTML</b> — sayt strukturasi 🧱<br>
            <b>CSS</b> — dizayn 🎨<br>
            <b>JavaScript</b> — funksiyalar ⚡
            <br><br>

            Kodni yubor — men uni tushuntirib, xatolarini topib beraman.
        `;
    }


    if (
        text.includes("startup") ||
        text.includes("biznes") ||
        text.includes("g‘oya") ||
        text.includes("goya")
    ) {

        return `
            🚀 Mana bitta kuchli startup g‘oyasi:
            <br><br>

            <b>AI Life Assistant</b>
            <br><br>

            Foydalanuvchi maqsadini yozadi:
            <br>
            “3 oyda JavaScript o‘rganmoqchiman.”
            <br><br>

            AI esa unga:
            <br>
            ✅ Kunlik plan<br>
            ✅ Vazifalar<br>
            ✅ Progress<br>
            ✅ Motivatsiya<br>
            ✅ Testlar
            <br><br>

            yaratib beradi.
        `;
    }


    if (
        text.includes("rahmat") ||
        text.includes("thanks")
    ) {

        return `
            Arzimaydi! 😎🔥
            <br><br>
            Yana qanday loyiha qilamiz?
        `;
    }


    return `
        Qiziq savol! 🤖
        <br><br>

        Men hozir demo rejimda ishlayapman.
        Savolingni biroz batafsilroq yozsang,
        yaxshiroq javob berishga harakat qilaman.
        <br><br>

        Masalan:
        <br>
        💻 “Menga portfolio sayt yarat”
        <br>
        🚀 “Startup g‘oya ber”
        <br>
        📚 “JavaScript o‘rgat”
        <br>
        🎨 “Chiroyli landing page qil”
    `;
}


// ===============================
// SEND MESSAGE
// ===============================

function sendMessage() {

    const text = messageInput.value.trim();

    if (!text) return;

    addMessage(
        escapeHTML(text),
        "user"
    );

    messageInput.value = "";

    messageInput.style.height = "auto";

    showTyping();

    setTimeout(() => {

        removeTyping();

        const response = generateAIResponse(text);

        addMessage(response, "ai");

    }, 900);

}


// ===============================
// ESCAPE HTML
// ===============================

function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}


// ===============================
// ENTER SEND
// ===============================

messageInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter" && !event.shiftKey) {

        event.preventDefault();

        sendMessage();

    }

});


// ===============================
// BUTTON
// ===============================

sendBtn.addEventListener("click", sendMessage);


// ===============================
// AUTO RESIZE
// ===============================

messageInput.addEventListener("input", function() {

    this.style.height = "auto";

    this.style.height =
        Math.min(this.scrollHeight, 120) + "px";

});


// ===============================
// SUGGESTIONS
// ===============================

document.querySelectorAll(".suggestion").forEach(button => {

    button.addEventListener("click", () => {

        const text =
            button.querySelector("span").textContent;

        messageInput.value = text;

        sendMessage();

    });

});


// ===============================
// NEW CHAT
// ===============================

newChat.addEventListener("click", () => {

    chatContainer.innerHTML = "";

    const newWelcome = document.createElement("div");

    newWelcome.className = "welcome";

    newWelcome.innerHTML = `
        <div class="big-logo">✦</div>

        <h2>Yangi suhbat 👋</h2>

        <p>
            Men senga yordam berishga tayyorman.
            Savolingni yoz!
        </p>
    `;

    chatContainer.appendChild(newWelcome);

    messageInput.focus();

});


// ===============================
// THEME
// ===============================

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {

        themeBtn.textContent = "🌙";

    } else {

        themeBtn.textContent = "☀️";

    }

});


// ===============================
// SCROLL
// ===============================

function scrollToBottom() {

    chatContainer.scrollTo({
        top: chatContainer.scrollHeight,
        behavior: "smooth"
    });

}