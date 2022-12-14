angular.module("umbraco")
	.controller("seoChecker.redirectsController",
		function ($scope, $routeParams, $http, editorService, notificationsService, localizationService) {
			var nodeId = $routeParams.id;
		  
			$scope.bindData = function () {
				$http.get('backoffice/SEOChecker/SEOCheckerApi/GetRedirects?id=' + nodeId).then(function (res) {
					$scope.redirects = res.data;
				});

				localizationService.localize("seoCheckerGeneral_deleteConfirm").then(function (value) {
				    $scope.confirmMessage = value;
				});

				localizationService.localize("redirectDataType_notificationDeleteTitle").then(function (value) {
				    $scope.notificationDeleteTitle = value;
				});

				localizationService.localize("redirectDataType_notificationDeleteDescription").then(function (value) {
				    $scope.notificationDeleteDescription = value;
				});
				localizationService.localize("redirectDataType_notificationSaveTitle").then(function (value) {
				    $scope.notificationSaveTitle = value;
				});

				localizationService.localize("redirectDataType_notificationSaveDescription").then(function (value) {
				    $scope.notificationSaveDescription = value;
				});

			};

			$scope.deleteRedirect = function (redirectId) {
			    if (confirm($scope.confirmMessage) == true) {
					$http.get('backoffice/SEOChecker/SEOCheckerApi/DeleteRedirect?id=' + redirectId).then(function () {
						$scope.bindData();
						notificationsService.success($scope.notificationDeleteTitle, $scope.notificationDeleteDescription);
					});
				}
			};
			
			$scope.setEditMode = function (redirectId) {
				$scope.validationResult = null;
				$http.get('backoffice/SEOChecker/SEOCheckerApi/GetEmptyModel?id=' + nodeId).then(function (res) {
					//Default set to empty value
					$scope.model.value = res.data;
					for (var i = 0; i < $scope.redirects.length; i++) {
						if ($scope.redirects[i].notFoundId == redirectId) {
							//Redirect found to edit use this one
							$scope.model.value = $scope.redirects[i];
						}
					}
					$scope.nodePicked = { id: $scope.model.value.documentID, name: $scope.model.value.documentName };
					
				});
				$scope.editMode = true;
			};

			$scope.cancelEditMode = function () {
				$scope.editMode = false;
			};
			
			$scope.submitRedirect = function () {
				$scope.model.value.documentID = $scope.getPickedNodeId();
				$http.post('backoffice/SEOChecker/SEOCheckerApi/SaveRedirect', $scope.model.value).then(function (res) {
					$scope.validationResult = res.data;
					if (res.data.valid == true) {
						//All is valid
						$scope.bindData();
						$scope.editMode = false;
						notificationsService.success($scope.notificationSaveTitle, $scope.notificationSaveDescription);
					}
				});
			};

			$scope.pickContentNode = function () {

				//When button clicked - Let's open the content picker dialog on the right
				editorService.contentPicker({ callback: itemPicked });

				//When the node has been picked - do this...
				function itemPicked(pickedItem) {

					//Set the picked item to our scope
					$scope.nodePicked = pickedItem;
				}
			};
			
			$scope.getPickedNodeId = function () {
				if ($scope.nodePicked == null) {
					return 0;
				} else {
					return $scope.nodePicked.id;
				}
			};
			
			$scope.deletePickedNode = function () {
				$scope.nodePicked = null;
			};

			//Initialize
			$scope.bindData();
		});