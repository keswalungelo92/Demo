angular.module("umbraco")
    .controller("seoChecker.ignoredInboundlinkissuesController",
    function ($scope, $timeout, $routeParams, notificationsService, editorService, seocheckerBackofficeResources, seocheckerHelper) {
        $scope.loaded = false;
        $scope.bindData = function () {
            seocheckerBackofficeResources.loadAllIgnoredInBoundLinkErrors($scope.model).then(function (res) {
                $scope.loaded = true;
                $scope.model = res.data;
                seocheckerHelper.syncPath($scope.model.path);
            });
        };

        $scope.filter = function () {
            $scope.bindData();
        };

        $scope.sort = function (column) {
            $scope.model.setSortColumn = column;
            $scope.bindData();
        };

        $scope.setRecordCount = function () {
            $scope.model.resetPaging = true;
            $scope.bindData();
        };

        $scope.goToPage = function (pageNumber) {
            $scope.model.paging.currentPage = pageNumber;
            $scope.bindData();
        };

        $scope.showResult = function () {
            return $scope.model.hasRecords ||  ($scope.model.filter!= null && $scope.model.filter.length > 0);
        };

        $scope.handleSelectAll = function () {
            seocheckerHelper.handleSelectAll($scope.model.selectAll, $scope.model.data);
        };

        $scope.anyItemSelected = function () {
            return seocheckerHelper.anyItemSelected($scope.model.data);
        }

        $scope.isSortDirection = function (columnName, sortDirection) {
            return seocheckerHelper.isSortDirection(columnName, sortDirection, $scope.model.orderByProperty, $scope.model.orderByDirection);
        }


        $scope.deleteSelected = function () {
            var options = {
                localizationKey: "seoCheckerBulkActions_bulkActionDeleteConfirmMessage",
                view: "/app_plugins/seochecker/dialogs/confirm.html",
                size: "small",
                submit: function () {
                    var data = seocheckerHelper.getSelectedItems($scope.model.data);
                    seocheckerBackofficeResources.removeIgnoredInboundLinkIssues(data).then(function (res) {
                        seocheckerHelper.showNotification(res.data);
                        $scope.bindData();
                    });
                    editorService.close();
                },
                close: function () {
                    editorService.close();
                }
            };
            editorService.open(options);
        };
        
        //Initialize
        $scope.bindData();
    });