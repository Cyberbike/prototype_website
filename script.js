document.addEventListener("DOMContentLoaded", function () {
    let correctPasscode = "1731"; // Set your passcode here
    let userPasscode = prompt("This website has adult content. Enter the passcode to access the site:");

    if (userPasscode !== correctPasscode) {
        alert("Incorrect passcode! Access denied.");
        document.body.innerHTML = ""; // Clear the page content
    } else {
        alert("Access granted! Welcome.");
    }
});
