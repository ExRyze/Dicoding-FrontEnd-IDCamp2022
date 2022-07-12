const footer = document.querySelector("footer");
for(let i=0; i<10; i++) {
  footer.appendChild(document.createElement("div"));
}

const localStorageKey = 'Books';
const readed = document.querySelector("#readed");
const unread = document.querySelector("#unread");
var temporaryBookData = [];
var temporaryReadedBook = [];
var temporaryUnreadBook = [];
const book = `<img class="book">`;

if (typeof(Storage) !== 'undefined') {
  if (localStorage.getItem(localStorageKey) !== null) {
    temporaryBookData = JSON.parse(localStorage.getItem(localStorageKey));
    for(let i=0; i<temporaryBookData.length; i++){
      if(temporaryBookData[i]["isComplete"] == true) {
        temporaryReadedBook.push(temporaryBookData[i]);
        if(temporaryReadedBook.length <= 50) {
          readed.innerHTML += book;
        }
      } else {
        temporaryUnreadBook.push(temporaryBookData[i]);
        if(temporaryUnreadBook.length <= 50) {
          unread.innerHTML += book;
        }
      }
    }
  } else {
    localStorage.setItem(localStorageKey, JSON.stringify(temporaryBookData))
  }
}
function updateBooks() {
  var allBook = document.getElementsByClassName("book");
  for(let i=0; i<allBook.length; i++) {
    allBook[i].setAttribute("src", "asset/image/book.jpg")
  }
}
updateBooks();

function validateFormInput() {
  let input = document.forms["input"];
  let inputTitle = input["title"].value;
  let inputAuthor = input["author"].value;
  let inputYear = parseInt(input["year"].value);
  let inputIsComplete = input["isComplete"].checked;

  if (inputTitle == "" && inputAuthor == "" && inputYear == "") {alert("Please complete the form!");} 
  else if (inputTitle == "") {alert("Please input the title!");} 
  else if (inputAuthor == "") {alert("Please input the author!");} 
  else if (inputYear == "") {alert("Please input the year!");}
  else if (inputYear <= 0) {alert("Please input valid data!")}
  else {
    var bookId = new Date().valueOf();
    var inputBookData = {id: bookId, title: inputTitle, author: inputAuthor, year: inputYear, isComplete: inputIsComplete};
    temporaryBookData.push(inputBookData);
    localStorage.setItem(localStorageKey, JSON.stringify(temporaryBookData));
    alert("Your book is saved")
  }
}
function validateFormEdit(xId, i) {
  let input = document.forms["input"];
  let inputTitle = input["title"].value;
  let inputAuthor = input["author"].value;
  let inputYear = parseInt(input["year"].value);
  let inputIsComplete = input["isComplete"].checked;

  if (inputTitle == "" && inputAuthor == "" && inputYear == "") {alert("Please complete the form!");} 
  else if (inputTitle == "") {alert("Please input the title!");} 
  else if (inputAuthor == "") {alert("Please input the author!");} 
  else if (inputYear == "") {alert("Please input the year!");}
  else if (inputYear <= 0) {alert("Please input valid data!")}
  else {
    delete temporaryBookData[i];
    var inputBookData = {id: xId, title: inputTitle, author: inputAuthor, year: inputYear, isComplete: inputIsComplete};
    temporaryBookData[i] = (inputBookData);
    localStorage.setItem(localStorageKey, JSON.stringify(temporaryBookData));
    alert("Your book is updated");
  }
}

function validateFormSearch(y) {
    let input = document.forms["search"];
    let inputTitle = input["title"].value;
    let result = [];
    for(let i=0; i<y.length; i++) {
      if(y[i]['title'].includes(inputTitle)){
        result.push(y[i])
      }
    }
    var data = document.querySelectorAll(".data");
    for(let i=0; i<data.length; i++) {
      data[i].remove();

    }
    setDataBooks(result);
    updateBooks();
    getAction(result);
}

function checkType(xh) {
  if(xh == monitorh) {setFormSearch("temporaryBookData"); setDataBooks(temporaryBookData); updateBooks(); getAction(temporaryBookData);}
  else if(xh == readedh) {setFormSearch("temporaryReadedBook"); setDataBooks(temporaryReadedBook); updateBooks(); getAction(temporaryReadedBook);}
  else if(xh == unreadh) {setFormSearch("temporaryUnreadBook"); setDataBooks(temporaryUnreadBook); updateBooks(); getAction(temporaryUnreadBook);}
}
function setFormSearch(x) {
  var dataset = document.querySelector(".dataset");
  dataset.innerHTML +=
  ` <div class="search">
      <form name="search" id="search" onsubmit="return false">
        <input autocomplete="off" type="text" name="title" placeholder="Input Title">
        <button onclick="validateFormSearch(`+x+`)">Search</button>
      </form>
    </div>`;
}
function setDataBooks(x) {
  x.sort(function(a, b){
    let x = a.title.toLowerCase();
    let y = b.title.toLowerCase();
    if (x < y) {return -1;}
    if (x > y) {return 1;}
    return 0;
  });
  for(let i=0; i<x.length; i++){
    var Id = x[i]['id'];
    var title = x[i]['title'];
    var author = x[i]['author'];
    var year = x[i]['year'];
    var isComplete = checkIsComplete(x[i]['isComplete'], "Readed", "Unread");
    addDatasetChild(Id, title, author, year, isComplete);
  }
}
function checkIsComplete(x, xT, xF) {
  if(x === true) {return xT}
  else {return xF}
}
function addDatasetChild(id, title, author, year, isComplete) {
  var dataset = document.querySelector(".dataset");
  dataset.innerHTML += 
  `<div class="data">
    <div class="data-contain">
      <img class="cover-book book">
      <div class="book-desc">
        <p class="title">Title :</p>
        <h3>`+title+`</h3>
        <table>
          <tr class="author">
            <td class="li"><li></li></td>
            <td class="sub">Author</td>
            <td class="colon">:</td>
            <td class="sub-data">`+author+`</td>
          </tr>
          <tr class="year">
            <td class="li"><li></li></td>
            <td class="sub">Year</td>
            <td class="colon">:</td>
            <td class="sub-data">`+year+`</td>
          </tr>
          <tr class="isComplete">
            <td class="li"><li></li></td>
            <td class="sub">Status</td>
            <td class="colon">:</td>
            <td class="sub-data">`+isComplete+`</td>
          </tr>
        </table>
        <h3>Action :</h3>
        <div class="action">
          <div id="`+id+`" class="edit"><p>Edit</p></div>
          <div id="`+id+`" class="delete"><p>Delete</p></div>
        </div>
      </div>
    </div>
  </div>`
}

function getAction(x) {
  edited = document.querySelectorAll(".edit");
  deleted = document.querySelectorAll(".delete");
  if(x.length > 0) {
    repeatGetAction(x, edited);
    repeatGetAction(x, deleted);
  }
}
function repeatGetAction(x, xe) {
  if(xe == edited) {
    for(let i=0; i<x.length; i++) {
      xe[i].addEventListener("click", function() {
        xId = xe[i].id;
        if(x[i]['id'] == xId) {
          for(let j=0; j<temporaryBookData.length; j++) {
            if(xId == temporaryBookData[j]['id']) {
              index = j;
              let xTitle = temporaryBookData[j]['title'];
              let xAuthor = temporaryBookData[j]['author'];
              let xYear = temporaryBookData[j]['year'];
              let xIsComplete = temporaryBookData[j]['isComplete'];
              containerh.innerHTML = editBookh;
              containerd.innerHTML = addBookd("validateFormEdit(xId, index)");
    
              let input = document.forms["input"];
              input["title"].value = xTitle;
              input["author"].value = xAuthor;
              input["year"].value = xYear;
              input["isComplete"].checked = checkIsComplete(xIsComplete, true, false);
            }
          }
        }
      });
    }
  } else if(xe == deleted) {
    ye = xe
    for(let i=0; i<x.length; i++) {
      ye[i].addEventListener("click", function() {
        yId = ye[i].id;
        if(x[i]['id'] == yId) {
          for(let j=0; j<temporaryBookData.length; j++) {
            if(yId == temporaryBookData[j]['id']) {
              if(confirm("Are you really want to delete this book?") == true) {
                temporaryBookData.splice(j, 1);
                localStorage.setItem(localStorageKey, JSON.stringify(temporaryBookData));
                location.reload();
              }
            }
          }
        }
      });
    }
  }
}

const question = document.querySelector(".question");
const monitor = footer.querySelector(".monitor");
const container = document.querySelector(".container");
const readedBooks = document.querySelectorAll("#readed .book");
const unreadBooks = document.querySelectorAll("#unread .book");

const questionh = `Information`;
const monitorh = `Books`;
const addBookh = `Add Book`;
const editBookh = `Edit Book`;
const readedh = `Readed Books`;
const unreadh = `Unread Books`;

const questiond = 
`<div class="information">
  <div>
    <p> Hi! Welcome to this website, <br>
        this website created for final submission in "Belajar Membuat Front-End Web untuk Pemula" class on IDCamp2022. The creator hope this is what the reviewer team wants.</p>
    <p> On this website, users can manage books, such as adding, deleting, or editing books.</p>
  </div>
  <div>
    <h3>- Note:</h3>
    <ol>
      <li>To view all books, click the monitor image.</li>
      <li>And to view specific books, such as readed or unread, click a book on the respective shelf.</li>
      <li>Then, to add new book data, click the monitor image (or click a book on the respective shelf), then click the "+" icon, and enter the book data you want to add.</li>
      <li>The picture of the book is just a decoration, actually the creator wants to add a feature to add a book cover, so the picture shown is just a decoration.</li>
    </ol>
  </div>
  <div class="copyright"><p>Created by <span><a href="https://github.com/ExRyze">ExRyze</a></span> | &copy 2022</p></div>
</div>`;
const monitord = 
`<div class="addBook">
  <h2>+</h2>
</div>
<div class="dataset">
</div>`;
function addBookd(validate) {
  return form = 
`<div class="dataset add-dataset">
  <div class="data">
    <div>
      <h3>Input Data</h3>
      <form name="input" onsubmit="`+validate+`">
        <label for="title">Title :</label>
        <input autocomplete="off" type="text" name="title" id="title" placeholder="Input Title">
        <label for="author">Author :</label>
        <input autocomplete="off" type="text" name="author" id="author" placeholder="Input Author">
        <label for="year">Year :</label>
        <input autocomplete="off" type="number" name="year" id="year" placeholder="Input Year">
        <input type="checkbox" name="isComplete" id="isComplete">
        <label for="isComplete">Readed</label>
        <input type="submit" value="Submit">
      </form>
    </div>
  </div>
</div>`
};

const containerh = container.querySelector("h2");
const containerd = container.querySelector(".desc");

containerVisible(question, questionh, questiond);
setUpBooks(monitor, monitorh);
repeatBookShelf(readedBooks, readedh);
repeatBookShelf(unreadBooks, unreadh);

function repeatBookShelf(x, xh){
  for(let i=0; i<x.length; i++) {
    setUpBooks(x[i], xh);
  }
}
function setUpBooks(x, xh) {
  x.addEventListener("click", function() {
    container.classList.add("active");
    containerh.innerHTML = xh;
    containerd.innerHTML = monitord;
    addBook = containerd.querySelector(".addBook");
    checkType(xh)
    containerVisible(addBook, addBookh, addBookd("validateFormInput()"))
  });
}
function containerVisible(x, xh, xd) {
  x.addEventListener("click", function() {
    container.classList.add("active");
    containerh.innerHTML = xh;
    containerd.innerHTML = xd;
    x.classList.add("active");
  });
};

const closeButton = document.querySelector(".close");
closeButton.addEventListener("click", function() {
  container.classList.remove("active");
  question.classList.remove("active");
  monitor.classList.remove("active");
});