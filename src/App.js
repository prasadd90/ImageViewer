 
import React, { useState } from 'react';
import './MasterPage.css';
 
import ReactDOM from 'react-dom'; // Import ReactDOM
 
import NotificationSender from './component/NotificationSender';
import Chat from './component/Chat';
function App()   {
  const [count, setCount] = useState(0); // State variable
  return (

    <div>
 
 

        <Chat/> 
        {/* <NotificationSender /> */}
</div>
    
    
  );
}

export default App;

// ReactDOM.render(<App/>, document.getElementById('root'));
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
<React.StrictMode>
<App />
</React.StrictMode>
);
 
