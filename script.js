const APPOINTMENT_WEBHOOK = "INSERISCI_WEBHOOK_VISITE";
const RECRUITMENT_WEBHOOK = "INSERISCI_WEBHOOK_BANDI";
const STAFF_PASSWORD = "medical123";

const navbar = document.getElementById("navbar");
const requestForm = document.getElementById("requestForm");
const formStatus = document.getElementById("formStatus");
const bandoForm = document.getElementById("bandoForm");
const bandoStatus = document.getElementById("bandoStatus");
let selectedBando = "Medical Internship";

window.addEventListener("scroll", () => {
  if (window.scrollY > 40) navbar.classList.add("nav-scrolled");
  else navbar.classList.remove("nav-scrolled");
});

requestForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const payload = {
    username: "Eclipse Tower Medical Center",
    embeds: [{
      title: "🏥 Nuova richiesta appuntamento",
      color: 15022139,
      fields: [
        { name: "👤 Nome IC", value: document.getElementById("nomeIC").value.trim() || "Non inserito", inline: true },
        { name: "💬 Discord", value: document.getElementById("discord").value.trim() || "Non inserito", inline: true },
        { name: "📱 Telefono IC", value: document.getElementById("telefono").value.trim() || "Non inserito", inline: true },
        { name: "🩺 Servizio richiesto", value: document.getElementById("servizio").value.trim() || "Non inserito", inline: true },
        { name: "📋 Descrizione", value: document.getElementById("descrizione").value.trim() || "Non inserita" }
      ],
      footer: { text: "Eclipse Tower Medical Center - Appuntamenti" },
      timestamp: new Date().toISOString()
    }]
  };

  await sendWebhook(APPOINTMENT_WEBHOOK, payload, formStatus, "Richiesta inviata con successo.");
  if (formStatus.style.color.includes("22")) requestForm.reset();
});

bandoForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const payload = {
    username: "Eclipse Tower Medical Recruitment",
    embeds: [{
      title: "🩺 Nuova candidatura Medical Center",
      color: 15022139,
      fields: [
        { name: "📌 Bando", value: selectedBando, inline: true },
        { name: "👤 Nome IC", value: document.getElementById("bandoNomeIC").value.trim() || "Non inserito", inline: true },
        { name: "💬 Discord", value: document.getElementById("bandoDiscord").value.trim() || "Non inserito", inline: true },
        { name: "🎂 Età OOC", value: document.getElementById("bandoEta").value.trim() || "Non inserita", inline: true },
        { name: "⏰ Disponibilità", value: document.getElementById("bandoOre").value.trim() || "Non inserita", inline: true },
        { name: "📚 Esperienza", value: document.getElementById("bandoEsperienza").value.trim() || "Non inserita" },
        { name: "❤️ Motivazione", value: document.getElementById("bandoMotivo").value.trim() || "Non inserita" }
      ],
      footer: { text: "Eclipse Tower Medical Center - Bandi" },
      timestamp: new Date().toISOString()
    }]
  };

  await sendWebhook(RECRUITMENT_WEBHOOK, payload, bandoStatus, "Candidatura inviata con successo.");
  if (bandoStatus.style.color.includes("22")) bandoForm.reset();
});

async function sendWebhook(url, payload, statusEl, successMessage) {
  try {
    statusEl.style.color = "#f5f3f4";
    statusEl.innerText = "Invio in corso...";

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      statusEl.style.color = "#22c55e";
      statusEl.innerText = successMessage;
    } else {
      statusEl.style.color = "#ef4444";
      statusEl.innerText = "Errore durante l'invio. Controlla il webhook.";
    }
  } catch (err) {
    statusEl.style.color = "#ef4444";
    statusEl.innerText = "Errore di connessione.";
  }
}

function openBandoForm(title) {
  selectedBando = title;
  document.getElementById("bandoTitle").innerText = title;
  document.getElementById("bandoModal").style.display = "flex";
}

function closeBandoForm() {
  document.getElementById("bandoModal").style.display = "none";
}

function openStaff() {
  document.getElementById("staffModal").style.display = "flex";
}

function closeStaff() {
  document.getElementById("staffModal").style.display = "none";
}

function staffLogin() {
  const password = document.getElementById("staffPassword").value;
  const loginStatus = document.getElementById("loginStatus");

  if (password === STAFF_PASSWORD) {
    document.getElementById("loginPanel").classList.add("hidden");
    document.getElementById("staffPanel").classList.remove("hidden");
  } else {
    loginStatus.style.color = "#ef4444";
    loginStatus.innerText = "Password errata.";
  }
}
