document.addEventListener("DOMContentLoaded", function () {
    let correctPasscode = "1731"; // Set your passcode here
    let userPasscode = prompt("This website is restricted to the public. Enter the passcode to access the site:");

    if (userPasscode !== correctPasscode) {
        alert("Incorrect passcode! Access denied.");
        document.body.innerHTML = ""; // Clear the page content
    } else {
        alert("Access granted! Welcome.");
    }
});



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

document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".config-btn");
    const image = document.getElementById("bike-image");

    // Create a summary paragraph if it doesn't exist
    let summary = document.getElementById("config-summary");
    if (!summary) {
        summary = document.createElement("p");
        summary.id = "config-summary";
        document.querySelector(".config-options").appendChild(summary);
    }

    // Base specifications
    let basePrice = 2000;
    let baseHP = 2;
    let baseWeight = 24;
    let baseRange = 60;
    let baseSpeed = 30;

    // Default selected options
    const selectedOptions = {
        frame: "Black Package",
        wheels: "Sport Wheels",
        battery: "Standard Battery",
        motor: "Single Motor"
    };

    // Modifiers for each option
    const optionModifiers = {
        "wheels-alloy": { price: 90, weight: 0 },
        "wheels-carbon": { price: 400, weight: -2 },
        "battery-long": { price: 200, rangeSingle: 120, rangeDouble: 80 },
        "seat-sport": { price: 200, hp: 4, speed: 50, weight: 26 } // Double motor
    };

    function updateSummary() {
        // Start with base values
        let totalPrice = basePrice;
        let totalHP = baseHP;
        let totalWeight = baseWeight;
        let totalRange = baseRange;
        let totalSpeed = baseSpeed;

        // Apply modifiers based on selections
        Object.keys(selectedOptions).forEach(category => {
            const selectedValue = selectedOptions[category];
            const optionKey = `${category}-${selectedValue.toLowerCase().replace(" ", "-")}`;
            const modifier = optionModifiers[optionKey];

            if (modifier) {
                if (modifier.price) totalPrice += modifier.price;
                if (modifier.hp) totalHP = modifier.hp;
                if (modifier.weight) totalWeight += modifier.weight;
                if (modifier.speed) totalSpeed = modifier.speed;
                if (modifier.rangeSingle && selectedOptions.motor === "Single Motor") {
                    totalRange = modifier.rangeSingle;
                }
                if (modifier.rangeDouble && selectedOptions.motor === "Double Motor") {
                    totalRange = modifier.rangeDouble;
                }
            }
        });

        // Update summary text
        summary.innerHTML = `
            <strong>Selected Options:</strong> 
            <br> Finish: ${selectedOptions.frame}
            <br> Wheels: ${selectedOptions.wheels}
            <br> Battery: ${selectedOptions.battery}
            <br> Motor: ${selectedOptions.motor}
            <br><br> <strong>Total Price:</strong> $${totalPrice}
            <br> <strong>Total HP:</strong> ${totalHP} HP
            <br> <strong>Weight:</strong> ${totalWeight} LBS
            <br> <strong>Range:</strong> ${totalRange} Miles
            <br> <strong>Top Speed:</strong> ${totalSpeed} MPH
        `;
    }

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            // Get the category and value
            const option = button.dataset.option;
            const [category, value] = option.split("-");

            // Deselect previous button in the same category
            document.querySelectorAll(`.config-btn[data-option^="${category}"]`).forEach(btn => {
                btn.classList.remove("active");
            });

            // Select the new button
            button.classList.add("active");

            // Update selected options
            selectedOptions[category] = button.textContent.trim();

            // Update the summary
            updateSummary();
        });
    });

    // Initialize summary on page load
    updateSummary();
});
