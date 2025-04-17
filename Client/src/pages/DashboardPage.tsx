
import BetSlipForm from '../components/BetslipForm';
import Header from '../components/Header'
import Sidebar from '../components/Sidebar';
import '../styles/dashboard.css';
import Kobe from '../assets/images/kobe.png';
import hockey from '../assets/images/R (2).png';



const Dashboard = () => {
  return (
    <div className="dashboard">
            <Header />
            <Sidebar />
            <div className="kobe-image">
            <img className='kobe' src={Kobe} /> 
            </div>
            <BetSlipForm />
            <div className='hockey-image'>
            <img className='hockey' src={hockey} />
            </div>
            <div className='sidebar'>

      </div>
    </div>
  );
};

export default Dashboard;
