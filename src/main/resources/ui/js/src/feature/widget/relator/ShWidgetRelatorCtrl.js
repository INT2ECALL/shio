shioApp.controller('ShWidgetRelatorCtrl', [
		'$scope',
		'Upload',
		'$timeout',
		'$uibModal',
		'shWidgetRelatorFactory',
		'$filter',
		function($scope, Upload, $timeout, $uibModal, shWidgetRelatorFactory, $filter) {
			$scope.shPostAttr.shChildrenRelatorItems = $filter('orderBy')($scope.shPostAttr.shChildrenRelatorItems, 'ordinal');
			$scope.fileName = null;
			$scope.uploadNewFile = false;
			$scope.relatorItems = null;
			 
			$scope.newFile = function() {
				$scope.uploadNewFile = true;
			}
			$scope.clearFile = function(shPostAttr) {
				shPostAttr.strValue = null;
				shPostAttr.file = null;
			}
			
			$scope.relatorDelete = function(shPostAttr,index) {				 
                  shPostAttr.shChildrenRelatorItems.splice(index, 1);                  
			}
			
			$scope.addRelatorItem = function(shPost, shPostAttr) {
				var modalInstance = shWidgetRelatorFactory
						.modalAddRelatorItem(shPostAttr);
				modalInstance.result.then(function(transferData) {			
					// Selected SAVE
					if ($scope.shPostAttr.shChildrenRelatorItems == null) {
						$scope.shPostAttr.shChildrenRelatorItems = [];

					}
					
					var shChildRelatorItem = {};
					shChildRelatorItem["@type"] = "ShRelatorItem";
					shChildRelatorItem.id = null;
					shChildRelatorItem.title = transferData.title;
					shChildRelatorItem.summary = transferData.summary;
					shChildRelatorItem.shChildrenPostAttrs = transferData.shPostAttrs;
					
					$scope.shPostAttr.shChildrenRelatorItems.push(shChildRelatorItem);

				}, function() {
					// Selected CANCEL
				});
			}

			$scope.selectRelatorItem = function(shPostAttr, shChildRelatorItem) {
				var modalInstance = shWidgetRelatorFactory
						.modalSelectRelatorItem(shPostAttr, shChildRelatorItem);
				modalInstance.result.then(function(transferData) {
					// Selected SAVE
					shChildRelatorItem.title = transferData.title;
					shChildRelatorItem.summary = transferData.summary;
				}, function() {
					// Selected CANCEL
				});
			}
		} ]);
