import { Schema, model } from 'mongoose';
const legSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    odds: {
        type: Number,
        required: false,
    }
});
const betSlipSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    betType: { type: String, enum: ['Straightup', 'Parlay'], required: true },
    stake: { type: Number, required: true },
    straightBetTitle: { type: String, required: false },
    payout: { type: Number, required: true },
    odds: { type: Number, required: false },
    legs: [legSchema],
    createdAt: { type: Date, default: Date.now },
}, {
    timestamps: true,
    toJSON: {
        transform(_, ret) {
            ret.createdAt = new Date(ret.createdAt).toLocaleString();
            return ret;
        }
    }
});
const BetSlipModel = model('BetSlip', betSlipSchema);
export default BetSlipModel;
