'use strict';

app.controller('RegistrationCtrl', function RegistrationCtrl(RegistrationFactory, TokenFactory) {
  'use strict';

  console.log("regctrl")
  var rc = this;
  rc.overview = overview;
  rc.regdata = null;

  function overview() {
    console.log("requesting registrations overview");
    RegistrationFactory.getRegistrations().then(function success(response) {
      console.log(response.data);
      rc.regdata = response.data;
    }, handleError);
  }

  function handleError(response) {
    alert("error : " + response.data);
  }
});

app.factory('RegistrationFactory', function UserFactory($http) {
  'use strict';
  $http.defaults.useXDomain = true;
  return {
    getRegistrations: getRegistrations
  }

  function getRegistrations() {
    return $http.get("http://localhost:8080/kiddiez-core/registrations/overview",
      {
      });
  }
});
