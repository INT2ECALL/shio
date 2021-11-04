shioApp.controller('ShWidgetCheckBoxCtrl', [
	'$scope',
	function ($scope) {
		$scope.widgetSettingsObject = null;
		$scope.choices = [];
		$scope.checkItems = [];
		$scope.init = function (widgetSettings, arrayValue) {
			$scope.widgetSettingsObject = angular.fromJson(widgetSettings);
			var choicesArray = $scope.widgetSettingsObject.choices.replace(/(\r\n\n\r)/gm, "\n").split("\n");
			angular.forEach(choicesArray, function (value, key) {
				var choiceRowArray = value.split(":");
				var choiceRow = {
					id :choiceRowArray[0],
					label : choiceRowArray[1],
					checked: (arrayValue.indexOf(choiceRowArray[0]) > -1)
				}
				
				if (arrayValue.indexOf(choiceRowArray[0]) > -1)
					$scope.checkItems.push(choiceRowArray[0]);
				
				$scope.choices.push(choiceRow);

			});
		}

		$scope.updateCheckBox = function (item) {
			if (item.checked) {
				$scope.checkItems.push(item.id);
			}
			else {
				var index = $scope.checkItems.indexOf(item.id);
				$scope.checkItems.splice(index, 1);
			}
			return $scope.checkItems;

		}
	}]);
