import $ from "jquery";
import store from "./store";
import api from "./api";

// ######################## Page Generation ########################

const generateBookmarkTemplate = (bookmark) => {
  console.log("oh hey, generateBookmarkTemplate is working...");
  return `
    <li class="newBM" data-item-id="${bookmark.id}">
      <div class="bmTitleBox">
        <h3 id="bmTitle"><a href="${bookmark.url}" target="_blank">${
        bookmark.title}</a></h3>
      </div>
      <div class="starBar">
        <span class="${bookmark.rating >= 1 ? "fa fa-star checked" : "fa fa-star"}"></span>
        <span class="${bookmark.rating >= 2 ? "fa fa-star checked" : "fa fa-star"}"></span>
        <span class="${bookmark.rating >= 3 ? "fa fa-star checked" : "fa fa-star"}"></span>
        <span class="${bookmark.rating >= 4 ? "fa fa-star checked" : "fa fa-star"}"></span>
        <span class="${bookmark.rating === 5 ? "fa fa-star checked" : "fa fa-star"}"></span>
      </div>
      <div>
       <button id="expand">+</button>
      </div>
    </li>
    `;
};

const generateExpandedBookmarkTemplate = (bookmark) => {
  console.log("oh hey, generateExpandedBookmarkTemplate is working...");
  return `
    <li class="newBM expanded" data-item-id="${bookmark.id}">
      <div class="bmEXTitleBox">
        <h3 id="bmEXTitle"><a href="${bookmark.url}" target="_blank">${
        bookmark.title}</a></h3>
      </div>
      <div class="starBar">
        <span class="${bookmark.rating >= 1 ? "fa fa-star checked" : "fa fa-star"}"></span>
        <span class="${bookmark.rating >= 2 ? "fa fa-star checked" : "fa fa-star"}"></span>
        <span class="${bookmark.rating >= 3 ? "fa fa-star checked" : "fa fa-star"}"></span>
        <span class="${bookmark.rating >= 4 ? "fa fa-star checked" : "fa fa-star"}"></span>
        <span class="${bookmark.rating === 5 ? "fa fa-star checked" : "fa fa-star"}"></span>
      </div>
      <div class="bmDescBox">
        <p id="bmDesc">${bookmark.desc === "" ? "No description listed" : bookmark.desc}</p>
      </div>
      <div class="exButtonBar">
        <button id="delete">Delete</button>
        <button id="minimize">-</button>
      </div>
          </li>
    `;
};

const generateBookmarkCreationMenu = () => {
  return `
      <form id="createBookmark">
      <div class="error-container"></div>
        <label for="title-Entry">Title:</label>
          <input type="text" name="title" id="titleEntry" placeholder="Bookmark name" required>
        <br>
        <label for="url-Entry">URL Link:
        <br>
          <input type="url" name="url" id="urlEntry" placeholder="www.google.com" required>
        </label>
        <br>
        <label for="descEntry">Add a bookmark description (optional)
        <br>
        <textarea name="desc" id="desEntry" placeholder="Description here" default="null" cols="30" rows="10"></textarea>
        </label>
        <br>
        <div class="starBox"
        <label for="rating">Rate this bookmark:</label>
        <br>
          <input type="radio"  name="rating" id="str1" value="1" required><label for="str1">1 Star</label>
          <input type="radio"  name="rating" id="str2" value="2" required><label for="str2">2 Stars</label>
          <input type="radio"  name="rating" id="str3" value="3" required><label for="str3">3 Stars</label>
          <input type="radio"  name="rating" id="str4" value="4" required><label for="str4">4 Stars</label>
          <input type="radio"  name="rating" id="str5" value="5" required><label for="str5">5 Stars</label>
        </div>
        <button id="submitBtn">Submit</button>
        <input type="reset" id="resetBtn" value="Clear">
        <button id="addBmCancel">Cancel</button>
      </form>
    `;
};

const generateBookmarkString = function (bmList) {
  console.log("generateBookmarkString", bmList);
  // debugger
  let myBookmarks = bmList.map((bookmark) => {
    if (bookmark.expanded === true) {
      return generateExpandedBookmarkTemplate(bookmark);
    } else {
      return generateBookmarkTemplate(bookmark);
    }
  });

  myBookmarks.join("");
  console.log(myBookmarks);
  // debugger
  return myBookmarks;
};

const generateFilteredBookmarkString = function (bmList) {
  let myBookmarks = bmList.map((bookmark) => {
    if (bookmark.rating >= store.filter) {
      if (bookmark.expanded === true) {
        return generateExpandedBookmarkTemplate(bookmark);
      } else {
        return generateBookmarkTemplate(bookmark);
      }
    }
  });

  myBookmarks.join("");
  console.log(myBookmarks);
  // debugger
  return myBookmarks;
};

// ##################### Error Handling #############################

const generateError = (message) => {
  return `
    <section class="error-content">
      <button id="cancel-error">X</button>
      <p>${message}</p>
    </section>
  `;
};

const renderError = () => {
  if (store.error) {
    const e = generateError(store.error);
    $(".error-container").html(e);
  } else {
    $(".error-container").empty();
  }
  handleCloseError();
};

const handleCloseError = () => {
  $(".error-container").on("click", "#cancel-error", () => {
    store.setError(null);
    renderError();
  });
};

// ################################# Render Function #########################################

// if store.adding === true ========> creation menu
// else if store.filter = 0 ========> generatebmstring
// else ================> generate filteredbookmarkstring

const render = function () {
  renderError();
  let bmList = [...store.bookmarkData];
  console.log(bmList);
  // debugger
  if (store.adding === true) {
    $("#createBMDiv").html(generateBookmarkCreationMenu());
  } else if (store.filter === 0) {
    $("#createBMDiv").empty();
    const bookmarkString = generateBookmarkString(bmList);
    console.log("oh hey" + bookmarkString);
    // debugger
    $("#myBookmarks").html(bookmarkString);
  } else {
    const bookmarkString = generateFilteredBookmarkString(bmList);
    console.log("oh hey it Expanded" + bookmarkString);
    // debugger
    $("#myBookmarks").html(bookmarkString);
  }
};

//#################################### Event Handlers ######################################

const handleAddBookmarkBtn = () => {
  $("#addBookmarkBtn").on("click", (event) => {
    console.log("oh hey, someone clicked the Addbookmark button...");
    event.preventDefault();
    store.toggleAdding();
    render();
  });
};

const handleCancelAddBookmark = () => {
  $("#mainPage").on("click", "#addBmCancel", function (event) {
    event.preventDefault();
    store.adding = false;
    console.log(store.adding);
    // debugger
    render();
  });
};

$.fn.extend({
  serializeJson: function () {
    const formData = new FormData(this[0]);
    const o = {};
    formData.forEach((val, name) => (o[name] = val));
    return JSON.stringify(o);
  },
});

const handleCreateBookmark = function () {
  $("#mainPage").on("click", "#submitBtn", (event) => {
    event.preventDefault();

    let serializedParams = $("#createBookmark").serializeJson();
    console.log(serializedParams);
    debugger;
    api
      .postBookmark(serializedParams)
      .then((newBookmark) => {
        store.addBookmark(newBookmark);
        console.log(store.bookmarkData);
        // debugger
        store.toggleAdding();
        console.log(store.adding);
        // debugger

        render();
      })
      .catch((error) => {
        store.setError(error.message);
        renderError();
      });
  });
};

const handleFilterSelection = function () {
  $("#filter").change((event) => {
    event.preventDefault();
    let filter = $(event.currentTarget).val();
    console.log(filter);
    // debugger
    store.setFilter(filter);
    render();
  });
};

const getIDByElement = function (bookmark) {
  return $(bookmark).closest(".newBM").data("item-id");
};

const handleExpandedView = function () {
  $("#mainPage").on("click", "#expand", function (event) {
    event.preventDefault();
    let id = getIDByElement(event.currentTarget);
    console.log(id);
    // debugger
    let data = { expanded: true };
    store.findAndUpdate(id, data);
    render();
  });
};

const handleMinimize = function () {
  $("#mainPage").on("click", "#minimize", function (event) {
    event.preventDefault();
    let id = getIDByElement(event.currentTarget);
    console.log(id);
    // debugger
    let data = { expanded: false };
    store.findAndUpdate(id, data);
    render();
  });
};

const handleDeleteBookmark = function () {
  $("#mainPage").on("click", "#delete", function (event) {
    event.preventDefault();
    let id = getIDByElement(event.currentTarget);
    api
      .deleteBookmark(id)
      .then(() => {
        store.findAndDelete(id);
        render();
      })
      .catch((error) => {
        store.setError(error.message);
        renderError();
      });
  });
};

// ########################## Event Binding #################################################

const bindEventListeners = function () {
  handleAddBookmarkBtn();
  handleCreateBookmark();
  handleCancelAddBookmark();
  handleCloseError();
  handleFilterSelection();
  handleExpandedView();
  handleMinimize();
  handleDeleteBookmark();
};

export default {
  render,
  bindEventListeners,
  generateBookmarkTemplate,
};
