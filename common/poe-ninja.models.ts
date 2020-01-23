export interface SparkLine {
  data: number[];
  totalChange: number;
}

export interface CurrencyValueDetails {
  count: number;
  data_point_count: number;
  get_currency_id: number;
  id: number;
  includes_secondary: boolean;
  league_id: number;
  pay_currency_id: number;
  sample_time_utc: string;
  value: number;
}

export interface CurrencyLine {
  chaosEquivalent: number;
  currencyTypeName: string;
  detailsId: string;
  lowConfidencePaySparkLine: SparkLine;
  lowConfidenceReceiveSparkLine: SparkLine;
  pay: CurrencyValueDetails;
  paySparkLine: SparkLine;
  receive: CurrencyValueDetails;
  receiveSparkLine: SparkLine;
}
