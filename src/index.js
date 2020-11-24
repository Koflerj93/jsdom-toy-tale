let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

fetch("http://localhost:3000/toys")
  .then(function(resp){
    return resp.json()
  }).then(function(objArray){
    for(const toy of objArray){
      renderToys(toy);
      console.log(toy)
    }
  })

const toyCollection = document.querySelector("#toy-collection")
const toyForm = document.querySelector(".add-toy-form")
const toyLikes = document.querySelector("#likes")


function renderToys(toyObj){
  console.log("a string")
  const toyContainer = document.createElement("div")
  toyContainer.classList.add('card')
  toyContainer.dataset.toyId = `${toyObj.id}`
  
  toyContainer.innerHTML = `
     <h2>${toyObj.name}</h2>
     <img src=${toyObj.image} class="toy-avatar">
     <p id="likes">${toyObj.likes} Likes</p>
     <button class="like-btn">Like</button>
  `

    toyCollection.append(toyContainer)  
}

toyForm.addEventListener("submit", newToy)

function newToy(event){
  event.preventDefault()

  const toyObj ={
      name: event.target.name.value,
      image: event.target.image.value,
      likes: 0
  }
  
  fetch("http://localhost:3000/toys",{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(toyObj),
  })
  .then(function(resp){
    return resp.json()
  }).then(function(obj){
    renderToys(obj)
  })
  toyForm.reset();
}


toyCollection.addEventListener("click", e => {
  if (e.target.className === 'like-btn') {
    let parentDiv = e.target.parentNode
    let likeNum = parseInt(parentDiv.children[2].innerText)
    parentDiv.children[2].innerText = `${likeNum += 1} Likes`
  
    fetch(`http://localhost:3000/toys/${parentDiv.dataset.toyId}`, {
      method: 'PATCH', 
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }, 
      body : JSON.stringify({"likes": `${likeNum}`})
    })
      .then(function(resp){
        return resp.json()
      }).then(function(obj){
        
        console.log(obj)
      })
      
    }

  })

