import axios from "axios";

const baseUrl = "https://fullstack-web-course.ew.r.appspot.com/";

export function getTweets() {
  const response = axios.get(`${baseUrl}/tweet`);
  response.catch((error) => {
    console.warn(`Fail to fetch tweets : ( error message:${error}`);
  });
  return response;
}

export function CreateTweetPost(post) {
  return axios.post(`${baseUrl}/tweet`, post);
}

export function createUser(user) {
  return axios.post(`${baseUrl}/user`, user);
}
