// Reset básico
document.body.style.margin = "0";
document.body.style.fontFamily = "Helvetica, Arial, sans-serif";
document.body.style.background = "#121212";
document.body.style.color = "#ffffff";

// Container principal
const container = document.createElement("div");
container.style.minHeight = "100vh";
container.style.display = "flex";
container.style.flexDirection = "column";
container.style.justifyContent = "center";
container.style.alignItems = "center";
container.style.textAlign = "center";
container.style.padding = "20px";

// Logo / Título
const logo = document.createElement("h1");
logo.innerText = "Spotify";
logo.style.fontSize = "3.5rem";
logo.style.color = "#1DB954";
logo.style.marginBottom = "10px";

// Subtítulo
const subtitle = document.createElement("p");
subtitle.innerText = "Música para todos os momentos.";
subtitle.style.fontSize = "1.3rem";
subtitle.style.maxWidth = "500px";
subtitle.style.marginBottom = "40px";
subtitle.style.color = "#b3b3b3";

const button = document.createElement("button");
button.innerText = "Abrir Spotify";
button.style.padding = "14px 36px";
button.style.fontSize = "1rem";
button.style.fontWeight = "bold";
button.style.border = "none";
button.style.borderRadius = "30px";
button.style.cursor = "pointer";
button.style.background = "#1DB954";
button.style.color = "#000";

button.addEventListener("click", () => {
  alert("🎶 Bem-vindo ao Spotify (demo)!");
});


// Rodapé simples
const footer = document.createElement("span");
footer.innerText = "Página demo • Projeto educacional";
footer.style.position = "absolute";
footer.style.bottom = "20px";
footer.style.fontSize = "0.8rem";
footer.style.color = "#666";

// Montagem
container.appendChild(logo);
container.appendChild(subtitle);
container.appendChild(button);

document.body.appendChild(container);
document.body.appendChild(footer);