export interface IAdmin {
    _id: string;
    
    fullname: string;
  
    email: string;
  
    type: number;
  
    password: string;
  
    permissions: string[];
  
    picture: string;

    created_at: string;
  }