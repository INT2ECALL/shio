shioApp.factory('shSiteFactory', [
	'$uibModal', 'shSiteResource', 'shAPIServerService', 'Notification', '$state',
	function ($uibModal, shSiteResource, shAPIServerService, Notification, $state) {
		const varToString = varObj => Object.keys(varObj)[0];
		return {
			export: function (shSite) {
				window.open(shAPIServerService
					.get()
					.concat(
						"/v2/site/" + shSite.id + "/export"), '_self', '');
			},
			nodeJS: function (shSite) {
				window.open(shAPIServerService
					.get()
					.concat(
						"/v2/site/" + shSite.id + "/nodejs"), '_self', '');
			},
			delete: function (shSite) {
				var modalInstance = this.modalDelete(shSite);
				modalInstance.result.then(function (removeInstance) {
					var deletedMessage = 'The ' + shSite.name + ' Site was deleted.';

					shSiteResource
						.delete({
							id: shSite.id
						}, function () {
							Notification.error(deletedMessage);
							$state.go('content', {}, { reload: true });
						});
				}, function () {
					// Selected NO
				});
			},
			save: function (shSite) {
				if (shSite.id != null) {
					var updateMessage = 'The ' + shSite.name + ' Site was updated.';
					shSite.$update(function (response) {
						Notification.warning(updateMessage);
						$state.go('content.children', { objectId: response.id });
					});
				} else {
					var saveMessage = 'The ' + shSite.name + ' Site was saved.';
					delete shSite.id;
					shSiteResource.save(shSite, function (response) {
						Notification.warning(saveMessage);
						$state.go('content.children', { objectId: response.id });
					});
				}
			},
			modalDelete: function (shSite) {
				var $ctrl = this;
				return $uibModal.open({
					animation: true
					, ariaLabelledBy: 'modal-title'
					, ariaDescribedBy: 'modal-body'
					, templateUrl: 'template/modal/shDeleteObject.html'
					, controller: 'ShModalDeleteObjectCtrl'
					, controllerAs: varToString({ $ctrl })
					, size: null
					, appendTo: undefined
					, resolve: {
						shObject: function () {
							return shSite;
						}
					}
				});
			}
		}
	}]);
