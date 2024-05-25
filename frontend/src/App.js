import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Main from './components/Main';
import Addtodo from './components/Addtodo';

function App() {
  return (
    <div>
      <Routes>
        <Route path={'/'} element={<Main child={<Dashboard/>}/>}></Route>
        <Route path={'/add'} element={<Main child={<Addtodo/>}/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
