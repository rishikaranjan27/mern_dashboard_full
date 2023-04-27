import { ChartData } from './Components/ChartData';
import {Country} from './Screens/Country';


import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { Region } from './Screens/Region';
import { Topic } from './Screens/Topic';
import { SubLoading } from './Components/SubLoading';





function App() {
  return (
    <div className="App">

      

      <Router>
        <Routes>

          <Route path = '/' element={<ChartData/>}/>

          <Route path = '/country' element={<Country/>}/>

          <Route path = '/region' element={<Region/>}/>

          <Route path = '/topic' element={<Topic/>}/>

        </Routes>
      </Router>





      
    </div>
  );
}

export default App;
