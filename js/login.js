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
      console.log(result.user);
      window.localStorage.setItem('storageUID', result.user.uid);
      saveData(result.user);
      // Guardando el UID en el localstorage
      let UID = window.localStorage.getItem('storageUID');
      console.log(UID);

      // Redireccionando al perfil
      alert('Registro exitoso');
 
      
    }).then(user => {
      window.location.href = 'views/collage.html';
    });
  });
  function saveData(user) {
    console.log(user);
    var userToSave = {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      photo: user.photoURL
    };
      // probando es el nombre de tu rama
    firebase.database().ref('users/' + user.uid).set(userToSave); // push añade un registro 
  }
});