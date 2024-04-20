import './App.css';
import {Routes, Route} from 'react-router-dom';
import UserContext from './context/User';
import { Suspense, lazy } from 'react';
import useAuthListener from './hooks/use-auth-listener';
import ReactLoader from './component/Loader';

const LogIn= lazy(()=> import('./component/LogIn'));
const SignUp = lazy(()=> import('./component/SignUp'));
const NotFound= lazy(()=> import('./component/NotFound'));
const Dashboard= lazy(()=>import('./component/Dashboard'));
const Profile= lazy(()=> import('./profile/profile'));
function App() {

  const {user}=useAuthListener();
  return (
    <div>
      <UserContext.Provider value={{user}}>
      <Suspense fallback={<ReactLoader/>}>
      <Routes>   
      <Route path="/login" element={<LogIn/>}> </Route>
      <Route path='/signup' element={<SignUp/>}> </Route>
      <Route path='/not-found' element={<NotFound/>}></Route>
      <Route path='/' element={<Dashboard/>}></Route>
      <Route path='/p/:username' element={<Profile/>}></Route>
      </Routes>
      </Suspense>
      </UserContext.Provider>
    </div>

    
  );
}

export default App;
