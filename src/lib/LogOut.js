import fire from "./Fire.js";

export default function logout() {
  console.log("you have logged out your account");
  fire.auth().signOut();
}
