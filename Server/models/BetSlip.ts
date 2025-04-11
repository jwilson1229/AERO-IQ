import { Schema, model, Document, Types } from 'mongoose';

interface BetSlip extends Document {
  betType: string;
  stake: number;
  straightBetTitle: string;
  payout: number;
  odds: number;
  user: Types.ObjectId;      
  createdAt: Date;
}

const betSlipSchema = new Schema({
  betType: { type: String, required: true },
  stake: { type: Number, required: true },
  straightBetTitle: { type: String, required: true },
  payout: { type: Number, required: true },
  odds: { type: Number, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});




const BetSlipModel = model<BetSlip>('BetSlip', betSlipSchema);

export default BetSlipModel;
