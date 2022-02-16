/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { OperationsBase } from "../../base/OperationsBase";
import { GetResultResponse } from "../../base/interfaces/apiEntities/ResultInterfaces";
import { OperationOptions } from "../OperationOptions";
import { GetResultParams } from "./ResultOperationParams";

export class ResultOperations<TOptions extends OperationOptions> extends OperationsBase<TOptions> {
  constructor(
    options: TOptions,
  ) {
    super(options);
  }

  /**
   * Gets a Result identified by id. This method returns a Result in its full representation.
   * Wraps the {@link https://developer.bentley.com/apis/validation/operations/get-validation-propertyvalue-result/
   * Get Result} operation from Property Validation API.
   * @param {GetResultParams} params parameters for this operation. See {@link GetResultParams}.
   * @returns {Promise<GetResultResponse>} a Result with specified id. See {@link Result}.
   */
  public async get(params: GetResultParams): Promise<GetResultResponse> {
    const resultResponse: GetResultResponse = await this.queryResult(params);
    return resultResponse;
  }

  protected async queryResult(params: GetResultParams): Promise<GetResultResponse> {
    const { authorization, resultId } = params;
    const response = await this.sendGetRequest<GetResultResponse>({
      authorization,
      url: this._options.urlFormatter.getResultUrl({ resultId }),
    });
    return response;
  }

}
