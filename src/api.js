const BASE_URL = 'https://thinkful-list-api.herokuapp.com/AdamF'

const getBookmark = () => {
    return listApiFetch(`${BASE_URL}/bookmarks`);
};

const postBookmark = (obj) => {
    return listApiFetch(`${BASE_URL}/bookmarks`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: obj
    });
};

// Delete bookmark
const deleteBookmark = (id) => {
    return listApiFetch(`${BASE_URL}/bookmarks/${id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
    });
};

const listApiFetch = function (...args) {
    // setup var in scope outside of promise chain
    let error;
    return fetch(...args)
      .then(res => {
        if (!res.ok) {
          // if response is not 2xx, start building error object
          error = { code: response.status };
        }
  
        // otherwise, return parsed JSON
        return res.json();
      })
      .then((data) => {
        // if error exists, place the JSON message into the error object and 
        // reject the Promise with your error object so it lands in the next 
        // catch.  IMPORTANT: Check how the API sends errors -- not all APIs
        // will respond with a JSON object containing message key
        if (error) {
          error.message = data.message;
          return Promise.reject(error);
        }
  
        // otherwise, return the json as normal resolved Promise
        return data;
      });
  };

export default {
    getBookmark,
    postBookmark,
    deleteBookmark
};