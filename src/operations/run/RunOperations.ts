/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { OperationsBase } from "../../base/OperationsBase";
import { PreferReturn } from "../../base/interfaces/CommonInterfaces";
import type { MinimalRun, ResponseFromGetRun, ResponseFromGetRunList, ResponseFromGetRunListMinimal, RunDetails } from "../../base/interfaces/apiEntities/RunInterfaces";
import type { OperationOptions } from "../OperationOptions";
import type { ParamsToDeleteRun, ParamsToGetRun, ParamsToGetRunList } from "./RunOperationParams";

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
   * @param {ParamsToGetRunList} params parameters for this operation. See {@link ParamsToGetRunList}.
   * @returns {Promise<MinimalRun[]>} minimal Run list. See {@link MinimalRun}.
   */
  public async getMinimalList(params: ParamsToGetRunList): Promise<MinimalRun[]> {
    const response = await this.sendGetRequest<ResponseFromGetRunListMinimal>({
      // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
      accessToken: params.accessToken ?? await this._options.accessTokenCallback!(),
      url: this._options.urlFormatter.getRunListUrl({ urlParams: params.urlParams }),
      preferReturn: PreferReturn.Representation,
    });
    return response.runs;
  }

  /**
   * Gets Runs for a specific project. This method returns Runs in their full representation. The returned
   * iterator internally queries entities in pages. Wraps the
   * {@link https://developer.bentley.com/apis/validation/operations/get-validation-propertyvalue-runs/ Get Runs}
   * operation from Property Validation API.
   * @param {ParamsToGetRunList} params parameters for this operation. See {@link ParamsToGetRunList}.
   * @returns {Promise<RunDetails[]>} array of Run details. See {@link RunDetails}.
   */
  public async getRepresentationList(params: ParamsToGetRunList): Promise<RunDetails[]> {
    const response = await this.sendGetRequest<ResponseFromGetRunList>({
      // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
      accessToken: params.accessToken ?? await this._options.accessTokenCallback!(),
      url: this._options.urlFormatter.getRunListUrl({ urlParams: params.urlParams }),
      preferReturn: PreferReturn.Representation,
    });
    return response.runs;
  }

  /**
   * Gets a single Run identified by id. This method returns a Run in its full representation.
   * Wraps the {@link https://developer.bentley.com/apis/validation/operations/get-validation-propertyvalue-run/
   * Get Run} operation from Property Validation API.
   * @param {ParamsToGetRun} params parameters for this operation. See {@link ParamsToGetRun}.
   * @returns {Promise<RunDetails>} a Run with specified id. See {@link RunDetails}.
   */
  public async getSingle(params: ParamsToGetRun): Promise<RunDetails> {
    const { accessToken, runId } = params;
    const response = await this.sendGetRequest<ResponseFromGetRun>({
      // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
      accessToken: accessToken ?? await this._options.accessTokenCallback!(),
      url: this._options.urlFormatter.getSingleRunUrl({ runId }),
    });
    return response.run;
  }

  /**
   * Deletes a Run. Wraps the {@link https://developer.bentley.com/apis/validation/operations/delete-validation-propertyvalue-run/
   * Delete Run} operation from Property Validation API.
   * @param {ParamsToDeleteRun} params parameters for this operation. See {@link ParamsToDeleteRun}.
   * @returns {Promise<void>}.
   */
  public async delete(params: ParamsToDeleteRun): Promise<void> {
    await this.sendDeleteRequest<void>({
      // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
      accessToken: params.accessToken ?? await this._options.accessTokenCallback!(),
      url: this._options.urlFormatter.deleteRunUrl(params),
    });
  }
}
