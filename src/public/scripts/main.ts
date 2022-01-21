//Query DOM
const messageInput = document.querySelector(
    ".message-input-container > form > input"
  ) as HTMLInputElement,
  chatForm = document.querySelector(
    ".message-input-container > form"
  ) as HTMLElement,
  chatBox = document.querySelector(".messages-container > ul") as HTMLElement;

const socket = io();

// Emit Events
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (messageInput.value) {
    socket.emit("chatMessage", {
      message: messageInput.value,
    });
    messageInput.value = "";
  }
});

// Listening
socket.on("chatMessage", (data: any) => {
  chatBox.innerHTML += `
    <li class="message">
      <header><p class="message-sender-name">حسین نجفی</p></header>
      <main><pre class="message-text">${data.message}</pre></main>
      <footer><p class="Message-time">18:45</p></footer>
    </li>
  `;
});
