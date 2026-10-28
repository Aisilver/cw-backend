export type RESPONSE_CODE_TYPES = "ACCESS_TOKEN_EXPIRED" | "API_RESPONSE_DECRYPTION_FAILED"

export type ApiResponse<Data = unknown> = {
    state: "failed" | "succeeded",
    data?: Data,
    message?: string,
    code?: RESPONSE_CODE_TYPES
}