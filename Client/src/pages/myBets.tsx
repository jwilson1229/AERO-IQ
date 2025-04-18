import React, { useState } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import '../styles/MyBets.css';

const QUERY_BETSLIPS = gql`
  query GetAllBetSlips {
    betSlips {
      _id
      betType
      stake
      straightBetTitle
      payout
      odds
      legs {
        title
        odds
      }
      createdAt
    }
  }
`;

const DELETE_BETSLIP = gql`
    mutation DeleteBetSlip($id: ID!){
    deleteBetSlip(id: $id){
    _id
    }
    }

`


const MyBets = () => {
  const { loading, error, data } = useQuery(QUERY_BETSLIPS);
  const [deleteBetSlip] = useMutation(DELETE_BETSLIP);
  const [filter, setFilter] = useState<string>('All');

  const handleDelete = async (id: string) => {
    try {
      const { data } = await deleteBetSlip({
        variables: { id },
      })
      alert('BetSlip Deleted!');
      window.location.reload();
      return data;
    } catch (error) {
      console.log('Error deleting slip');
    }
  }
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };

  const filterBetSlipsByDate = (betSlips: any[]) => {
    const now = new Date();
    switch (filter) {
      case '24h':
        return betSlips.filter(bet => new Date(bet.createdAt) >= new Date(now.getTime() - 24 * 60 * 60 * 1000));
      case '7d':
        return betSlips.filter(bet => new Date(bet.createdAt) >= new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000));
      case '30d':
        return betSlips.filter(bet => new Date(bet.createdAt) >= new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000));
      default:
        return betSlips;
    }
  }


  if (loading) return <p>Loading bet slips...</p>;
  if (error) return <p>Error loading bet slips: {error.message}</p>;


  const formatOdds = (odds: number) => {
    return odds > 0 ? `+${odds}` : `${odds}`;
  };

  const filteredBetSlips = filterBetSlipsByDate(data.betSlips);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <div className='background' style={{ flex: 1, padding: '20px', backgroundColor: '#f4f4f4' }}>
        <Header />


        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="dateFilter" style={{ marginRight: '10px', fontWeight: 'bold', color: 'white', borderRadius: '4px' }}>Filter by date:</label>
          <select id="dateFilter" value={filter} onChange={handleFilterChange}>
            <option value="All">All</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
        </div>

        <div className="card-container">

          {filteredBetSlips.length ? (
            filteredBetSlips.map((bet: any) => (
              <div key={bet._id} className="card">
                <h3>{bet.betType} Bet</h3>
                <p>💰 Stake: ${bet.stake}</p>
                {bet.betType.toLowerCase() !== 'parlay' && (
                  <p>Odds: {bet.odds !== undefined ? formatOdds(bet.odds) : 'N/A'}</p>
                )}
                {bet.betType.toLowerCase() === 'parlay' ? (
                  <div className="parlay-legs">
                    <h4>Parlay Legs:</h4>
                    {bet.legs?.length ? (
                      bet.legs.map((leg: any, idx: number) => (
                        <p key={idx}>
                          • {leg.title ?? 'Untitled'} : {typeof leg.odds === 'number' ? formatOdds(leg.odds) : 'N/A'}
                        </p>
                      ))
                    ) : (
                      <p>No legs available.</p>
                    )}
                  </div>
                ) : (
                  <p>Title:{bet.straightBetTitle ?? 'N/A'}</p>

                )}
                <p>Payout: <span className='bold-value'>${bet.payout}</span></p>
                <p>Placed on: {new Date(bet.createdAt).toLocaleString()}</p>
                <div className='deletebtn'>
                  <button onClick={() => handleDelete(bet._id)}>🗑️</button>
                </div>

              </div>

            ))
          ) : (
            <p>No bet slips found for this range.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBets;