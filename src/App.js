import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Web_SignIn from "./screens/Web_SignIn/Web_SignIn";
import Web_SignUp from "./screens/Web_SignUp/Web_SignUp";
import Web_SignUp_Profile from "./screens/Web_SignUp_Profile/Web_SignUp_Profile";
import Web_Login from "./screens/Web_Login/Web_Login";
import Web_Main from "./screens/Web_Main/Web_Main";
import Web_Bookmark from "./screens/Web_Bookmark/Web_Bookmark";
import Web_Search from "./screens/Web_Search/Web_Search";
import Web_Profile from "./screens/Web_Profile/Web_Profile";
import Web_Profile_Setting from "./screens/Web_Profile_Setting/Web_Profile_Setting";
import Web_Profile_Password from "./screens/Web_Profile_Password/Web_Profile_Password";
import Web_Headline from "./screens/Web_Headline/Web_Headline";
import Web_Summary from "./screens/Web_Summary/Web_Summary";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Web_SignIn />} />
        <Route path="/auth/joinForm" element={<Web_SignUp />} />
        <Route path="/auth/profile" element={<Web_SignUp_Profile />} />
        <Route path="/auth/email/login" element={<Web_Login />} />
        <Route path="/" element={<Web_Main />} />
        <Route path="/bookmark/:id" element={<Web_Bookmark />} />
        <Route path="/search/:id" element={<Web_Search />} />
        <Route path="/profile/:id" element={<Web_Profile />} />
        <Route path="/profile/update" element={<Web_Profile_Setting />} />
        <Route path="/profile/password" element={<Web_Profile_Password />} />
        <Route path="/headline/:headline_id" element={<Web_Headline />} />
        <Route path="/summary/view" element={<Web_Summary />} />
      </Routes>
    </Router>
  );
};

export default App;
