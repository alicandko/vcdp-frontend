import React from 'react';
import AppActions from '../actions/app-actions';
import LoginAPI from './LoginAPI';


const VcdpAPI = {

  postUser(user) {
    console.log(user);
    fetch('http://127.0.0.1:8000/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(function(response) {
      if(response.ok) {
        return response.json();
      } else {
        throw new Error('Network response was not ok.');
      }
    })
    .then(function(json) {
      AppActions.registerSuccess(json);
    })
    .catch(function(error) {
      alert(`Error: ${error.message}`);
      console.log('There has been a problem with your fetch operation: ' + error.message);
    });
  },

  getToken(userAuthDetails) {
    fetch('http://127.0.0.1:8000/api-token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userAuthDetails)
    })
    .then(function(response) {
      if(response.ok) {
        return response.json();
      } else {
        throw new Error('Network response was not ok.');
      }
    })
    .then(function(json) {
      AppActions.getTokenSuccess(json);
    })
    .catch(function(error) {
      alert(`Error: ${error.message}`);
      console.log('There has been a problem with your fetch operation: ' + error.message);
    });
  },

  postDataset(dataset) {
    var token = 'Token ' + LoginAPI.token;
    fetch('http://127.0.0.1:8000/datasets/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(dataset)
    })
    .then(function(response) {
      if(response.ok) {
        return response.json();
      } else {
        throw new Error('Network response was not ok.');
      }
    })
    .then(function(json) {
      AppActions.createDatasetSuccess(json);
    })
    .catch(function(error) {
      alert(`Error: ${error.message}`);
      console.log('There has been a problem with your fetch operation: ' + error.message);
    });
  },

  deleteDataset(datasetId) {
    var token = 'Token ' + LoginAPI.token;
    fetch('http://127.0.0.1:8000/datasets/' + datasetId + '/', {
      method: 'DELETE',
      headers: {
        'Authorization': token
      },
    })
    .then(function(response) {
      if(response.ok) {
        AppActions.deleteDatasetSuccess(datasetId);
      } else {
        throw new Error('Network response was not ok.');
      }
    })
    .catch(function(error) {
      alert(`Error: ${error.message}`);
      console.log('There has been a problem with your fetch operation: ' + error.message);
    });
  },

  searchVideos(q) {
    var token = 'Token ' + LoginAPI.token;
    fetch('http://127.0.0.1:8000/videos/search/?q=' + q, {
      method: 'GET',
      headers: {
        'Authorization': token
      },
    })
    .then(function(response) {
      if(response.ok) {
        return response.json();
      } else {
        throw new Error('Network response was not ok.');
      }
    })
    .then(function(json) {
      AppActions.searchVideosSuccess(json);
    })
    .catch(function(error) {
      alert(`Error: ${error.message}`);
      console.log('There has been a problem with your fetch operation: ' + error.message);
    });
  },

  postVideo(video) {
    console.log(video);
    var token = 'Token ' + LoginAPI.token;
    fetch('http://127.0.0.1:8000/videos/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(video)
    })
    .then(function(response) {
      if(response.ok) {
        return response.json();
      } else {
        throw new Error('Network response was not ok.');
      }
    })
    .then(function(json) {
      if (Array.isArray(video)) {
        AppActions.labelAllVideosSuccess(json);
      } else {
        AppActions.labelVideoSuccess(json);
      }
    })
    .catch(function(error) {
      alert(`Error: ${error.message}`);
      console.log('There has been a problem with your fetch operation: ' + error.message);
    });
  },

  getDatasets() {
    var token = 'Token ' + LoginAPI.token;
    fetch('http://127.0.0.1:8000/datasets/', {
      method: 'GET',
      headers: {
        'Authorization': token
      },
    })
    .then(function(response) {
      if(response.ok) {
        return response.json();
      } else {
        throw new Error('Network response was not ok.');
      }
    })
    .then(function(json) {
      AppActions.getDatasetsSuccess(json);
    })
    .catch(function(error) {
      alert(`Error: ${error.message}`);
      console.log('There has been a problem with your fetch operation: ' + error.message);
    });
  },

  getDataset(datasetId) {
    var token = 'Token ' + LoginAPI.token;
    fetch('http://127.0.0.1:8000/datasets/' + datasetId + '/', {
      method: 'GET',
      headers: {
        'Authorization': token
      },
    })
    .then(function(response) {
      if(response.ok) {
        return response.json();
      } else {
        throw new Error('Network response was not ok.');
      }
    })
    .then(function(json) {
      AppActions.getDatasetSuccess(json);
    })
    .catch(function(error) {
      alert(`Error: ${error.message}`);
      console.log('There has been a problem with your fetch operation: ' + error.message);
    });
  },

  prepareDataset(datasetId, sizes) {
    var token = 'Token ' + LoginAPI.token;
    fetch('http://127.0.0.1:8000/datasets/' + datasetId + '/prepare_dataset/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(sizes)
    })
    .then(function(response) {
      if(response.ok) {
        AppActions.prepareDatasetSuccess();
      } else {
        throw new Error('Network response was not ok.');
      }
    })
    .catch(function(error) {
      alert(`Error: ${error.message}`);
      console.log('There has been a problem with your fetch operation: ' + error.message);
    });
  },

  validate(datasetId) {
    var token = 'Token ' + LoginAPI.token;
    fetch('http://127.0.0.1:8000/datasets/' + datasetId + '/validate_analyse/', {
      method: 'GET',
      headers: {
        'Authorization': token
      },
    })
    .then(function(response) {
      if(response.ok) {
        return response.json();
      } else {
        throw new Error('Network response was not ok.');
      }
    })
    .then(function(json) {
      AppActions.validateSuccess(json);
    })
    .catch(function(error) {
      alert(`Error: ${error.message}`);
      console.log('There has been a problem with your fetch operation: ' + error.message);
    });
  },

  test(datasetId, clfType) {
    var token = 'Token ' + LoginAPI.token;
    fetch('http://127.0.0.1:8000/datasets/' + datasetId + '/test_analyse/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(clfType)
    })
    .then(function(response) {
      if(response.ok) {
        return response.json();
      } else {
        throw new Error('Network response was not ok.');
      }
    })
    .then(function(json) {
      AppActions.testSuccess(json);
    })
    .catch(function(error) {
      alert(`Error: ${error.message}`);
      console.log('There has been a problem with your fetch operation: ' + error.message);
    });
  },

  predict(datasetId, predictData) {
    var token = 'Token ' + LoginAPI.token;
    fetch('http://127.0.0.1:8000/datasets/' + datasetId + '/predict/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(predictData)
    })
    .then(function(response) {
      if(response.ok) {
        return response.json();
      } else {
        throw new Error('Network response was not ok.');
      }
    })
    .then(function(json) {
      AppActions.predictSuccess(json);
    })
    .catch(function(error) {
      alert(`Error: ${error.message}`);
      console.log('There has been a problem with your fetch operation: ' + error.message);
    });
  }

}

export default VcdpAPI;
