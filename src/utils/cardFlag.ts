const cardGen = require("card-number-generator");

export const generateCardNumberBasedOnFlag = {
  Master: cardGen({ issuer: "MasterCard" }),
  Visa: cardGen({ issuer: "Visa" }),
};
