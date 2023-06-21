// Access the registration form
const registrationForm = document.getElementById('registrationForm');

// Add an event listener for form submission
registrationForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent default form submission

  // Retrieve the form field values
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Perform client-side validation
  if (!name || !email || !password) {
    alert('Please fill out all fields');
    return;
  }

  // Prepare the registration data to be sent to the server
  const registrationData = { name, email, password };

  // Send the registration data to the server
  fetch('/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(registrationData)
  })
    .then(response => {
      if (response.ok) {
        alert('Registration successful!');
        // Perform any necessary actions after successful registration
      } else {
        alert('Registration failed. Please try again.');
        // Handle the registration failure
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    });
});

