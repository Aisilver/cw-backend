import type { ApiResponse, RESPONSE_CODE_TYPES } from "@shared/common/api-response.js";

export function ApiSuccessResponse<Data = unknown> (data?: Data): ApiResponse {
    return {
        data,
        state: "succeeded",
        code: null
    }
}

export function ApiFailureResponse (message: string, code?: RESPONSE_CODE_TYPES): ApiResponse {
    return {
        message,
        data: undefined,
        state: "failed",
        code: code ?? null
    }
}