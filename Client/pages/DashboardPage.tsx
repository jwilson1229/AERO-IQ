
import BetSlipForm from '../src/components/BetslipForm';
import Header from '../src/components/Header'
import Sidebar from '../src/components/Sidebar';


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
