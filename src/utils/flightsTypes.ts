export interface IFlights {
  body: Body;
  error: Error;
}

export interface Body {
  departure: Departure[];
  arrival: Arrival[];
}

export interface Arrival {
  fltNo: string;
  'fltTypeID.code': string;
  'fltTypeID.name': string;
  'fltCatID.code': string;
  'fltCatID.name': string;
  'planeTypeID.code': string;
  'planeTypeID.IATA': string;
  'planeTypeID.name': string;
  'airportFromID.code': string;
  'airportFromID.IATA': string;
  'airportFromID.name': string;
  term: string;
  'standID.code': string;
  'carrierID.code': string;
  'carrierID.IATA': string;
  timeArrShedule: string;
  timeArrExpectCalc: string;
  timeToStand: string;
  timeLandCalc: string;
  timeStandCalc: string;
  psgCount: number;
  cargoCount: number;
  mailCount: number;
  bagCount: number;
  bagWeigth: number;
  note?: string;
  actual: string;
  status: string;
  'airportFromID.name_en': string;
  'airportFromID.city': string;
  'airportFromID.city_en': string;
  'airportFromID.city_ru': string;
  ID: number;
  showOnSite: number;
  logo?: string;
  airline: Airline;
  codeShareData: CodeShareDatum[];
  planeNo?: string;
  timeTakeofFact?: string;
  timeLandFact?: string;
  timeStandFact?: string;
  codeShare?: string;
}

export interface Airline {
  en: En;
  ru: En;
  ua: En;
}

export interface En {
  id: number;
  name: string;
  icao: string;
  about: string;
  logoName?: string;
  logoSmallName: string;
  locale: string;
  showOnSite: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface CodeShareDatum {
  icao: string;
  codeShare: string;
  logo?: string;
  airline: Airline;
}

export interface Departure {
  ID: number;
  fltNo: string;
  'fltTypeID.code': string;
  'fltTypeID.name': string;
  'fltCatID.code': string;
  'fltCatID.name': string;
  'planeTypeID.code': string;
  'planeTypeID.IATA': string;
  'planeTypeID.name': string;
  planeNo?: string;
  'airportToID.code': string;
  'airportToID.IATA': string;
  'airportToID.name': string;
  checkinNo?: string;
  gateNo?: string;
  term: string;
  'standID.code': string;
  'carrierID.code': string;
  'carrierID.IATA': string;
  timeDepShedule: string;
  timeBoard?: string;
  timeDepExpectCalc: string;
  timeDepFact?: string;
  timeTakeofFact?: string;
  timeToStand: string;
  timeLandFact?: string;
  'delayReasonID.code': string;
  'delayReasonID.name': string;
  psgCount: number;
  cargoCount: number;
  mailCount: number;
  bagCount: number;
  bagWeigth: number;
  'handlerID.code': string;
  'handlerID.name': string;
  actual: string;
  status: string;
  'airportToID.name_en': string;
  'airportToID.city': string;
  'airportToID.city_en': string;
  'airportToID.city_ru': string;
  showOnSite: number;
  logo?: string;
  airline: Airline;
  codeShareData: CodeShareDatum[];
  delay: boolean;
  timeTakeofCalc?: string;
  codeShare?: string;
  note?: string;
}

export interface Error {
  code: number;
}
