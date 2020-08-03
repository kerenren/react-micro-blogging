import { createContext } from "react";

export const MyContext = createContext({
  posts: [],
  loading: true,
  onNewPost: () => {},
});

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => {},
  logout: () => {},
});
