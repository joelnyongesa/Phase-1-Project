/*
TODO:
Add event listeners (2)
Table to display the donations and donors.
*/



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
        imageCard.className = 'max-w-sm rounded overflow-hidden shadow-lg hover:-translate-y-1 hover:scale-110 duration-300 mx-10 my-10'
        imageCard.innerHTML = `
        <div class="max-w-sm rounded overflow-hidden shadow-lg">
        <img class="image" src="${image.image}">
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">${image.county} County</div>
            <p class="text-gray-700 text-base">County: ${image.county}</p>
            <div class="container flex items-center justify-between">
                <p>Donations: ${image.donation} USD</p>
                <button id="donate" class="bg-gray-700 hover:bg-gray-700 text-white py-2 px-2 border rounded transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-gray-900 duration-300 ...">Make a Donation!</button>
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
        .then(counties =>{
            updateDonations(counties);
            updateDonors(counties);
        })
        .catch(err => console.log(err))
        })
}


function updateDonations(counties){
    
    let countyDonated = document.getElementById('county')
    let amount = document.getElementById('amount')
    let warning = document.getElementById('warning')
    
    let countyMatched = false; // Flag variable to track if any county matches

    for (county of counties) {
    if (countyDonated.value.toLowerCase() === county.county.toLowerCase()) {
        countyMatched = true; // County matched the condition
        let updatedDonation = parseInt(county.donation) + parseInt(amount.value);
        fetch(`https://zero-hunger-server.onrender.com/zero-hunger/${county.id}`, {
        method: "PATCH",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            donation: updatedDonation
        })
        })
        .then(res => {
        if (res.status === 200) {
            // If the donation update is successful
            warning.style.color = 'green'; // Change the text color to green
            warning.innerText = 'Thank you for your donation';
            document.getElementById('thankYouMessage').classList.remove('hidden'); // Show the thank you message
        } else {
            // If there was an error in the donation update
            warning.style.color = 'red'; // Change the text color to red
            warning.innerText = 'Error updating donation, please try again';
        }
        })
        .catch(error => {
        // If there was an error in the fetch request
        warning.style.color = 'red'; // Change the text color to red
        warning.innerText = 'Error updating donation, please try again';
        console.log(error);
        });

        break; // Exit the loop once a match is found
    }
    }

    if (!countyMatched) {
    warning.style.color = 'red'; // Change the text color to red
    warning.innerText = 'Invalid county or amount, please try again!';
    document.getElementById('thankYouMessage').classList.add('hidden'); // Hide the thank you message
    }


    
}


function updateDonors(counties){
    let donor = document.getElementById('donor')
    let countyDonated = document.getElementById('county')
    let amount = document.getElementById('amount')
    // console.log(donor.value, countyDonated.value, amount.value)



    for(county of counties){
        if (countyDonated.value.toLowerCase() === county.county.toLowerCase()){
            fetch(`https://zero-hunger-server.onrender.com/zero-hunger/${county.id}`, {
                method: "PATCH",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                donors: {
                    [donor.value] : amount.value
                }
                })
            })
            .then(res => console.log(res.status))
        }
    }


}


// Adding a county card to the current counties.
function addCountyCard(){
    let countyForm = document.getElementById('add-county')
    countyForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        let newCounty = document.getElementById('new-county').value
        let newImage = document.getElementById('new-image').value
        let newDonation = document.getElementById('new-donations').value

        // console.log(newCounty, newImage, newDonation)
        fetch('https://zero-hunger-server.onrender.com/zero-hunger', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                county: newCounty,
                image: newImage,
                donation: newDonation
            })
        })
    })
}





fetchData()
makeDonation()
addCountyCard()
// displayDonors()