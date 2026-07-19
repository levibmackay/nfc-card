// Levi Mackay — NFC card. The whole site's JS: copy-email button,
// headshot fallback, and the footer year.

document.getElementById("year").textContent = new Date().getFullYear();

// Show initials if the headshot fails to load
var headshot = document.getElementById("headshot");
headshot.addEventListener("error", function () {
  headshot.hidden = true;
  document.querySelector(".avatar-initials").hidden = false;
});

// Copy email to clipboard, flash a check for confirmation
var copyBtn = document.getElementById("copy-email");
var copyIcon = copyBtn.querySelector(".icon-copy");
var checkIcon = copyBtn.querySelector(".icon-check");
var copyTimer;

// SVG elements have no .hidden property, so toggle the attribute directly
copyBtn.addEventListener("click", function () {
  navigator.clipboard.writeText(copyBtn.dataset.email).then(function () {
    copyIcon.setAttribute("hidden", "");
    checkIcon.removeAttribute("hidden");
    copyBtn.setAttribute("aria-label", "Email copied");
    clearTimeout(copyTimer);
    copyTimer = setTimeout(function () {
      copyIcon.removeAttribute("hidden");
      checkIcon.setAttribute("hidden", "");
      copyBtn.setAttribute("aria-label", "Copy email address");
    }, 1800);
  });
});
