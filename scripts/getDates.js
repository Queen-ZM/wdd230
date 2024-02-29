let d = new Date();

let newUpdate = document.getElementById('footer-sect');
newUpdate.querySelector('#currentYear').innerHTML = d.getFullYear();
newUpdate.querySelector('#currentDateAndTime').innerHTML = document.lastModified;



const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', () => {
  navigation.classList.toggle('open');
  hamButton.classList.toggle('open');
});



let visitCount = localStorage.getItem('visitCount');

if (visitCount === null) {
    
    visitCount = 0;
} else {
    
    visitCount = parseInt(visitCount);
}

const visitCountElement = document.getElementById('visit-count');
visitCountElement.textContent = visitCount;

visitCount++;
visitCountElement.textContent = visitCount;


localStorage.setItem('visitCount', visitCount.toString());


function updateRangeValue() {
  const rangeValue = document.getElementById('page_rating').value;
  const rangeValueDisplay = document.getElementById('range-value');
  rangeValueDisplay.textContent = rangeValue;
}


var $password = $("#password");
var $confirmPass = $("#confirm_password");

//Check the length of the Password
function checkLength(){
  return $password.val().length > 8;
}

//Check to see if the value for pass and confirmPass are the same
function samePass(){
  return $password.val()===$confirmPass.val();
}

//If checkLength() is > 8 then we'll hide the hint
function PassLength(){
  if(checkLength()){
    $password.next().hide();
  }else{
    $password.next().show();
  }
}

//If samePass returns true, we'll hide the hint
function PassMatch(){
  if(samePass()){
    $confirmPass.next().hide();
  }else{
    $confirmPass.next().show();
  }
}
function canSubmit(){
  return samePass() && checkLength();
}
function enableSubmitButton(){
  $("#submit").prop("disabled",!canSubmit());
}
//Calls the enableSubmitButton() function to disable the button
enableSubmitButton();

$password.keyup(PassLength).keyup(PassMatch).keyup(enableSubmitButton);
$confirmPass.focus(PassMatch).keyup(PassMatch).keyup(enableSubmitButton);

