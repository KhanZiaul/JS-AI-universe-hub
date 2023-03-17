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

