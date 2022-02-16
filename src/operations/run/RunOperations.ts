/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { OperationsBase } from "../../base/OperationsBase";
import { PreferReturn } from "../../base/interfaces/CommonInterfaces";
import { GetMinimalRunsResponse, GetRunResponse, GetRunsResponse, RunDetails } from "../../base/interfaces/apiEntities/RunInterfaces";
import { OperationOptions } from "../OperationOptions";
import { DeleteRunParams, GetRunListParams, GetSingleRunParams } from "./RunOperationParams";

export class RunOperations<TOptions extends OperationOptions> extends OperationsBase<TOptions> {
  constructor(
    options: TOptions,
  ) {
    super(options);
  }

  /**
   * Gets Runs for a specific project. This method returns Runs in their minimal representation. The
   * returned iterator internally queries entities in pages. Wraps the
   * {@link https://developer.bentley.com/apis/validation/operations/get-validation-propertyvalue-runs/ Get Runs}
   * operation from Property Validation API.
   * @param {GetRunListParams} params parameters for this operation. See {@link GetRunListParams}.
   * @returns {EntityListIterator<MinimalRun>} iterator for Run list. See {@link EntityListIterator},
   * {@link MinimalRun}.
   */
  public async getMinimalList(params: GetRunListParams): Promise<GetMinimalRunsResponse> {
    const response = await this.sendGetRequest<GetMinimalRunsResponse>({
      authorization: params.authorization,
      url: this._options.urlFormatter.getRunListUrl({ urlParams: params.urlParams }),
      preferReturn: PreferReturn.Representation,
    });
    return response;
  }

  /**
   * Gets Runs for a specific project. This method returns Runs in their full representation. The returned
   * iterator internally queries entities in pages. Wraps the
   * {@link https://developer.bentley.com/apis/validation/operations/get-validation-propertyvalue-runs/ Get Runs}
   * operation from Property Validation API.
   * @param {GetRunListParams} params parameters for this operation. See {@link GetRunListParams}.
   * @returns {Promise<GetRunsResponse>} array of Run details. See {@link GetRunsResponse},
   * {@link Run}.
   */
  public async getRepresentationList(params: GetRunListParams): Promise<GetRunsResponse> {
    const response = await this.sendGetRequest<GetRunsResponse>({
      authorization: params.authorization,
      url: this._options.urlFormatter.getRunListUrl({ urlParams: params.urlParams }),
      preferReturn: PreferReturn.Representation,
    });
    return response;
  }

  /**
   * Gets a single Run identified by id. This method returns a Run in its full representation.
   * Wraps the {@link https://developer.bentley.com/apis/validation/operations/get-validation-propertyvalue-run/
   * Get Run} operation from Property Validation API.
   * @param {GetSingleRunParams} params parameters for this operation. See {@link GetSingleRunParams}.
   * @returns {Promise<Run>} a Run with specified id. See {@link Run}.
   */
  public async getSingle(params: GetSingleRunParams): Promise<RunDetails> {
    const run: RunDetails = await this.querySingleInternal(params);
    return run;
  }

  protected async querySingleInternal(params: GetSingleRunParams): Promise<RunDetails> {
    const { authorization, runId } = params;
    const response = await this.sendGetRequest<GetRunResponse>({
      authorization,
      url: this._options.urlFormatter.getSingleRunUrl({ runId }),
    });
    return response.run;
  }

  /**
   * Deletes a Run. Wraps the {@link https://developer.bentley.com/apis/validation/operations/delete-validation-propertyvalue-run/
   * Delete Run} operation from Property Validation API.
   * @param {SingleRunParams} params parameters for this operation. See {@link SinglRunParams}.
   * @returns no response data. See {@link Run}.
   */
  public async delete(params: DeleteRunParams): Promise<void> {
    await this.sendDeleteRequest<void>({
      authorization: params.authorization,
      url: this._options.urlFormatter.deleteRunUrl(params),
    });
  }
}
