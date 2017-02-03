function CrudUsersCtrl($scope, UserService, NotifyService) {

	function getUsers() {
		UserService.Get().then(function (res) {
			$scope.userList = res.data;

		});
	}

	$scope.editUser = function (userData, index) {
		$scope.oldUser = userData;
		$scope.editUserVisible = true;
		$scope.userPasswordEdit = $scope.oldUser.hash;
		$scope.userIsAdminEdit = $scope.oldUser.isAdmin;
		$scope.editingIndex = index;

	};

	$scope.showAddUserField = function () {
		$scope.addUserVisible = true;
		$scope.newUser = "";
		$scope.newPassword = "";
		$scope.userIsAdminEdit = false;
	};

	$scope.hideAddUserField = function () {
		$scope.addUserVisible = false;
	};

	$scope.cancelEdit = function () {
		$scope.editUserVisible = false;
		$scope.oldUser = null;
	};

	$scope.addNewUser = function (username, password, isAdmin) {
		//TODO: agregar usuario a la base de datos.
		UserService.Post({
			name: username,
			hash: password,
			isAdmin: isAdmin
		}).then(function () {
				NotifyService.SuccessCreation("Usuario");
				getUsers();
				$scope.hideAddUserField();
			}, function ()

			{
				NotifyService.ErrorCreation("Usuario");
				$scope.hideAddUserField();
			}
		);


	};

	$scope.editUserUpdate = function (isAdmin, password) {

		var editedUser={};
		editedUser.id = $scope.oldUser.id;
		editedUser.isAdmin = isAdmin;
		
		if(password)
			editedUser.hash = password;

		UserService.Put(editedUser).then(function () {
			NotifyService.SuccessUpdate("Usuario");
			getUsers();
			$scope.cancelEdit();
		}, function () {
			NotifyService.ErrorUpdate("Usuario");
			$scope.cancelEdit();
		});
	};
	$scope.deleteUser = function (userId) {
		UserService.Delete(userId).then(function () {
			NotifyService.SuccessDelete("Usuario");
			getUsers();
		}, function(){
			
			NotifyService.ErrorDelete("Usuario");
		});
	};

	getUsers();
};


angular
	.module('inspinia')
	.controller('CrudUsersCtrl', ['$scope', 'UserService', 'NotifyService', CrudUsersCtrl]);