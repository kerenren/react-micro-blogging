export const updateDisplayName = (user, userName) => {
  user
    .updateProfile({
      displayName: userName,
    })
    .then(
      function () {
        localStorage.setItem("userName", user.displayName);
        var displayName = user.displayName;
        console.log("Profile updated successfully! User name:", displayName);
      },
      function (error) {
        alert(error.message);
      }
    );
};

export const updatePhotoURL = (user, userPhotoURL) => {
  user
    .updateProfile({
      photoURL: userPhotoURL,
    })
    .then(
      function () {
        localStorage.setItem("photoURL", user.photoURL);
        var displayName = user.displayName;
        console.log("Profile updated successfully! new name:", displayName);
      },
      function (error) {
        alert(error.message);
      }
    );
};
