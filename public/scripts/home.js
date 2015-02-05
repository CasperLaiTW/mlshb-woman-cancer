var analyticsCtrl = function ($scope, underscore, dialogs, $rootScope, SweetAlert, parseIntFilterEmpty) {
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
    count: {
      count: 0,
      man: 0,
      female: 0
    },
    cervix: {
      count: 0,
      man: 0,
      female: 0
    },
    breast: {
      count: 0,
      man: 0,
      female: 0
    },
    lecture: {
      count: 0,
      man: 0,
      female: 0
    },
    community: {
      count: 0,
      man: 0,
      female: 0
    },
    // man: 子抹
    // female: 乳攝
    work: {
      count: 0,
      man: 0,
      female: 0
    },
  };

  $scope.init = function () {
    underscore.each(area, function (value, index) {
      var items = [];
      for (var i = 0; i < 12; i++) {
        items.push($.extend(true, {}, action));
      }
      $scope.reports.push({
          name: value,
          data: items
        });
    });
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
            var month = new Date(value[2]).getMonth();
            var entity = underscore.findWhere($scope.reports, {name: value[1]});

            // check
            if (parseIntFilterEmpty(value[3]) > 0 || parseIntFilterEmpty(value[4]) > 0) {
              entity.data[month].count.count++;
            }
            entity.data[month].cervix.count += parseIntFilterEmpty(value[3]);
            entity.data[month].breast.count += parseIntFilterEmpty(value[4]);

            if (value[5] !== '' && value[5] !== '0') {
              entity.data[month].lecture.count++;
            }

            entity.data[month].community.man += parseIntFilterEmpty(value[6]);
            entity.data[month].community.female += parseIntFilterEmpty(value[7]);

            if (value[8] !== '' && value[8] !== 0) {
              entity.data[month].work.count++;
            }
            entity.data[month].work.man += parseIntFilterEmpty(value[9]);
            entity.data[month].work.female += parseIntFilterEmpty(value[10]);
          });
          $scope.$apply();
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