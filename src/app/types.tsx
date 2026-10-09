export interface IProductAll {
  id: string;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;

  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;

  change: {
    dir: string;
    pct: number;
  };

  markets: IMarket[];
}

interface IMarket {
  market: string,
  division: string,
  min: number,
  max: number,
}