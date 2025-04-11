import React, { useState } from 'react';
import '../../styles/betslip.css';
import { gql, useMutation } from '@apollo/client';
import { Image } from '@chakra-ui/react';
import logo from "../assets/images/aero_iq_logo_transparent.png";

const CREATE_BET_SLIP = gql`
    mutation createBetSlip($betType: String!, $stake: Float!, $straightBetTitle: String!, $payout: Float!, $odds: Float!) {
        createBetSlip(betType: $betType, stake: $stake, straightBetTitle: $straightBetTitle, payout: $payout, odds: $odds) {
            betType
            stake
            straightBetTitle
            payout
            odds
        }
    }
`;

type ParlayLeg = {
  title: string;
  odds: string;
};

const BetSlipForm = () => {
  const [betType, setBetType] = useState<'straightup' | 'parlay' | ''>(''); 
  const [odds, setOdds] = useState('');
  const [stake, setStake] = useState('');
  const [error, setError] = useState('');
  const [payout, setPayout] = useState('');
  const [parlayLegs, setParlayLegs] = useState<ParlayLeg[]>([]);
  const [parlayLegTitle, setParlayLegTitle] = useState('');
  const [parlayLegOdds, setParlayLegOdds] = useState('');
  const [straightBetTitle, setStraightBetTitle] = useState('');

  const [createBetSlip] = useMutation(CREATE_BET_SLIP);

  const calculatePayout = () => {
    setError('');
    setPayout('');

    const bet = parseFloat(stake);
    if (isNaN(bet)) {
      setError('Please enter a valid stake amount');
      return;
    }

    if (betType === 'straightup') {
      const odd = parseFloat(odds);
      if (isNaN(odd)) {
        setError('Please enter valid odds');
        return;
      }

      const potentialPayout = odd > 0
        ? bet + (bet * (odd / 100))
        : bet + (bet * (100 / Math.abs(odd)));
      
      setPayout(potentialPayout.toFixed(2));
      return;
    }

    if (betType === 'parlay') {
      if (parlayLegs.length === 0) {
        setError('Please add at least one parlay leg');
        return;
      }

      let totalMultiplier = 1;
      for (const leg of parlayLegs) {
        const legOdds = parseFloat(leg.odds);
        if (isNaN(legOdds)) {
          setError(`Invalid odds for leg: ${leg.title}`);
          return;
        }

        totalMultiplier *= legOdds > 0
          ? (1 + (legOdds / 100))
          : (1 + (100 / Math.abs(legOdds)));
      }

      const potentialPayout = bet * totalMultiplier;
      setPayout(potentialPayout.toFixed(2));
      return;
    }

    setError('Please select a bet type');
  };

  const handleAddLeg = () => {
    if (!parlayLegTitle.trim()) {
      setError('Please enter a leg title');
      return;
    }

    const legOdds = parseFloat(parlayLegOdds);
    if (isNaN(legOdds)) {
      setError('Please enter valid odds for the leg');
      return;
    }

    setParlayLegs([...parlayLegs, {
      title: parlayLegTitle,
      odds: parlayLegOdds
    }]);
    setParlayLegTitle('');
    setParlayLegOdds('');
    setError('');
  };

  const handleRemoveLeg = (index: number) => {
    const updatedLegs = [...parlayLegs];
    updatedLegs.splice(index, 1);
    setParlayLegs(updatedLegs);
  };

  const handleBetTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as 'straightup' | 'parlay' | '';
    setBetType(value);
    setParlayLegs([]);
    setStraightBetTitle('');
    setStake('');
    setOdds('');
    setPayout('');
    setError('');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await createBetSlip({
        variables: {
          betType,
          stake: parseFloat(stake),
          straightBetTitle,
          payout: parseFloat(payout),
          odds: parseFloat(odds)
        }
      });
      console.log('Bet Slip Created:', data.createBetSlip);  
    } catch (error) {
      alert('Failed to create bet slip');
      console.error(error);  
    }
  };

  return (
    <div className="bet-slip-container">
      <div className="bet-slip-form">
        <Image src={logo} alt="Aero IQ Logo" boxSize="85px" mr={1} borderRadius={10} background="transparent" boxShadow="md" />
        
        <div className="form-group">
          <label htmlFor="betType">Bet Type</label>
          <select
            id="betType"
            value={betType}
            onChange={handleBetTypeChange}
            className="form-control"
          >
            <option value="">Select Bet Type</option>
            <option value="straightup">Straight Bet</option>
            <option value="parlay">Parlay</option>
          </select>
        </div>

        {betType === 'straightup' && (
          <>
            <div className="form-group">
              <label htmlFor="straightBetTitle">Bet Title</label>
              <input
                type="text"
                id="straightBetTitle"
                value={straightBetTitle}
                onChange={(e) => setStraightBetTitle(e.target.value)}
                placeholder="ex: Moneyline"
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="odds">Odds</label>
              <input
                type="text"
                id="odds"
                value={odds}
                onChange={(e) => setOdds(e.target.value)}
                placeholder="ex: -110"
                className="form-control"
                required
              />
            </div>
          </>
        )}

        <div className="form-group">
          <label htmlFor="stake">Stake ($)</label>
          <input
            type="number"
            id="stake"
            value={stake}
            onChange={(e) => setStake(e.target.value)}
            placeholder="Amount to bet"
            min="0.01"
            step="0.01"
            className="form-control"
            required
          />
        </div>

        {betType === 'parlay' && (
          <div className="parlay-section">
            <h3>Parlay Legs</h3>
            
            <div className="form-group">
              <label htmlFor="parlayLegTitle">Leg Title</label>
              <input
                type="text"
                id="parlayLegTitle"
                value={parlayLegTitle}
                onChange={(e) => setParlayLegTitle(e.target.value)}
                placeholder="ex: Over/Under"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="parlayLegOdds">Leg Odds</label>
              <input
                type="text"
                id="parlayLegOdds"
                value={parlayLegOdds}
                onChange={(e) => setParlayLegOdds(e.target.value)}
                placeholder="ex: -110 or +150"
                className="form-control"
              />
            </div>

            <button
              type="button"
              onClick={handleAddLeg}
              className="btn btn-secondary"
            >
              Add Leg 😧
            </button>

            {parlayLegs.length > 0 && (
              <div className="parlay-legs-list">
                <h4>Current Legs</h4>
                <ul>
                  {parlayLegs.map((leg, index) => (
                    <li key={index} className="parlay-leg-item">
                      <span>{leg.title} (Odds: {leg.odds})</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveLeg(index)}
                        className="btn btn-sm btn-danger"
                      >
                        ❌
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <button
          type="button"
          onClick={calculatePayout}
          className="btn btn-primary calculate-btn"
        >
          Calculate Payout
        </button>

        {payout && (
          <div className="result">
            <h3>Potential Payout: <span>${payout}</span></h3>
            <p>Stake: ${stake || '0'} | Profit: ${(parseFloat(payout) - parseFloat(stake || '0')).toFixed(2)}</p>
          </div>
        )}

        <button
          type="button"
          onClick={handleSave}
          className="btn btn-success save-bet-bttn"
          disabled={!payout}
        >
          Save Bet
        </button>

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default BetSlipForm;
