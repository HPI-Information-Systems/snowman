export type SuccessResponse<T> = {
  payload: T;
  code: number;
};

export type ErrorResponse<T> = {
  error: T;
  code: number;
};

export class Service {
  static rejectResponse<T>(error: T, code: number): ErrorResponse<T> {
    return { error, code };
  }

  static successResponse<T>(payload: T, code: number): SuccessResponse<T> {
    return { payload, code };
  }

  static async response<T>(
    payload: () => Promise<T> | T,
    code: number,
    errorCode: number
  ): Promise<SuccessResponse<T>> {
    try {
      return Service.successResponse(await payload(), code);
    } catch (e) {
      throw Service.rejectResponse(e.message || e.toString(), errorCode);
    }
  }
}
