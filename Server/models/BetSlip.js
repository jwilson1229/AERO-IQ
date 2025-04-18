"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const betSlipSchema = new mongoose_1.Schema({
    betType: { type: String, required: true },
    stake: { type: Number, required: true },
    straightBetTitle: { type: String, required: true },
    payout: { type: Number, required: true },
    odds: { type: Number, required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now }
});
const BetSlipModel = (0, mongoose_1.model)('BetSlip', betSlipSchema);
exports.default = BetSlipModel;
