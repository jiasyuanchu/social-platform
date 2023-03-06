const BASE_URL = 'https://user-list.alphacamp.io'
const INDEX_URL = BASE_URL + '/api/v1/users/'

const users = JSON.parse(localStorage.getItem('connectedUsers')) || []

const dataPanel = document.querySelector('#data-panel')

function renderUserList(data) {
  let rawHTML = ''
  data.forEach((item) => {
    rawHTML += `
        <div class="col-sm-3 mt-2">
          <div class="mb-2">  
            <div class="card">
              <img src="${item.avatar}" class="card-img-top" alt="User Avatar">
              <div class="card-body">
                <h5 class="card-title">${item.name} ${item.surname}</h5>
                <p class="card-text">
                  <li>${item.age} y.o. </li>
                  <li>${item.region}</li>
                  <li>${item.email}</li> 
                </p>
                  <div class="card-footer text-muted">
                    <button class="btn btn-primary btn-show-user" data-bs-toggle="modal" data-bs-target="#user-modal" data-id="${item.id}">More details</button>
                  </div>
              </div>
            </div>
          </div>
        </div>`
  })

  dataPanel.innerHTML = rawHTML
}

function showUserModal(id) {
  const userModalTitle = document.querySelector('#user-modal-title')
  const userModalGender = document.querySelector('#user-modal-gender')
  const userModalCountry = document.querySelector('#user-modal-country')
  const userModalBirthday = document.querySelector('#user-modal-birthday')

  axios.get(INDEX_URL + id)
    .then((response) => {
      const data = response.data
      console.log(data)
      userModalTitle.innerText = data.name + " " + data.surname
      userModalGender.innerText = data.gender
      userModalCountry.innerText = data.region
      userModalBirthday.innerText = data.birthday
    })
}

//將modal裡面的內容改為當下的user的資料
dataPanel.addEventListener('click', function onPanelClicked(event) {
  if (event.target.matches('.btn-show-user')) {
    showUserModal(Number(event.target.dataset.id))
  } else if (event.target.matches('.btn-connect'))
    addToConnected(Number(event.target.dataset.id))
})

renderUserList(users)