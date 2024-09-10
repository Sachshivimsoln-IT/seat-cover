document.getElementById('submit-button').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent default form submission
    const postalCode = document.getElementById('postal-code').value.trim();
    const feedbackElement = document.getElementById('feedback');
    const addressElement = document.getElementById('address');
    let valid = false;
    let address = '';

    // Check if the postal code matches any state's regex
    for (let state in postalCodeRanges) {
        if (postalCodeRanges[state].test(postalCode)) {
            valid = true;
            break;
        }
    }

    if (valid) {
        // Look up the city from the postal code
        address = postalCodeToCity[postalCode] || 'Address not found for this postal code.';
        addressElement.textContent = `Address: ${address}`;
        addressElement.classList.remove('hidden');
        feedbackElement.classList.add('hidden');

        // Set hidden inputs with postal code and address
        document.getElementById('hidden-postal-code').value = postalCode;
        document.getElementById('hidden-address').value = address;

        // Redirect after a short delay
        setTimeout(function() {
            window.location.href = `finalform.html?postal-code=${encodeURIComponent(postalCode)}&address=${encodeURIComponent(address)}`;
        }, 2000); // Shorter delay (2 seconds) for better user experience
    } else {
        // Show validation feedback
        feedbackElement.textContent = 'Please enter a valid Indian postal code.';
        feedbackElement.classList.remove('hidden');
        addressElement.classList.add('hidden');
    }
});
