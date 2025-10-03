import emailjs from 'emailjs-com';

emailjs.init("ZT5dOwgz9dhOwyxD9");

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("contactModal");
  const openBtn = document.querySelector(".about-us-btn");
  const closeBtn = document.querySelector(".modal-close");
  const form = modal.querySelector("form");

  let messageContainer = document.createElement("div");
  messageContainer.style.marginTop = "10px";
  form.prepend(messageContainer);

  function showMessage(text, type = "success") {
    messageContainer.textContent = text;
    messageContainer.style.color = type === "success" ? "#ffd700" : "#ff4c4c";
    messageContainer.style.fontWeight = "bold";
  }

  function clearMessages() {
    messageContainer.textContent = "";
  }

  openBtn.addEventListener("click", () => {
    modal.style.display = "flex";
    clearMessages();
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    clearMessages();
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.querySelector("input[name='name']");
    const email = form.querySelector("input[name='email']");
    const message = form.querySelector("textarea[name='message']");
    let hasError = false;

    [name,email,message].forEach(f => f.style.border="none");
    clearMessages();

    if (!name.value.trim()) { name.style.border="2px solid red"; hasError=true; }
    if (!/^\S+@\S+\.\S+$/.test(email.value)) { email.style.border="2px solid red"; hasError=true; }
    if (!message.value.trim()) { message.style.border="2px solid red"; hasError=true; }

    if (hasError) {
      showMessage("❌ Пожалуйста, заполните все поля правильно.", "error");
      return;
    }

    emailjs.send("service_7elxk0c","template_zuwfv2p",{
      name:name.value,
      email:email.value,
      message:message.value
    })
    .then(()=>{ showMessage("✅ Ваше сообщение отправлено!","success"); form.reset(); })
    .catch(()=>{ showMessage("❌ Ошибка при отправке. Попробуйте позже.","error"); });
  });
});
