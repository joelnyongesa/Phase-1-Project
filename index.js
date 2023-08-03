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
          <div class="font-bold text-xl mb-2">${image.county} County</div>
            <p class="text-gray-700 text-base">County: ${image.county}</p>
            <div class="container flex items-center justify-between">
                <p>Donations so far: ${image.donation}</p>
                <button id="donate" class="bg-gray-700 hover:bg-gray-700 text-white py-2 px-4 border rounded transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-gray-900 duration-300 ...">Make a Donation!</button>
            </div>
        
        </div>
      
      </div>
        `
        cards.appendChild(imageCard)
        
    }
    
}


// Adding event listener to form.
function makeDonation(){
    let form = document.getElementById('form')
    let country = document.getElementById('country')
    let amount = document.getElementById('amount')
    form.addEventListener('submit', (e)=>{
        e.preventDefault()
        // PATCH- To update the donations.
        fetch('http://localhost:3000/zero-hunger', )
    })
}




fetchData()
makeDonation()