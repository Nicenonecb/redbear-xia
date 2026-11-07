/** First stage retains the original tuning. Later stages support 3–4 upgrades and one weapon purchase. */
export const STAGE_BALANCE = [
  { hp: 1, damage: 1, exp: 1, coins: 1 },
  { hp: 1.4, damage: 1.1, exp: 2.1, coins: 1.8 },
  { hp: 1.8, damage: 1.2, exp: 3.2, coins: 2.5 },
] as const;
export const HEART_CHARM_PRICE = 150;
