export interface TokenResponse {
  access_token: string
}

export interface ValidationResult {
  valid: boolean
  returnCode?: string
  returnMessage?: string
}
