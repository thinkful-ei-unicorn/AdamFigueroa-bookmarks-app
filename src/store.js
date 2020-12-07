import bookmarkList from "./bookmarkList";

const bookmarkData = [];
let adding = false;
let error = null;
let filter = 0;


const findById = function (id) {
    return this.bookmarkData.find(currentItem => currentItem.id === id);
};

const addBookmark = function (bookmark) {
    this.bookmarkData.push(bookmark);
};

const findAndDelete = function (id) {
    this.bookmarkData = this.bookmarkData.filter(currentItem => currentItem.id !== id);
};

const findAndUpdate = function (id, newData) {
    const currentBM = this.findById(id);
    Object.assign(currentBM, newData);
};

  const setError = function (error) {
    this.error = error;
  };

const toggleAdding = function() {
    this.adding = !this.adding
};

const toggleMinimize = function() {
  this.expanded = !this.expanded
};

const setFilter = function(input) {
  this.filter = input;
};

export default {
    bookmarkData,
    adding,
    error,
    filter,
    findById,
    addBookmark,
    findAndDelete,
    findAndUpdate,
    toggleAdding,
    toggleMinimize,
    setFilter,
    setError
};