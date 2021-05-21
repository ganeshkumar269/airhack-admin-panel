import './App.css';
import Header from './components/header';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Provider } from 'react-redux'
// import { createStore } from 'redux';


// const store = createStore(rootReducer)

// This is fornt page to diaply our app 
//  It should contain login button and once login 
// we need to send the admin across to admin page
function App() {
  return (
    <div>
      <Header />
    </div>
  );
}

export default App;
