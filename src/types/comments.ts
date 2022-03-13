export interface IComment {
  _id: string;
  
    business_id: string;

    rating: number;

    comment: string;
  
    fullname: string;
  
    email: string;
  
    pictures: string[];

    created_at: Date;

    updated_at: Date;

    reviewed: boolean;
  }