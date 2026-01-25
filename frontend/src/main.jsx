import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import LandingPage from './LandingPage/LandingPage.jsx'
import Dashboard from './dashboard/Dashboard.jsx'
import ExerciseDashboard from './dashboard/ExerciseDashboard.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Dashboard/> */}
    {/* <App /> */}
    <ExerciseDashboard/>
  </StrictMode>,
)
