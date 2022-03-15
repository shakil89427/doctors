import "./App.css";
import useStore from "./Store/useStore";
import Doctors from "./Components/Doctors";
import Login from "./Components/Login";

function App() {
  const { user } = useStore();
  return <div>{user?.email ? <Doctors /> : <Login />}</div>;
}

export default App;
