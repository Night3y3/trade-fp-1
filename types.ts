export interface Stock {
  symbol: string;
  details: {
    open_price: number;
    close_price: number;
    percent_change: number;
    volume: number;
    high: number;
    low: number;
  };
}
