//Query DOM
const messageInput = document.querySelector(
    ".message-input-container > form > input"
  ) as HTMLInputElement,
  chatForm = document.querySelector(
    ".message-input-container > form"
  ) as HTMLElement,
  chatBox = document.querySelector(".messages-container > ul") as HTMLElement,
  feedBak = document.querySelector(".feedBak") as HTMLElement,
  members = document.querySelector(".members") as HTMLElement;

const socket = io();

// Emit Events
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (messageInput.value) {
    socket.emit("chatMessage", {
      message: messageInput.value,
      name: localStorage.getItem("name"),
    });
    messageInput.value = "";
  }
});

// Send OnTyping Event
messageInput.addEventListener("keypress", () => {
  socket.emit("typing", {
    name: localStorage.getItem("name"),
  });
});

// Listening
socket.on("chatMessage", (data: any) => {
  feedBak.innerHTML = "(0.^.0)";
  chatBox.innerHTML += `
    <li class="message">
      <header>
        <p class="message-sender-name">${data.name}</p>
      </header>
      <main><pre class="message-text">${data.message}</pre></main>
      <footer><p class="Message-time">18:45</p></footer>
    </li>
  `;
});

socket.on("typing", (data: any) => {
  feedBak.innerHTML = `${data.name} درحال تایپ کردن هست`;
});

socket.on("onlines", (data: any) => {
  const usersCount = Object.values(data).length;
  members.innerHTML = usersCount.toString();
});
