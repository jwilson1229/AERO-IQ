import { Schema, model, Document } from 'mongoose';

const legSchema = new Schema ({
  title: {
    type: String,
    required: true,
  },
  odds: {
    type: Number,
    required: true,
  }
});

interface BetSlip extends Document {
  betType: string;
  stake: number;
  straightBetTitle: string;
  payout: number;
  odds: number;      
  createdAt: Date;
}

const betSlipSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true},
  betType: { type: String, enum: ['straightup', 'parlay']},
  stake: { type: Number},
  straightBetTitle: { type: String},
  payout: { type: Number},
  odds: { type: Number},
  legs: [legSchema],
  createdAt: { type: Date, default: Date.now }
});




const BetSlipModel = model<BetSlip>('BetSlip', betSlipSchema);

export default BetSlipModel;
