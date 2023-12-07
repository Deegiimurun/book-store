import BookList from "../components/book-list";
import { useAuthUser, useSignOut } from "react-auth-kit";
import { Button } from "@mui/material";

export function App() {
  const user = useAuthUser();
  const signOut = useSignOut();

  return (
    <div>
      {user() && <Button onClick={signOut}>Sign-Out</Button>}
      <BookList/>
    </div>
  );
}

export default App;
