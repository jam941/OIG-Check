import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div id = 'upload'>
        <form id = 'dataUpload'>
        <label>Employee File</label><input type="file" id="myFile" name="filename"/><br/>
        <label>Omissions</label><input type="file" id="OIG" name="filename"/>
        </form>
    </div>
  );
}

export default App;
