'use strict';

app.controller('LoginCtrl', function LoginCtrl(UserFactory) {
  'use strict';

  var lc = this;
  lc.login = login;
  lc.logout = logout;

  lc.user = null;

  function login(username, password) {
    console.log("requesting token");
    UserFactory.login(username, password).then(function success(response) {
      console.log(response.data);
      lc.user = response.data;
    }, handleError);
  }

  function logout(username, password) {
    UserFactory.logout();
    lc.user = null;
  }

  function handleError(response) {
    alert("error : " + response.data);
  }
});

app.factory('UserFactory', function UserFactory($http, TokenFactory) {
  'use strict';
  $http.defaults.useXDomain = true;
  return {
    login: login,
    logout: logout
  }

  function login(username, password) {
    return $http.post("http://localhost:8080/kiddiez-core/login",
      {
        userName: username,
        passWord: password
      }).then(function success(response) {
        TokenFactory.setToken(response.data.token);
        return response;
      });
  }

  function logout() {
    TokenFactory.setToken();
  }
});

app.factory('TokenFactory', function TokenFactory($window) {
  'use strict';
  var store = $window.localStorage;
  var key = "auth-token";
  return {
    getToken: getToken,
    setToken: setToken
  }

  function getToken() {
    return store.getItem(key);
  }

  function setToken(token) {
    if (token) {
      store.setItem(key, token)
    } else {
      store.removeItem(key);
    }
  }
});

app.factory('AuthInterceptor', function AuthInterceptor(TokenFactory) {
  'use strict';
  return {
    request: addToken
  }

  function addToken(config) {
    var token = TokenFactory.getToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
  }
});
