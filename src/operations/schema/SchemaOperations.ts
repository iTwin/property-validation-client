/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { OperationUtils } from "../OperationUtils";
import { OperationsBase } from "../../base/OperationsBase";
import type { ResponseFromGetPropertiesInfo } from "../../base/interfaces/apiEntities/PropertiesInfoInterfaces";
import type { OperationOptions } from "../OperationOptions";
import type { ParamsToExtractSchemaInfo, ParamsToGetPropertiesInfo } from "./SchemaOperationParams";

export class SchemaOperations<TOptions extends OperationOptions> extends OperationsBase<TOptions> {
  constructor(
    options: TOptions,
  ) {
    super(options);
  }

  /**
   * Extracts schema/properties info. Required once per iModel before calling getPropertiesInfo().
   * Extraction is only performed if needed. Wraps the {@link https://developer.bentley.com/apis/clash-detection/operations/extract-schema-info/
   * Extract schema info} operation from Clash Detection API.
   * @param {ParamsToExtractSchemaInfo} parameters for this operation. See {@link ParamsToExtractSchemaInfo}.
   * @returns {Promise<void>}.
   * @deprecated The method should not be used
   */
  public async extractSchemaInfo(params: ParamsToExtractSchemaInfo): Promise<void> {
    const { accessToken, iModelId, projectId } = params;
    const body = {
      projectId,
    };
    OperationUtils.ensureAccessTokenProvided(accessToken, this._options.accessTokenCallback);
    await this.sendPostRequest<void>({
      // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
      accessToken: accessToken ?? await this._options.accessTokenCallback!(),
      url: this._options.urlFormatter.extractSchemaInfoUrl({ iModelId }),
      body,
    });
  }

  /**
   * Gets properties info identified by project and iModel id.
   * Wraps the {@link https://developer.bentley.com/apis/validation/operations/get-validation-propertyvalue-properties/
   * Get properties info} operation from Property Validation API.
   * @param {ParamsToGetPropertiesInfo} params parameters for this operation. See {@link ParamsToGetPropertiesInfo}.
   * @returns {Promise<ResponseFromGetPropertiesInfo>} status and properties info for the specified iModel and filter string. See {@link ResponseFromGetPropertiesInfo}.
   */
  public async getPropertiesInfo(params: ParamsToGetPropertiesInfo): Promise<ResponseFromGetPropertiesInfo> {
    const { accessToken, iModelId } = params;
    OperationUtils.ensureAccessTokenProvided(accessToken, this._options.accessTokenCallback);
    const response = await this.sendGetRequest<ResponseFromGetPropertiesInfo>({
      // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
      accessToken: accessToken ?? await this._options.accessTokenCallback!(),
      url: this._options.urlFormatter.getPropertiesInfoUrl({ iModelId, urlParams: params.urlParams }),
    });
    return response;
  }
}
