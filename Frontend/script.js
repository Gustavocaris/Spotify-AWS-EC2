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