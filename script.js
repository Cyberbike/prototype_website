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



document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".config-btn");
    const image = document.getElementById("bike-image");
    const summary = document.createElement("p"); // Create a <p> to display selections
    document.querySelector(".config-options").appendChild(summary);

    // Base specifications
    let basePrice = 2000;
    let baseHP = 2;
    let baseWeight = 24;
    let baseRange = 60;

    // User selection storage
    const selectedOptions = {
        frame: "Black Package",
        wheels: "Sport Wheels",
        battery: "Standard Battery",
        motor: "Single Motor"
    };

    // Price and performance modifiers
    const optionModifiers = {
        "wheels-alloy": { price: 90, weight: 0 },
        "wheels-carbon": { price: 400, weight: -2 },
        "battery-long": { price: 200, range: { single: 120, double: 80 } },
        "seat-sport": { price: 200, hp: 4, speed: 50, weight: 26 } // Double motor
    };

    function updateSummary() {
        let totalPrice = basePrice;
        let totalHP = baseHP;
        let totalWeight = baseWeight;
        let totalRange = baseRange;
        let topSpeed = 30;

        // Apply modifiers based on selections
        Object.keys(selectedOptions).forEach(optionKey => {
            const option = selectedOptions[optionKey];
            const modifier = optionModifiers[`${optionKey}-${option.toLowerCase().replace(" ", "-")}`];

            if (modifier) {
                if (modifier.price) totalPrice += modifier.price;
                if (modifier.hp) totalHP = modifier.hp;
                if (modifier.weight) totalWeight += modifier.weight;
                if (modifier.speed) topSpeed = modifier.speed;
                if (modifier.range) {
                    totalRange = selectedOptions.motor === "Double Motor" ? modifier.range.double : modifier.range.single;
                }
            }
        });

        // Update summary text
        summary.innerHTML = `
            <strong><h1>Build:</h1></strong><br>
             <p>Finish: ${selectedOptions.frame}<br>
             Wheels: ${selectedOptions.wheels}<br>
             Battery: ${selectedOptions.battery}<br>
             Motor: ${selectedOptions.motor}<br>
             <strong><b>Total Price:</b></strong> $${totalPrice}
             <strong><b>Total HP:</b></strong> ${totalHP} HP
             <strong><b>Weight:</b></strong> ${totalWeight} LBS
             <strong><b>Range:</b></strong> ${totalRange} Miles
             <strong><b>Top Speed:</b></strong> ${topSpeed} MPH </p>
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

            // Select new button
            button.classList.add("active");

            // Update selected options
            selectedOptions[category] = button.textContent.trim();

            // Update summary
            updateSummary();
        });
    });

    // Initialize summary display
    updateSummary();
});

