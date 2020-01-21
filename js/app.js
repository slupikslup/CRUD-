
var app = document.getElementById("app")
var div = document.createElement("div")
app.appendChild(div)

var form = document.createElement("form")
div.appendChild(form)
var input = document.createElement("input")
input.placeholder = "Type Your Name...."
input.id = "Name"
var input2 = document.createElement("input")
input2.placeholder = "Type  SurName...."
input2.id = "surName"
var input3 = document.createElement("input")
input3.placeholder = "Type  email"
input3.id = "email"
var input4 = document.createElement("input")
input4.type = "submit"
input4.id = "submit"
form.appendChild(input)
form.appendChild(input2)
form.appendChild(input3)
form.appendChild(input4)
form.onsubmit = (event) => {
    event.preventDefault() 
     if(document.getElementById("Name").value.length && document.getElementById("surName").value.length && document.getElementById("email").value.length){
    function formData(){
        var formData = {}
        event.stopPropagation()
        formData["name"] = document.getElementById("Name").value
        formData["surname"] = document.getElementById("surName").value
        formData["email"] = document.getElementById("email").value     
        return postData("http://localhost:3000/users", formData)
    }    
}

event.stopPropagation()
formData()
} 

var table = document.createElement("table")
table.id = "table"
var thead = document.createElement("thead")
var tbody = document.createElement("tbody")
app.appendChild(table)
table.appendChild(thead)
table.appendChild(tbody)

var button =  document.createElement("button")
button.innerText = "addNewUser"
button.onclick = insertNewUser
app.appendChild(button)

for(var i = 0 ; i < 5; i++){
    var th = document.createElement('th')
     thead.appendChild(th)
 }
var arrTh = document.getElementsByTagName("th")
Array.from(arrTh)[0].innerText = "ID"
Array.from(arrTh)[1].innerText = "NAME"
Array.from(arrTh)[2].innerText = "SURNAME"
Array.from(arrTh)[3].innerText = "EMAIL"
Array.from(arrTh)[4].innerText = "Editing"

function postData(url = '', data = {}) {
    // Значения по умолчанию обозначены знаком *
      return fetch(url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, cors, *same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
              'Content-Type': 'application/json',
              // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrer: 'no-referrer', // no-referrer, *client
          body: JSON.stringify(data), // тип данных в body должен соответвовать значению заголовка "Content-Type"
      })
      .then(response => response.json()); // парсит JSON ответ в Javascript объект
  }
  table.style.width = "700px"
  table.border = 1
  table.style.borderColor = "red"
  var i = -1
  function insertNewUser (){
    var table = document.getElementById("table").getElementsByTagName("tbody")[0]
    var row = table.insertRow(table.length) 
    cell = row.insertCell(0)
    fetch("http://localhost:3000/users").then((response) => response.json()).then((myJSON) =>   { if(i < myJSON.length) cell.innerHTML = myJSON[i].id})
    cell1 = row.insertCell(1)
    fetch("http://localhost:3000/users").then((response) => response.json()).then((myJSON) =>   {if(i < myJSON.length) cell1.innerHTML = myJSON[i].name})
    cell2 = row.insertCell(2)
    fetch("http://localhost:3000/users").then((response) => response.json()).then((myJSON) => { if(i < myJSON.length) cell2.innerHTML = myJSON[i].surname})
    cell3 = row.insertCell(3)
    fetch("http://localhost:3000/users").then((response) => response.json()).then((myJSON) =>  { if(i < myJSON.length) cell3.innerHTML = myJSON[i].email})
    cell4 = row.insertCell(4)
    cell4.innerHTML = "<button id='edit'>Edit</button><button type='submit' id='delete'>Delete</button>"
    document.getElementById("delete").onclick = (e) => {
      var g = `${cell.innerText}`
      e.preventDefault()
      e.stopPropagation()
      fetch(`http://localhost:3000/users/${g}`, {
     method:"DELETE"
    })
}
    i++
   }
  
