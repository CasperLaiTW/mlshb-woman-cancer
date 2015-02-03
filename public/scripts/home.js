var analyticsCtrl = function ($scope, underscore, dialogs, $rootScope, SweetAlert) {
  $scope.reports = [];

  // 18
  var area = [
    '苗栗市',
    '通霄鎮',
    '苑裡鎮',
    '西湖鄉',
    '頭屋鄉',
    '公館鄉',
    '銅鑼鄉',
    '三義鄉',
    '竹南鎮',
    '頭份鎮',
    '後龍鎮',
    '造橋鄉',
    '三灣鄉',
    '南庄鄉',
    '大湖鄉',
    '卓蘭鎮',
    '獅潭鄉',
    '泰安鄉'
  ];

  // action
  var action = {
    count: [],
    cervix: [],
    breast: [],
    lecture: [],
    community: [],
    // man: 子抹
    // female: 乳攝
    work: [],
  };

  // count
  var people = {
    count: 0,
    man: 0,
    female: 0
  };

  $scope.init = function () {
    underscore.each(action, function (value, index) {
      action[index] = underscore.clone(people);
    });
    underscore.each(area, function (value, index) {
      var items = [];
      for (var i = 0; i < 12; i++) {
        items.push(underscore.clone(action));
      }
      $scope.reports.push({
          name: value,
          data: items
        });
    });
    console.log($scope.reports);
  };

  $scope.analytics = function () {
    if (document.getElementById('source').files.length === 0) {
      swal("請選擇檔案", "發生錯誤", "error");
      return;
    }

    $('#source').parse({
      config: {
        complete: function (results) {
          results.data.shift();
          underscore.each(results.data, function (value, index) {

          });
          console.log(results);
        }
      }
    });
  };

  $scope.total = function (data, key, field) {
    var total = 0;
    underscore.each(data, function (value, index) {
      total += value[key][field];
    });
    return total;
  };
}

app.controller('analyticsCtrl', analyticsCtrl);