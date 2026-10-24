export type RESPONSE_CODE_TYPES = "ACCESS_TOKEN_EXPIRED"

export type ApiResponse<Data = unknown> = {
    data: Data,
    message?: string,
    state: "failed" | "succeeded",
    code: RESPONSE_CODE_TYPES | null
}