let cards = document.querySelector('.cards')

// Fetching from our database and creating cards.
function fetchData(){
    fetch('http://localhost:3000/zero-hunger')
    .then(res => res.json())
    .then(images => renderImage(images))
    .catch(error => console.log(error))
}



// To render the images
function renderImage(images){
    for (image of images){
        let imageCard = document.createElement('div')
        imageCard.className = 'max-w-sm rounded overflow-hidden shadow-lg'
        imageCard.innerHTML = `
        <div class="max-w-sm rounded overflow-hidden shadow-lg">
        <img class="w-full h-full" src="${image.image}">
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
          <p class="text-gray-700 text-base">
            County: ${image.county}
          </p>
        </div>
      
      </div>
        `
        cards.appendChild(imageCard)
        
    }
}


fetchData()