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
  betType: { type: String, enum: ['Straightup', 'Parlay'], required: true },
  stake: { type: Number, required: true },
  straightBetTitle: { type: String, required: false },
  payout: { type: Number, required: true },
  odds: { type: Number, required: false },
  legs: [legSchema],
  createdAt: { type: Date, default: Date.now }
});




const BetSlipModel = model<BetSlip>('BetSlip', betSlipSchema);

export default BetSlipModel;
