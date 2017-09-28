// import {
//   Enum,
//   Class
// } from 'meteor/jagi:astronomy';

// export const TaxStat = Enum.create({
//   name: 'TaxStat',
//   identifiers: {
//     TAXDEFERRED: 1,
//     NONTAXABLE: 2,
//     TAXABLE: 3
//   }
// });
// export const TaxMeth = Enum.create({
//   name: 'TaxMeth',
//   identifiers: {
//     FIFO: 1,
//     LIFO: 2,
//     WA: 3,
//   }
// });
// export const Component = Class.create({
//   name: 'Component',
//   fields: {
//     Component: String,
//     Allocation: Number,
//   }
// });
// export const ClassAllocation = Class.create({
//   name: 'ClassAllocation',
//   fields: {
//     AccountId: String,
//     ClassName: String,
//     AsOfDate: Date,
//     TotalEmv: Number,
//     UnsupervisedEmv: Number,
//     SupervisedEmv: Number,
//   }
// });
// export const CostB = Class.create({
//   name: 'CostB',
//   fields: {
//     TaxLotID: {
//       type: String,
//       optional: true,
//     },
//     Ticker: {
//       type: String,
//       optional: true,
//     },
//     DisplayCusip: {
//       type: String,
//       optional: true,
//     },
//     Cusip: {
//       type: String,
//       optional: true,
//     },
//     AssetName: {
//       type: String,
//       optional: true,
//     },
//     AlternativeIdentifier: {
//       type: String,
//       optional: true,
//     },
//     TradeDate: {
//       type: Date,
//       optional: true,
//     },
//     OpenDate: {
//       type: Date,
//       optional: true,
//     },
//     TaxStatus: {
//       type: TaxStat,
//       optional: true,
//     },
//     EMV: {
//       type: Number,
//       optional: true,
//     },
//     Units: {
//       type: Number,
//       optional: true,
//     },
//     CostBasis: {
//       type: Number,
//       optional: true,
//     },
//     Proceeds: {
//       type: Number,
//       optional: true,
//     },
//     RealizedLT: {
//       type: Number,
//       optional: true,
//     },
//     RealizedST: {
//       type: Number,
//       optional: true,
//     },
//     UnrealizedST: {
//       type: Number,
//       optional: true,
//     },
//     UnrealizedLT: {
//       type: Number,
//       optional: true,
//     },
//     UnrealizedSTAccrual: {
//       type: Number,
//       optional: true,
//     },
//     UnrealizedLTAccrual: {
//       type: Number,
//       optional: true,
//     },
//     Accrual: {
//       type: Number,
//       optional: true,
//     },
//     PriceFactor: {
//       type: Number,
//       optional: true,
//     },
//     PaydownFactor: {
//       type: Number,
//       optional: true,
//     },
//     Ordinal: {
//       type: Number,
//       optional: true,
//     },
//     Cash: {
//       type: Boolean,
//       optional: true,
//     }
//   }
// });

// //_id is passed as null from the Batch Account.Holding[], Not included
// export const Holding = Class.create({
//   name: 'Holding',
//   fields: {
//     Id: String,
//     AccountId: String,
//     AsOfDate: Date,
//     AssetId: String,
//     Ticker: String,
//     DisplayCusip: String,
//     Cusip: String,
//     AlternateId: String,
//     AssetName: String,
//     AssetNameShort: String,
//     ClassName: String,
//     SegmentName: String,
//     Discretionary: Boolean,
//     Supervised: Boolean,
//     Units: Number,
//     Billable: Boolean,
//     MoneyMarket: Boolean,
//     MarketValue: Number,
//     InvestmentDiscretion: {
//       type: Boolean,
//       optional: true,
//     },
//     VotingAuthority: {
//       type: Boolean,
//       optional: true,
//     },
//     PriceFactor: Number,
//     CouponRate: {
//       type: Number,
//       optional: true,
//     },
//     MuniState: {
//       type: String,
//       optional: true,
//       validators: [{
//         type: 'regexp',
//         param: /^A[LKSZRAEP]|C[AOT]|D[EC]|F[LM]|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEHINOPST]|N[CDEHJMVY]|O[HKR]|P[ARW]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]$/,
//       }]
//     },
//     CallDate: {
//       type: Date,
//       optional: true,
//     },
//     Yield: {
//       type: Number,
//       optional: true,
//     },
//     Sector: {
//       type: String,
//       optional: true,
//     },
//     Cash: {
//       type: Boolean,
//       optional: true,
//     },
//   },
// });

// export const Manager = Class.create({
//   name: 'Manager',
//   fields: {
//     FirstName: String,
//     LastName: String,
//     ID: String,
//   }
// });
// export const RepCode = Class.create({
//   name: 'RepCode',
//   fields: {
//     Code: String,
//     RepName: {
//       type: String,
//       optional: true,
//     },
//   }
// });
// export const SegmentAllocation = Class.create({
//   name: 'SegmentAllocation',
//   fields: {
//     AsOfDate: Date,
//     ClassName: String,
//     SegmentName: String,
//     TotalEmv: Number,
//     SupervisedEmv: Number,
//     UnsupervisedEmv: Number,
//     AccountId: String,
//   }
// });
// export const TaxLot = Class.create({
//   name: 'TaxLot',
//   fields: {
//     TaxLotID: {
//       type: String,
//       optional: true,
//     },
//     Ticker: {
//       type: String,
//       optional: true,
//     },
//     DisplayCusip: {
//       type: String,
//       optional: true,
//     },
//     Cusip: {
//       type: String,
//       optional: true,
//     },
//     AssetName: {
//       type: String,
//       optional: true,
//     },
//     AssetId: {
//       type: Number,
//       optional: true,
//     },
//     AlternativeIdentifier: {
//       type: String,
//       optional: true,
//     },
//     TradeDate: {
//       type: Date,
//       optional: true,
//     },
//     OpenDate: {
//       type: Date,
//       optional: true,
//     },
//     TaxStatus: {
//       type: TaxStat,
//       optional: true,
//     },
//     EMV: {
//       type: Number,
//       optional: true,
//     },
//     Units: {
//       type: Number,
//       optional: true,
//     },
//     CostBasis: {
//       type: Number,
//       optional: true,
//     },
//     Proceeds: {
//       type: Number,
//       optional: true,
//     },
//     RealizedLT: {
//       type: Number,
//       optional: true,
//     },
//     RealizedST: {
//       type: Number,
//       optional: true,
//     },
//     UnrealizedST: {
//       type: Number,
//       optional: true,
//     },
//     UnrealizedLT: {
//       type: Number,
//       optional: true,
//     },
//     UnrealizedSTAccrual: {
//       type: Number,
//       optional: true,
//     },
//     UnrealizedLTAccrual: {
//       type: Number,
//       optional: true,
//     },
//     Accrual: {
//       type: Number,
//       optional: true,
//     },
//     PriceFactor: {
//       type: Number,
//       optional: true,
//     },
//     PaydownFactor: {
//       type: Number,
//       optional: true,
//     },
//     Ordinal: {
//       type: Number,
//       optional: true,
//     },
//     Cash: {
//       type: Boolean,
//       optional: true,
//     },
//   }
// });

// export const Target = Class.create({
//   name: 'Target',
//   fields: {
//     PortfolioId: {
//       type: String,
//       optional: true,
//     },
//     AccountId: {
//       type: String,
//       optional: true,
//     },
//     Name: {
//       type: String,
//       optional: true,
//     },
//     Description: {
//       type: String,
//       optional: true,
//     },
//     StartDate: {
//       type: Date,
//       optional: true,
//     },
//     EndDate: {
//       type: Date,
//       optional: true,
//     },
//     TargetLevel: {
//       type: Number,
//       optional: true,
//     },
//     Components: {
//       type: [Component],
//       optional: true,
//     },
//     Id: {
//       type: String,
//       optional: true,
//     },
//   },
// });

// export const Detail = Class.create({
//   name: 'Detail',
//   fields: {
//     AccountId: String,
//     MaxAccountAsOfDate: Date,
//     TotalEmv: Number,
//     UnsupervisedEmv: Number,
//     SupervisedEmv: Number,
//     RealizedShortTermGainLoss: {
//       type: Number,
//       optional: true,
//     },
//     RealizedLongTermGainLoss: {
//       type: Number,
//       optional: true,
//     }
//   },
// });
