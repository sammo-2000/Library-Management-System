export type planType = {
  type: string;
  name: string;
  info: string;
};

export const plans: planType[] = [
  {
    type: "month",
    name: "Monthly Plan",
    info: "£5 per month, billed monthly, cancel anytime",
  },
  {
    type: "year",
    name: "Yearly Plan",
    info: "£50 per year, billed annually, cancel anytime",
  },
];
