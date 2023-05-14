export interface JwtPayload {
  id: string;
  email: string;
  full_name: string;
}

export interface JwtTokens {
  access_token: string;
  refresh_token: string;
}
