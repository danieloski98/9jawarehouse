export interface IUser {
  _id: string;
  
  email: string;

  password: string;

  phone: string;

  first_name: string;

  last_name: string;

  verified: boolean;

  pin: boolean;

  passwordless: boolean;

  blocked: boolean;

  disabled: boolean;

  username: string;

  business_address: string;

  profile_pic: string;

  pictures: string[];

  business_name: string;

  business_description: string;

  services: string[];

  state: string;

  country: string;

  lga: string;

  facebook: string;

  linkedin: string;

  instagram: string;

  twitter: string;

  whatsapp: string;

  website: string;

  nextPayment: string;

  rating: number;

  certificates: ICertificate[];

  createAt: string;

  commentLength?: number;
}

export interface ICertificate {
  certificate: string;
  year: string;
  link: string;
  organization: string;
}