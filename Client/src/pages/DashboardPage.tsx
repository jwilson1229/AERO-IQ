
import BetSlipForm from '../components/BetslipForm';
import Header from '../components/Header'
import Sidebar from '../components/Sidebar';


const Dashboard = () => {
  return (
    <div className="dashboard">
      <Header />
      <BetSlipForm />
      <Sidebar />
     
    </div>
  );
};

export default Dashboard;
