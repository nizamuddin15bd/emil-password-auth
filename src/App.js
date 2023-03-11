import './App.css';
import { getAuth } from "firebase/auth";
import app from './firebase-init';


const auth = getAuth(app);
function App() {
  const handleEmailChange = event => {
    console.log(event.target.value);
  }
  const handlePasswordChange = event => {
    console.log(event.target.value);
  }
  return (
    <div className="App">
      <form>
        <input onChange={handleEmailChange} type="email" name="" id="" />
        <input onChange={handlePasswordChange} type="password" name="" id="" />
      </form>
    </div>
  );
}

export default App;
