angular.module("umbraco")
    .controller("seoChecker.validationqueueController",
    function ($scope, $timeout, $routeParams, notificationsService, editorService, seocheckerBackofficeResources, seocheckerHelper) {
        $scope.loaded = true;
        $scope.bindData = function () {
            seocheckerBackofficeResources.validationqueue().then(function (res) {
                $scope.loaded = true;
                $scope.model = res.data;
                seocheckerHelper.syncPath($scope.model.path);
            });
            $scope.timer = $timeout($scope.reloadData, 10000);
        };

        $scope.reloadData = function () {
            $scope.CancelTimer();
            seocheckerBackofficeResources.validationqueue($scope.model).then(function (res) {
                $scope.loaded = true;
                $scope.model = res.data;
                $scope.timer = $timeout($scope.reloadData, 10000);
            });
        };

        $scope.$on('$destroy', function () {
            $scope.CancelTimer();
        });

        $scope.CancelTimer = function () {
            $timeout.cancel($scope.timer);
        };

        $scope.clearDialog = function () {
            var options = {
                localizationKey: "seoCheckerValidationQueue_confirmMessage",
                view: "/app_plugins/seochecker/dialogs/confirm.html",
                size: "small",
                submit: function () {
                    seocheckerBackofficeResources.clearValidationqueue($scope.model).then(function (res) {
                        $scope.model = res.data;
                        seocheckerHelper.showNotification($scope.model.notificationStatus);
                    });
                    editorService.close();
                },
                close: function () {
                    editorService.close();
                }
            };
            editorService.open(options);

            //editorService.open({
            //    template: '/app_plugins/seochecker/dialogs/confirm.html',
            //    callback: function (result) {
            //        if (result === true) {

            //        }
            //    },
            //    dialogData: {
            //        localizationKey: 'seoCheckerValidationQueue_confirmMessage'
            //    }
            //});
        };
        $scope.sort = function (column) {
            $scope.model.setSortColumn = column;
            $scope.reloadData();
        };

        $scope.setRecordCount = function () {
            $scope.model.resetPaging = true;
            $scope.reloadData();
        };

        $scope.goToPage = function (pageNumber) {
            $scope.model.paging.currentPage = pageNumber;
            $scope.reloadData();
        };

        $scope.isSortDirection = function (columnName, sortDirection) {
            return seocheckerHelper.isSortDirection(columnName, sortDirection, $scope.model.orderByProperty, $scope.model.orderByDirection);
        }

        //Initialize
        $scope.bindData();
    });