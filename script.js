const API_URL = "https://script.google.com/macros/s/AKfycbw1yvfzyoZcqzHJCRqs6iGeA7PcfP7Zy9BJsIMbNDLxB2_e0SSGbc2vbjpovBblo3Ln/exec";

const params = new URLSearchParams(window.location.search);
const code = params.get("code") || "BC001";

const codeEl = document.getElementById("code");
const statusEl = document.getElementById("status");
const scanBtn = document.getElementById("scanBtn");
codeEl.innerText = code;

// estado inicial
statusEl.innerText = "VERIFICANDO...";

async function checkCode() {
    try {
        const res = await fetch(API_URL + "?code=" + code);
        const data = await res.json();

        if (data.status === "VALID") {
            statusEl.innerHTML = "🟢 ACCESO PERMITIDO";
            statusEl.style.color = "#00ff88";
        } 
        
        else if (data.status === "REDEEMED") {
            statusEl.innerHTML = "🔴 YA UTILIZADO";
            statusEl.style.color = "#ff3b3b";
        } 
        
        else {
            statusEl.innerHTML = "❌ INVÁLIDO";
            statusEl.style.color = "#ff3b3b";
        }

    } catch (err) {
        console.log(err);
        statusEl.innerHTML = "⚠ ERROR DE CONEXIÓN";
        statusEl.style.color = "orange";
    }
}

checkCode();

scanBtn.addEventListener("click", async function () {

    screen1.classList.add("hidden");
    screen2.classList.remove("hidden");

    statusEl.innerText = "CHECKING...";

    try {
        const res = await fetch(API_URL + "?code=" + code);
        const data = await res.json();

        if (data.status === "VALID") {
            statusEl.innerHTML = "🟢 VALID";
        }

        else if (data.status === "REDEEMED") {
            statusEl.innerHTML = "🔴 REDEEMED";
        }

        else {
            statusEl.innerHTML = "❌ INVALID";
        }

    } catch (err) {
        console.log(err);
        statusEl.innerHTML = "ERROR API";
    }
});