import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import LandingPage from './LandingPage/LandingPage.jsx'
import Dashboard from './dashboard/Dashboard.jsx'
import ExerciseDashboard from './dashboard/ExerciseDashboard.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
<<<<<<< HEAD
    {/* <Dashboard/> */}
    {/* <App /> */}
    <ExerciseDashboard/>
=======
   
    <App />
   {/*<ExerciseDashboard/> */} 

>>>>>>> 9e2edd09568e9b14c44d1faa1d4132d590ce9b29
  </StrictMode>,
)
