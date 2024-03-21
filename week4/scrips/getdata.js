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
