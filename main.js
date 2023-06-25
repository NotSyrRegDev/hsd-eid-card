const canvasContainer = document.getElementById('canvas-container');
const cardChoosing = document.getElementById('choosing_card');
const formTyping = document.getElementById('forming_typing');
const formResult = document.getElementById('forming_result');
const errorMessage = document.getElementById('error-message');
const nameInput = document.getElementById('name');
const downloadLink = document.getElementById('download-link');
const beforeLoading = document.getElementById('before-loading-container');
const afterLoading = document.getElementById('after-loading-container');


let choosedCard = 1;
let choosedCardSettings = { 
  x: 100,
  y: 275,
  color: '#fff',
  font: 32,

}

function choosingCard(param) {

  if (param == 5) { 
    choosedCardSettings.font = 28;
    choosedCardSettings.y = 75;
    choosedCardSettings.color = '#800e0d';
  }
  else if (param == 1) { 
    choosedCardSettings.y = 290;
  }
  else if (param == 2) {
    choosedCardSettings.color = '#000';
    choosedCardSettings.y = 270;
    choosedCardSettings.font = 30;
  }
  else {
    choosedCardSettings.y = 275;
    choosedCardSettings.color = '#fff';
    choosedCardSettings.font = 32;
  }

  choosedCard = param;
  cardChoosing.style.display = 'none';
  formTyping.style.display = 'block';

 

}


function drawCanvasImage() {
  showButton.disabled = true;

  setTimeout(function() {
    showButton.disabled = false;
  }, 1000); // Change this delay as needed



  // Create a new canvas element
  const canvas = document.createElement('canvas');


  // Create a new canvas context
  const ctx = canvas.getContext('2d');

  // Load an image onto the canvas
  const img = new Image();
  img.src = `./assets/cards/card-${choosedCard}.jpg`;
  img.crossOrigin = 'anonymous'; // set the crossorigin attribute to enable CORS


  setTimeout(() => {

    beforeLoading.style.display = 'none';
    afterLoading.style.display = 'block';
  }, 2500);

  img.onload = () => {
    const aspectRatio = img.width / img.height;

    // Set the size of the canvas element
    canvas.width = 800;
    canvas.height = canvas.width / aspectRatio;

    // Create a new canvas context
    const ctx = canvas.getContext('2d');

    // Draw the image onto the canvas
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // Add some text to the canvas
    ctx.font = `900 ${choosedCardSettings.font}px  Alexandria`;
    ctx.fillStyle = choosedCardSettings.color;

    const text =  nameInput.value;
    const textWidth = ctx.measureText(text).width;
    const textHeight = parseInt(ctx.font);
    const x = canvas.width / 2 - textWidth / 2;
    const y = canvas.height - textHeight - choosedCardSettings.y;
    ctx.fillText(text, x, y);

    formTyping.style.display = 'none';
    formResult.style.display = 'block';
    // Add the canvas to the container
    canvasContainer.appendChild(canvas);

    downloadLink.addEventListener('click', () => {
        const link = document.createElement('a');
        link.download = 'عيدية النادي.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
      


  };
}

const showButton = document.querySelector('.show_btn');
showButton.addEventListener('click', () => {
    
    const name = nameInput.value;
  
    if (name.trim() === '') {
       
        errorMessage.style.display = 'block';
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 2500);
    } else {
      errorMessage.style.display = 'none';
      drawCanvasImage();
    }
});


function playAgain(param) {

    if (param == 0) {
      cardChoosing.style.display = 'block';
      formTyping.style.display = 'none';
      nameInput.value = '';
    }
    else {
      formTyping.style.display = 'block';
      formResult.style.display = 'none';
      cardChoosing.style.display = 'block';
      formTyping.style.display = 'none';
      nameInput.value = '';
      canvasContainer.innerHTML = '';
    }
}


