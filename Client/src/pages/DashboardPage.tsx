
import BetSlipForm from '../components/BetslipForm';
import Header from '../components/Header'
import Sidebar from '../components/Sidebar';
import '../styles/dashboard.css';


const Dashboard = () => {
  return (
    <div className="dashboard">
          <Header />
            <Sidebar />
            <BetSlipForm />
  
      
      <div className='sidebar'>

      </div>
    </div>
  );
};

export default Dashboard;
