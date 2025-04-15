import { User } from '../models/User';
import { signToken } from '../utils/auth';
import BetSlip from '../models/BetSlip';

export const resolvers = {
    Query: {
        me: async (_, __, context) => {
            if(!context.user) throw new Error("Denied");
            return User.findById(context.user._id);
        },
    },
    Mutation: {
        addUser: async(_, {username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (_, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error("Invalid Login: User not found");
            }
            const isMatch = await user.isCorrectPassword(password);
            if (!isMatch) {
                throw new Error("Invalid Login: Incorrect password");
            }
            const token = signToken(user);
            return { token, user };
        },
        
        createBetSlip: async (_, { input }: any, context:any) => {
            if (!context.user) {
           throw new Error('You must be logged in to create a bet slip');
          }
          const { betType, stake, straightBetTitle, payout, odds, legs } = input;

          const betSlipData: any = {
            betType,
            stake,
            payout,
            user: context.user._id,
          };

          if (betType == 'Straightup') {
            betSlipData.straightBetTitle = straightBetTitle;
            betSlipData.odds = odds;
          } else if (betType == 'Parlay') {
            betSlipData.legs = legs;
            betSlipData.odds = odds;
          }

          const betSlip = await BetSlip.create(betSlipData);

          await User.findByIdAndUpdate(context.user._id, {
            $push: { betSlips: betSlip._id}
          });

          return betSlip;
        }
      }
    }
