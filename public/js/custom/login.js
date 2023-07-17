window.addEventListener('DOMContentLoaded', () => {
  const signInBtn = document.querySelector('#sign-in-btn');
  const signUpBtn = document.querySelector('#sign-up-btn');
  const container = document.querySelector('.container');

  signInBtn.addEventListener('click', () => {
    container.classList.remove('sign-up-mode');
  });

  signUpBtn.addEventListener('click', () => {
    container.classList.add('sign-up-mode');
  });
});

// const signupForm = document.querySelector('#signup-form');
// const loginForm = document.querySelector('#login-form');
// signupForm.addEventListener('submit', (e) => {
//   e.preventDefault();

//   // Get the signup form data
//   const formData = new FormData(signupForm);
//   const username = formData.get('username');
//   const email = formData.get('email');
//   const password = formData.get('password');

//   // Create an object with the signup form data
//   const signupData = {
//     username,
//     email,
//     password,
//   };

//   // Send a POST request to the server with the signup data
//   fetch('/signup', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(signupData),
//   })
//     .then((response) => response.text())
//     .then((message) => {
//       console.log(message);
//       signupForm.reset(); // Clear the form
//       // You can handle the server response here,
//       // such as displaying a success message to the user or redirecting to another page
//     })
//     .catch((error) => {
//       console.error('Error:', error);
//       // Handle any error that occurred during the request
//     });
// });

// loginForm.addEventListener('submit', (e) => {
//   e.preventDefault(); // Prevent the default form submission behavior

//   // Get the login form data
//   const formData = new FormData(loginForm);
//   const username = formData.get('username');
//   const password = formData.get('password');

//   // Create an object with the login form data
//   const loginData = {
//     username,
//     password,
//   };

//   // Send a POST request to the server with the login data
//   fetch('/login', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(loginData),
//   })
//     .then((response) => response.text())
//     .then((message) => {
//       console.log(message);
//       loginForm.reset(); // Clear the form
//       // You can handle the server response here,
//       // such as displaying a success message to the user or redirecting to another page
//     })
//     .catch((error) => {
//       console.error('Error:', error);
//       // Handle any error that occurred during the request
//     });
// });
