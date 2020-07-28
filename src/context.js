import { createContext } from "react";

export const MyContext = createContext({
  posts: [],
  loading: true,
  onNewPost: () => {},
});
