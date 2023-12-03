let inputs = document.querySelectorAll(".input input");
//number input
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let totalinp = document.getElementById("total");

//the btn changer
let mood = "creat";

//get search mood

let searchmood = "title";

//tmep
let temp;
//delet all button

let deletallbtn = document.getElementById("deletall");

// item info
let count = document.getElementById("count");
let category = document.getElementById("category");

//submit input
let creat = document.getElementById("submit");

//the table body
let tbody = document.getElementById("tbody");

//search btn
let searchbytitlebtn = document.getElementById("searchbytitle");
let searchbycatogrybtn = document.getElementById("searchbycategory");

//get the search button
let search = document.getElementById("search");
search.placeholder = "search by title";


//data pro is array 
let datapro;
//if the lcoalStorge is not defind at the site
//and locastorge.product are already exist  
if (typeof localStorage != 'undefined' && localStorage.product) {
  // if (localStorage.product != null) {

  datapro = JSON.parse(localStorage.product);
  // }
} else {
  datapro = [];
}

creat.onclick = function () {
  //creat the main objec 
  let newpro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    totalinp: totalinp.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  //if the mood was creat then and the count of the product was heigher than one
  //well make for loop 
  if (mood === "creat") {
    if (newpro.count > 1) {
      for (i = 0; i < newpro.count; i++) datapro.push(newpro);
    } else {
      //else number is equel 1 then entre one product
      datapro.push(newpro);
    }
  } else {//if mood in not at creat mood (updatemood)
    //then it will edit the array with the new input value
    //temp variable is number coming from update function
    datapro[temp] = newpro;
    count.style.display = "block";
    //back the mood to normal
    mood = "creat";
    creat.innerHTML = "creat";
  }

  localStorage.setItem("product", JSON.stringify(datapro));
  inputs.forEach((input) => {
    input.value = "";
  });
  showdata();
  getTotal();
};

function deletall() {
  tbody.innerHTML = "";
  datapro.length = 0;
  localStorage.clear();
  dletbtncheck();
}

function showdata() {
  //show function will loop over the array and add them into the body
  let data = "";
  tbody.innerHTML = "";
  for (let i = 0; i < datapro.length; i++) {
    data = `
         <tr>
         <td>${[i + 1]}</td>
         <td>${datapro[i].title}</td>
         <td>${datapro[i].price}</td>
         <td>${datapro[i].taxes}</td>
         <td>${datapro[i].ads}</td>
         <td>${datapro[i].discount}</td>
         <td>${datapro[i].totalinp}</td>
         <td>${datapro[i].category}</td>
         <td><button id="update" onclick = "updateData(${i})" >update</button></td>
         <td><button id="delete" onclick="deletproduct(${i})" >delete</button></td>
         </tr>
         `;

    tbody.innerHTML += data;
  }

  getTotal();
  dletbtncheck();
}


//chech if there is elemnt on the array or not 
//if the delet btn all will apper else in wouldint
function dletbtncheck() {
  if (datapro.length <= 0) {
    deletallbtn.style.display = "none";
  } else {
    deletallbtn.style.display = "block";
    deletallbtn.innerHTML = `Delet All(${datapro.length})`;
  }
}

function deletproduct(i) {
  datapro.splice(i, 1);
  localStorage.product = JSON.stringify(datapro);
  showdata();
  dletbtncheck();
}

function updateData(i) {
  //when we click on update btn on html this function will take the number of the elemnt that exist on the html 
  //  <td><button id="update" onclick = "updateData(${i})" >update</button></td>
  title.value = datapro[i].title;
  price.value = datapro[i].price;
  taxes.value = datapro[i].taxes;
  ads.value = datapro[i].ads;
  discount.value = datapro[i].discount;
  totalinp.value = datapro[i].totalinp;
  category.value = datapro[i].category;
  getTotal();
  count.style.display = "none";
  creat.innerHTML = "update";
  mood = "update";
  temp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
  getTotal();
}
//get the tootal of all the values
function getTotal() {
  if (price.value != "") {
    let total = 0;
    total = +price.value + +taxes.value + +ads.value - +discount.value;
    totalinp.innerHTML = total;
    totalinp.style.background = "#040";
  } else {
    totalinp.style.background = "#a00d02";
    totalinp.innerHTML = "";
  }
}

function getsearchmood(id) {
  if (id === "searchbycategory") {
    searchmood = "category";
    search.placeholder = "search by category";
  } else if (id === "searchbytitle") {
    searchmood = "title";
    search.placeholder = "search by tittle";
  }

  search.focus();
  search.value = "";
  showdata();
}

function searchData(value) {
  let data = "";
  tbody.innerHTML = "";
  for (i = 0; i < datapro.length; i++) {
  if (searchmood == "title") {
      if (datapro[i].title.includes(value.toLowerCase())) {
      data += `
<tr>
<td>${[i + 1]}</td>
<td>${datapro[i].title}</td>
<td>${datapro[i].price}</td>
<td>${datapro[i].taxes}</td>
<td>${datapro[i].ads}</td>
<td>${datapro[i].discount}</td>
<td>${datapro[i].totalinp}</td>
<td>${datapro[i].category}</td>
<td><button id="update" onclick = "updateData(${i})" >update</button></td>
<td><button id="delete" onclick="deletproduct(${i})" >delete</button></td>
</tr>
`;
      }
       } else {
      if (datapro[i].category.includes(value)) {
          data += `
        <tr>
        <td>${[i + 1]}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].totalinp}</td>
        <td>${datapro[i].category}</td>
        <td><button id="update" onclick = "updateData(${i})" >update</button></td>
        <td><button id="delete" onclick="deletproduct(${i})" >delete</button></td>
        </tr>
        `;
        
      }
    }
  }
  tbody.innerHTML += data;
}

showdata();
