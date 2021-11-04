shioApp
	.controller(
		'ShFolderEditCtrl',
		[
			"$scope",
			"$http",
			"$state",
			"$stateParams",
			"$rootScope",
			"shFolderResource",
			"shAPIServerService",
			"shFolderFactory",
			"vigLocale",
			"$translate",
			"Notification",
			"shObjectFactory",
			function ($scope, $http, $state, $stateParams,
				$rootScope, shFolderResource,
				shAPIServerService, shFolderFactory, vigLocale,
				$translate, Notification, shObjectFactory) {
				$scope.folderId = $stateParams.folderId;

				$scope.vigLanguage = vigLocale.getLocale()
					.substring(0, 2);
				$translate.use($scope.vigLanguage);
				$scope.shSite = null;
				$scope.shParentFolder = null;
				$scope.shFolder = null;
				$scope.breadcrumb = null;
				$rootScope.$state = $state;
				$scope.shFolder = shFolderResource.get({
					id: $scope.folderId
				});
				var rootFolder = false;
				if ($scope.shFolder.rootFolder == 1) {
					rootFolder = true;
				}

				if (!rootFolder) {
					$scope
						.$evalAsync($http
							.get(
								shAPIServerService
									.get()
									.concat(
										"/v2/folder/"
										+ $scope.folderId
										+ "/path"))
							.then(
								function (response) {
									$scope.shParentFolder = response.data.currentFolder
									$scope.breadcrumb = response.data.breadcrumb;
									$scope.shSite = response.data.shSite;
								}));
				} else {
					$scope.shSite = $scope.shFolder.shSite;
				}
				$scope.folderSave = function () {
					$scope.shFolder
						.$update(function () {
							Notification.warning('The '
								+ $scope.shFolder.name
								+ ' Folder was updated.');
							var parentObjectId = null;
							if ($scope.shFolder.parentFolder == null) {
								parentObjectId = $scope.shSite.id;
							} else {
								parentObjectId = $scope.shFolder.parentFolder.id;
							}
							$state.go('content.children', {
								objectId: parentObjectId
							});
						});
				}
				$scope.openProperties = function () {
					shObjectFactory.openProperties($scope.shFolder);
				}
			}]);
