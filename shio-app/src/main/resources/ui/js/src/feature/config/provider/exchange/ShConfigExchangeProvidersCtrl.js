shioApp.controller('ShConfigExchangeProvidersCtrl', [
	"$scope",
	"$state",
	"$rootScope",
	"$http",
	"$filter",
	"shAPIServerService",
	"shExchangeProviderResource",
	function ($scope, $state, $rootScope, $http, $filter, shAPIServerService, shExchangeProviderResource) {
		$rootScope.$state = $state;

		$scope.exchangeProviders = shExchangeProviderResource.query({}, function () {
			$scope.exchangeProviders = $filter('orderBy')($scope.exchangeProviders, 'position');
		});

		$scope.sortableExchangeProviders = {
			disabled: false,
			stop: function (e, ui) {
				var sortObject = {};
				angular.forEach($scope.exchangeProviders, function (exchangeProvider, key) {
					sortObject[exchangeProvider.id] = exchangeProvider.position;
				});
				var parameter = JSON.stringify(sortObject);
				$http.put(shAPIServerService.get().concat("/v2/provider/exchange/sort"), parameter).then(function (response) { });
			}
		};

		$scope.changeSearchTextBox = function (shSearchFilter) {
			if (shSearchFilter.length > 0) {
				$scope.sortableExchangeProviders.disabled = true;
			}
			else {
				$scope.sortableExchangeProviders.disabled = false;
			}
		}

	}]);
