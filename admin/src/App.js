import './App.scss';
import { useSelector } from "react-redux";
import Auth from "./pages/auth/Auth";
import Home from './pages/home/Home';
import {BrowserRouter,Navigate,Route,Routes} from 'react-router-dom';
import List from './pages/list/List';
import Single from "./pages/single/Single";
import New from './pages/new/New'
import Chat from "./pages/chat/Chat";
import SingleOrder from "./pages/singleOrder/SingleOrder";
import UpdateMeal from "./pages/updateMeal/UpdateMeal";
import VedioChat from './pages/vedioChat/VedioChat';
import { ContextProvider } from './vedioChatContext';
function App() {

  let {admin} = useSelector(state=>state.auth);
  let {value} = useSelector(state=>state.darkmode);

  return (
    <div className={value?'App darkmode':'App'}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={admin ? <Home />: <Navigate to={`/login`} />}/>
          <Route path="/home" element={admin ? <Home />: <Navigate to={`/login`} />}/>
          <Route path="/login" element={admin ? <Navigate to={`/home`} />: <Auth />}/>

          <Route path="/users" element={admin ?<List />: <Navigate to='/login' /> } />
          <Route path="/meals" element={admin ?<List />: <Navigate to='/login' /> } />
          <Route path="/orders" element={admin ?<List />: <Navigate to='/login' /> } />

          <Route path="/users/:id" element={admin ?<Single />: <Navigate to='/login' /> } />
          <Route path="/meals/:id" element={admin ?<UpdateMeal />: <Navigate to='/login' /> } />
          <Route path="/orders/:id" element={admin ?<SingleOrder />: <Navigate to='/login' /> } />

          <Route path="/addUser" element={admin ?<New />: <Navigate to='/login' /> } />
          <Route path="/addMeal" element={admin ?<New />: <Navigate to='/login' /> } />
          
          <Route path="/chat" element={admin ?<Chat />: <Navigate to='/login' /> } />
          <Route path="/vediochat" element={admin?<ContextProvider><VedioChat /></ContextProvider>:<Navigate to='/login' />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
