export class APIResponse {
  status: string;
  message: string;
  errors: ErrorResponseItem[];
}

export class ErrorResponseItem {
  field: string;
  message: string;
}
