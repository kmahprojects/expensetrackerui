import { Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Delete from './pages/Delete'
import Update from './pages/Update'
import Create from './pages/Create'
import About from './pages/About'
import NotFound from './pages/NotFound'

function App() {
  return (
    <>
      <Navbar/>
        <Switch>
          <Route path='/' component={Home} exact/>
          <Route path='/delete' component={Delete} />
          <Route path='/create' component={Create} />
          <Route path='/update' component={Update} />
          <Route path='/about' component={About} />
          <Route component={NotFound}></Route>
        </Switch>
    </>
  );

}
export default App;
