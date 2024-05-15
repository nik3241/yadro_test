

export interface IQuotes {
    quotes: number[]
    source: string,
    success: boolean,
    timestamp: number
}
export interface QuotesLive {
    quotes: Quotes;
    source: string;
    success: boolean;
    timestamp: number;
  }
  
  export interface Quotes {
    [сurrencyPair:string]: number;
  }