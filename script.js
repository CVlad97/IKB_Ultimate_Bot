function setMode(label) {
  var status = document.getElementById("bot-status");
  if (!status) return;
  status.textContent = "Statut : " + label + " (aucun ordre reel envoye)";
}

function readValue(id) {
  var field = document.getElementById(id);
  return field ? field.value.trim() : "";
}

function prepareLead(event) {
  event.preventDefault();
  var lead = {
    name: readValue("lead-name"),
    contact: readValue("lead-contact"),
    objective: readValue("lead-objective"),
    context: readValue("lead-context"),
    createdAt: new Date().toISOString()
  };
  var current = JSON.parse(localStorage.getItem("ikb_ultimate_leads") || "[]");
  localStorage.setItem("ikb_ultimate_leads", JSON.stringify([lead].concat(current).slice(0, 50)));

  var message = [
    "Bonjour IKB, je souhaite cadrer une demande bot controle.",
    "Nom/projet : " + (lead.name || "non renseigne"),
    "Contact : " + (lead.contact || "non renseigne"),
    "Objectif : " + lead.objective,
    "Contexte : " + (lead.context || "a preciser"),
    "Je confirme qu'aucun ordre reel ne doit etre envoye sans validation humaine."
  ].join("\n");

  var feedback = document.getElementById("lead-feedback");
  if (feedback) feedback.textContent = "Demande sauvegardee localement. WhatsApp prepare.";
  window.open("https://wa.me/596696653589?text=" + encodeURIComponent(message), "_blank", "noopener,noreferrer");
}
