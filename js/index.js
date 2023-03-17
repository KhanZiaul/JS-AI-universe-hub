// Sorting all cards and limited cards by published dates

// Sorting all cards via dates

document.getElementById('seeMoreButton').addEventListener('click',function(){

    document.getElementById('sort-btn').addEventListener('click',function (){
  
        fetch('https://openapi.programming-hero.com/api/ai/tools')
       .then(res => res.json())
       .then(datas => sortByDate(datas.data.tools))
       .catch(error => {
        alert('error found no data for loading')
       }) 
    });
  
    function sortByDate(allData){
  
       allData.sort((a, b) => Date.parse(a.published_in) - Date.parse(b.published_in));
  
       showData(allData,false);  
    }
  })

  // Sorting limited cards via dates

document.getElementById('sort-btn').addEventListener('click',function(){

    fetch('https://openapi.programming-hero.com/api/ai/tools')
    .then(res => res.json())
    .then(datas => sortByDate(datas.data.tools))
    .catch(error => {
        alert('error found no data for loading')
    })
});


function sortByDate(allData){

  console.log(allData);

  let sliceAllData = allData.slice(0,6);

  console.log(sliceAllData);

  sliceAllData.sort((a, b) => Date.parse(a.published_in) - Date.parse(b.published_in));

  showData(sliceAllData,true);
   
}
 

// Fetch for showing limited cards

const loadData = async() => {

try{
const res = await fetch('https://openapi.programming-hero.com/api/ai/tools')
const datas = await res.json();
showData(datas.data.tools, true)
}
catch(error){
    alert('error found no data for loading')
}

}


// Fetch for showing all cards by see more button

document.getElementById('seeMoreButton').addEventListener('click', function () {

    fetch('https://openapi.programming-hero.com/api/ai/tools')
      .then(res => res.json())
      .then(datas => showData(datas.data.tools, false))
      .catch(error => {
        alert('error found no data for loading')
    })
  
    document.getElementById('seeMoreButton').classList.add('hidden');
  });

  
// Function for showing limited cards and all cards

function showData(data, trueOrFalse) {

    const cards = document.getElementById('cards');
  
    cards.innerHTML = "";
  
    // To show limited cards
  
    if (trueOrFalse) {
  
      data.slice(0, 6).forEach(element => {
  
        const createDiv = document.createElement('div');
  
        createDiv.innerHTML = `
  
          <div class="border-2 rounded-xl p-5">
  
            <img class="h-[200px] rounded-xl" src="${element.image}" alt="no image">
  
            <h2 class="mt-5 text-2xl font-bold"> Features </h2>
          
            <div class="mt-5">
  
               ${element.features.map((single) => {
                const list = document.createElement('ol')
  
                return list.innerHTML =`<li>${single}</li>`}).join('')}
            
              </div>
              <div class="mt-3">
                 <hr>
              </div>
  
              <div class="flex justify-between items-center">
                <div>
                   <h2 class="my-5 font-bold">${element.name} </h2>
                   <p> <i class="fa-regular fa-calendar-days"> </i> ${element.published_in} </p>
              </div>
  
                <div> 
  
                     <label onclick="showDetails('${element.id}')"  for="my-modal-5" class="fa-solid fa-arrow-right cursor-pointer text-red-300 rounded-full bg-red-100 p-1"></label>  
  
                  </div>
  
              </div>
          `;
  
        cards.appendChild(createDiv);
  
      });
    }
  
    else {
  
      // To show all cards
  
      data.forEach(element => {
  
        const createDiv = document.createElement('div');
  
        createDiv.innerHTML = `
  
          <div class="border-2 rounded-xl p-5">
  
            <img class="h-[200px] rounded-xl" src="${element.image}" alt="no image">
  
            <h2 class="mt-5 text-2xl font-bold"> Features </h2>
          
            <div class="mt-5">
  
            ${element.features.map((single) => {
              const list = document.createElement('ol');
              
              return list.innerHTML =`<li>${single}</li>`
            }).join('')}
  
              </div>
              <div class="mt-3">
                 <hr>
              </div>
  
              <div class="flex justify-between items-center">
                <div>
                   <h2 class="my-5 font-bold">${element.name} </h2>
                   <p> <i class="fa-regular fa-calendar-days"> </i> ${element.published_in} </p>
              </div>
  
                <div>
  
                      <label onclick="showDetails('${element.id}')"  for="my-modal-5" class="fa-solid fa-arrow-right cursor-pointer  text-red-300 rounded-full bg-red-100 p-1"></label>   
  
                  </div>
  
              </div>
          `;
  
        cards.appendChild(createDiv);
  
      });
  
    }
  
    document.getElementById('showLoding').classList.add('hidden')
  }

// For showing every single card details by id

// Fetch for showing card details

function showDetails(id) {

    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
  
    fetch(url)
      .then(res => res.json())
      .then(data => showIdDetails(data))
      .catch(error => {
        alert('error found no data for loading')
    })
  }

  //  Function for showing every single card details

function showIdDetails(detail){

    // description , pricing , features and integrations parts
  
        document.getElementById('description').innerText = `${detail.data.description}` ;
  
        document.getElementById('pricingOne').innerHTML = `
          <p> ${detail.data.pricing? detail.data.pricing[0].price :'Free of' } </p>
          <p class="mt-2"> ${detail.data.pricing? detail.data.pricing[0].plan : `Cost/Basic`} </p>`;
  
        document.getElementById('pricingTwo').innerHTML = `
          <p> ${detail.data.pricing? detail.data.pricing[1].price :'Free of' } </p>
          <p class="mt-2"> ${detail.data.pricing? detail.data.pricing[1].plan : `Cost/Pro`} </p>`;
  
        document.getElementById('pricingThree').innerHTML = `
          <p> ${detail.data.pricing? detail.data.pricing[2].price :'Free of' } </p>
          <p class="mt-2"> ${detail.data.pricing? detail.data.pricing[2].plan : `Cost /Enterprise` } </p> `;
  
           function showFeature(){
  
              let features = detail.data.features; 
                let featureInnerHTML = '';
                  for (const feature in features) {
                     featureInnerHTML += `<ul class="ml-7 list-disc block">
                     <li class = "text-gray-500">${ features[feature].feature_name } </li>
                        </ul>`;
                  }
                     return featureInnerHTML;
                  }
                   
  
        document.getElementById('features').innerHTML =` ${detail?.data?.features ? showFeature() : 'No data Found' } `;

            function showIntegration(){
    
              let integration = detail.data.integrations; 
                let integrationsInnerHTML = '';
                  for (const value in integration) {
                     integrationsInnerHTML += `<ul class= "ml-7 list-disc block">
                     <li class = "text-gray-500"> ${integration[value]}</li>
                        </ul>`;
                  }
                     return integrationsInnerHTML;
                  }
  
        document.getElementById ('integrations').innerHTML = ` ${detail?.data?.integrations? showIntegration() : 'No data Found'}`;
  
    // accuracy , image , input and output examples parts
  
        document.getElementById('image').setAttribute('src',`${detail.data.image_link[0]}`)
  
        document.getElementById('input').innerText = `${detail.data.input_output_examples? detail.data.input_output_examples[0].input : "Can you give any example?"}`
  
        document.getElementById('output').innerText = `${detail.data.input_output_examples? detail.data.input_output_examples[0].output : "No! Not Yet! Take a break!!!"}`
  
  
            function convertAccuracy(value){
              const accuracy = 100 * value;
                document.getElementById('accuracy').innerText = accuracy;
  
            }
              if(detail?.data?.accuracy?.score){
                convertAccuracy(detail.data.accuracy.score);
                document.getElementById('accuracyParent').classList.remove('hidden');
              }
              else{
                document.getElementById('accuracyParent').classList.add('hidden');
              }
  }