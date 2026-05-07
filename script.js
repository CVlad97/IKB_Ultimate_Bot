function setMode(label) {
  var status = document.getElementById("bot-status");
  if (!status) return;
  status.textContent = "Statut : " + label + " (aucun ordre reel envoye)";
}
