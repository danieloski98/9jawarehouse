export interface IServerReturnObject {
    error: boolean;
    errorMessage?: any;
    successMessage?: any;
    data?: any;
    trace?: any;
    statusCode: number;
  }