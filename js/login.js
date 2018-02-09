window.addEventListener('load', function() {
  let inputEmail = document.getElementById('input-email');
  let inputPassword = document.getElementById('input-password');
  let loginBtn = document.getElementById('login-btn');
  let googleLogin = document.getElementById('login-google');
  let facebookLogin = document.getElementById('login-facebook');

  let validateEmail = false;
  let validatePassword = false;
  

  loginBtn.addEventListener('click', function(event) {
    console.log('click');
    event.preventDefault();
    window.location.href = 'views/collage.html';
  });

  function activeLoginBtn() {
    if (validateEmail && validatePassword) {
      loginBtn.removeAttribute('disabled');
    }
  }

  function inactiveLoginBtn() {
    loginBtn.hasAttribute('disabled', true);
  }

  inputEmail.addEventListener('input', function() {
    const regexEmail = /^[a-zA-Z0-9\._-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$/;
    console.log(regexEmail.test(inputEmail.value));
    if (regexEmail.test(inputEmail.value)) {
      validateEmail = true;
      activeLoginBtn();
      popEmail.classList.add('d-none');
      // inputEmail.tooltip('hide');
    } else {
      inactiveLoginBtn();
      popEmail.classList.remove('d-none');
      // inputEmail.tooltip('show');
    }
  });

  inputPassword.addEventListener('input', function() {
    const regexPassword = /^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z\0-9]{6}$/;
    console.log(regexPassword.test(inputPassword.value));
    if (regexPassword.test(inputPassword.value)) {
      validatePassword = true;
      activeLoginBtn();
      popPassword.classList.add('d-none');
    } else {
      popPassword.classList.remove('d-none');
    }
  });


  // Iniciando autentificación con Google
  var providerGoogle = new firebase.auth.GoogleAuthProvider();

  googleLogin.addEventListener('click', function() {
    firebase.auth().signInWithPopup(providerGoogle).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      console.log(user.displayName);
      console.log(user.photoURL);
      firebase.database().ref('users/' + user.uid).set({
        name: user.displayName,
        email: user.email,
        profilePhoto: user.photoURL
      }).then(
        user => {
          $(location).attr('href', 'collage.html');
        });
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  });
});