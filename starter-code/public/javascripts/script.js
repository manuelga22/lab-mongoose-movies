document.addEventListener('DOMContentLoaded', () => {

 function addCelebsAndShow(){
    let listCelebrities = document.getElementById('containerOfCelebrities');
    listCelebrities.innerHTML = "";

    axios.get('http://localhost:3000/showAndAdd/show')
    .then(response=>{
      let arrayOfObjects = response.data.reverse();

      arrayOfObjects.forEach(elements =>{
        let newDiv = document.createElement('div');

        newDiv.innerHTML= `
        <h5>${elements.name}</h5>
        <p>${elements.occupation}</p>
        <p>${elements.catchPhrase}</p>
       `
        listCelebrities.appendChild(newDiv);
      })
    
    }).catch(()=> console.log('error appending new info'))
  }
 
  setTimeout(addCelebsAndShow,3000);

  let quickAdd = document.getElementById('quick-add-btn');

  quickAdd.onclick = ()=>{

    let name = document.getElementById('quick-name');
    let occupation = document.getElementById('quick-occupation');
    let catchPhrase = document.getElementById('quick-catchPhrase');

    axios.post('http://localhost:3000/showAndAddScreen/add',{
     name: name.value,
     occupation: occupation.value,
     catchPhrase: catchPhrase.value,
    })
   .then(()=>{
    addCelebsAndShow();
   }).catch();


   addCelebsAndShow();



  }



  


}, false);
