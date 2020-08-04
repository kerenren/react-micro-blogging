import { createContext } from "react";

export const MyContext = createContext({
  posts: [],
  loading: true,
  setNewPost: () => {},
  handleOnNewPost: () =>{}
});

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => {},
  logout: () => {},
});
