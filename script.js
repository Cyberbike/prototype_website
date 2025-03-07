// document.addEventListener("DOMContentLoaded", function () {
//     let correctPasscode = "1731"; // Set your passcode here
//     let userPasscode = prompt("This website has adult content. Enter the passcode to access the site:");

//     if (userPasscode !== correctPasscode) {
//         alert("Incorrect passcode! Access denied.");
//         document.body.innerHTML = ""; // Clear the page content
//     } else {
//         alert("Access granted! Welcome.");
//     }
// });



document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".config-btn");
    const image = document.getElementById("bike-image");

    // Store selected options
    const selectedOptions = {
        frame: "black",
        wheels: "sport",
        battery: "standard",
        seat: "leather"
    };

    // Image mapping (Example: You can add more)
    const imageMapping = {
        "frame-black|wheels-sport|battery-standard|seat-leather": "bike-black-sport-standard-leather.jpg",
        "frame-white|wheels-alloy|battery-long|seat-sport": "bike-white-alloy-long-sport.jpg",
        // Add more combinations...
    };

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            // Get the category and value
            const option = button.dataset.option;
            const [category, value] = option.split("-");

            // Deselect previous button in the same category
            document.querySelectorAll(`.config-btn[data-option^="${category}"]`).forEach(btn => {
                btn.classList.remove("active");
            });

            // Select new button
            button.classList.add("active");

            // Update selected options
            selectedOptions[category] = value;

            // Generate image key
            const imageKey = `${selectedOptions.frame}|${selectedOptions.wheels}|${selectedOptions.battery}|${selectedOptions.seat}`;
            image.src = imageMapping[imageKey] || "picture1.png"; // Fallback image
        });
    });
});
