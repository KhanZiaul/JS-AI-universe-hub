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


