shioApp.controller('ShSiteImportCtrl', [
		'$scope',
		'$state',
		'Upload',
		'$timeout',
		'shAPIServerService',
		'Notification',
		function($scope, $state, Upload, $timeout, shAPIServerService,
				Notification) {
			$scope.shImport = {
				file : null
			};

			$scope.$watch('shImport.file', function() {
				//
			});

			$scope.clearFile = function() {
				$scope.shImport.file = null;
			}
			$scope.importFile = function() {
				if (!$scope.shImport.file.$error) {
					Upload.upload({
						url : shAPIServerService.get().concat('/v2/import'),
						data : {
							file : $scope.shImport.file
						}
					}).then(

							function(resp) {
								if (typeof resp.data.sites != 'undefined') {
									var siteName = resp.data.sites[0].name;
									Notification.warning('The ' + siteName
											+ ' Site was imported.');
								} else {
									Notification
											.warning('Objects were imported.');
								}
								$state.go('content');
							},
							null,
							function(evt) {
							//	var progressPercentage = parseInt(100.0
							//			* evt.loaded / evt.total);
							});
				}
			}
		} ]);
