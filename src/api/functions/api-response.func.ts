import type { ApiResponse, RESPONSE_CODE_TYPES } from "@shared/common/api-response.js";

export function ApiSuccessResponse<Data = unknown> (data?: Data): ApiResponse {
    return {
        data,
        state: "succeeded"
    }
}

export function ApiFailureResponse (message: string, code?: RESPONSE_CODE_TYPES): ApiResponse {
    //@ts-ignore
    return {
        message,
        state: "failed",
        code
    }
}