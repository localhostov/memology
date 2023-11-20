import { ErrorResponse } from "@shared"

export class APIError extends Error {
    private code: ErrorResponse["code"]
    private isAPIError: boolean

    constructor(text: string) {
        super()
        const buffer = new TextEncoder().encode(text)

        const data = ErrorResponse.fromBinary(buffer)
        this.code = data.code
        this.message = data.message
        this.isAPIError = true
    }
}

export function isAPIError(data: Error): data is APIError {
    return "isAPIError" in data
}
