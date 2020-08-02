const firebase = require("firebase");
export const currentUser = firebase.auth().currentUser;

export const updateDisplayName = (user, userName) => {
  user
    .updateProfile({
      displayName: userName,
    })
    .then(
      function () {
        localStorage.setItem("userName", user.displayName);
        var displayName = user.displayName;
        console.log("Profile updated successfully! new name:", displayName);
      },
      function (error) {
        alert(error.message);
      }
    );
};
