(function () {
    var deferredPrompt;
  
    window.addEventListener('beforeinstallprompt', function (e) {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
  
      showAddToHomeScreen();
  
    });
  
  function showAddToHomeScreen() {
  
    var a2hsBtn = document.querySelector(".ad2hs-prompt");
  
    a2hsBtn.style.display = "flex";
  
    a2hsBtn.addEventListener("click", addToHomeScreen);
  
  }
  
    function addToHomeScreen() {
  
      var a2hsBtn = document.querySelector(".ad2hs-prompt");
  
      // hide our user interface that shows our A2HS button
      a2hsBtn.style.display = 'none';
  
      if (deferredPrompt) {
        // Show the prompt
        deferredPrompt.prompt();
  
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice
          .then(function (choiceResult) {
  
            if (choiceResult.outcome === 'accepted') {
              console.log('User accepted the A2HS prompt');
            } else {
              console.log('User dismissed the A2HS prompt');
            }
  
            deferredPrompt = null;
  
          });
  
      }
  
    }
  
    showAddToHomeScreen();
  
    window.addEventListener('appinstalled', function (evt) {
      console.log('a2hs', 'installed');
    });
  
  
  })();
var buttons = document.body.querySelectorAll('.buttons > button');
var output = document.querySelector('.output');

// Assigned variables
var operator = ['×', '÷', '-', '+', '%'];
var input = '';
var operatorFlag = false;
var dotFlag = false;
var equation = '';
var result = '';
var i;

//Initiate event listener for all buttons objects
for (i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function (e) {
        var btnText = this.innerHTML;
        if (btnText === 'AC') { // clear the screen
            input = '';
            operatorFlag = false;
            equation = '';
        } else if (btnText === 'CE') { // delete one character
            if(typeof input === 'string'){
                input = input.slice(0, input.length - 1);
            }
        } else if (btnText === '.') { // process the dot input
            if (input.indexOf('.') === -1 || dotFlag) { // only one dot is allowed
                input += '.';
                dotFlag = false;
            }
        } else if (btnText === '=') { // process the equation when equals button is pressed
            if (operator.indexOf(input[input.length - 1]) > -1) {
                input = input.slice(0, input.length - 1);
            }
            equation = input.replace(/×/g, '*');
            equation = equation.replace(/÷/g, '/');
            result = Math.round(eval(equation)*1000000)/1000000;
            input = result;
            operatorFlag = true;

        } else if (operator.indexOf(btnText) > -1) { // process the operator input
            if (operatorFlag) {
                input += btnText;
                operatorFlag = false;
            } else {
                if(typeof input === 'string'){
                    input = input.slice(0, input.length - 1) + btnText;
                }
            }
            dotFlag = true; // after operator character it is allowed to insert
                            // another dot in equation
        } else {
            if (result !== '' && operator.indexOf(input[input.length - 1]) > -1) {
                input += btnText;
                result = '';
            } else if (result !== '') {
                input = btnText;
                result = '';
            } else {
                input += btnText;
            }

            operatorFlag = true;
        }
        // print the result on the screen
        output.innerHTML = input;
    }
}
