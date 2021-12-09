export interface IComment {
    business_id: string;

    rating: number;

    comment: string;
  
    fullname: string;
  
    email: string;
  
    pictures: string[];

    created_at: Date;
  }