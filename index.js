let cards = document.querySelector('.cards')


// Fetching from our database and creating cards.
function fetchData(){
    fetch('https://zero-hunger-server.onrender.com/zero-hunger')
    .then(res => res.json())
    .then(images => renderImage(images))
    .catch(error => console.log(error))
}



// To render the images
function renderImage(images){
    for (image of images){
        let imageCard = document.createElement('div')
        imageCard.className = 'max-w-sm rounded overflow-hidden shadow-lg hover:-translate-y-1 hover:scale-110 duration-300'
        imageCard.innerHTML = `
        <div class="max-w-sm rounded overflow-hidden shadow-lg">
        <img class="w-full h-full" src="${image.image}">
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">${image.county} County</div>
            <p class="text-gray-700 text-base">County: ${image.county}</p>
            <div class="container flex items-center justify-between">
                <p>Donations: ${image.donation} USD</p>
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

    form.addEventListener('submit', (e)=>{

        // Loop through the objects, and check if the country is valid.
        e.preventDefault()
        // console.log(country.value.toLowerCase())
        fetch('https://zero-hunger-server.onrender.com/zero-hunger')
        .then(res => res.json())
        .then(counties => updateDonations(counties))
        .catch(err => console.log(err))
        })
        // PATCH- To update the donations.
    //     fetch('http://localhost:3000/zero-hunger', {
    //         method: "PATCH",
    //         headers: {'Content-Type': "application/json"},
    //         body: JSON.stringify({donation: amount.value})
    //     })
    // })
    // .then(response => response.status)
    // .catch(error => console.log(error))
}


function updateDonations(counties){
    let countyDonated = document.getElementById('county')
    let amount = document.getElementById('amount')
    let warning = document.getElementById('warning')
    
    for(county of counties){
        // let updatedDonation = (parseInt(county.donation) + amount.value)
        // console.log(updatedDonation)
        if(countyDonated.value.toLowerCase() === county.county.toLowerCase()){

            let updatedDonation = (parseInt(county.donation) + parseInt(amount.value))
            fetch(`https://zero-hunger-server.onrender.com/zero-hunger/${county.id}`, {
                method: "PATCH",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    donation: updatedDonation
                })
            })
            .then(res => console.log(res.status))
            .catch(error => console.log(error))
        } else{
            warning.innerText = 'Invalid county or amount, please try again!'
        }
        // else{
        //     console.log('County not found')
        // }
    }
}



fetchData()
makeDonation()