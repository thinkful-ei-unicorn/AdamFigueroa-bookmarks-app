import $ from 'jquery';
import './style.css'
import store from './store';
import api from './api';
import bookmarkList from './bookmarkList';



function main() {
  // console.log('DOM is loaded');
  bookmarkList.bindEventListeners();
  api.getBookmark()
  .then((bookmarks) => {
    bookmarks.forEach((bookmark) => store.addBookmark(bookmark));
    bookmarkList.render();
  })
  
};

$(main);
