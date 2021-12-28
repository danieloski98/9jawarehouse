export interface ILga {
  SerialNumber: number;
  Country: string;
  State: string;
  LGA: string;
  SenDistrict: string;
  SenDistrictCode: string;
  Shape_Length: string;
  Shape_Area: '0,001524';
}

export interface IState {
  info: {
    officialName: string;
    Governor: string;
    DeputyGovernor: string;
    Population: number;
    Slogan: string;
    Capital: string;
    Area: number;
    Latitude: string;
    Longitude: string;
    Number_of_LGAS: number;
    Date_created: string;
    Website: string;
  };
  Name: string;
}
