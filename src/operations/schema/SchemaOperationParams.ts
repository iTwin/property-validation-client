/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { AuthorizationParam } from "../../base/interfaces/CommonInterfaces";

/** Url parameters supported in properties info query. */
export interface ParamsToGetPropertiesInfoUrl {
  /** Project id. */
  projectId: string;
  /** Filter string to search for properties. */
  filter: string
}

/** Parameters for get properties info operation. */
export interface ParamsToGetPropertiesInfo extends AuthorizationParam {
  /** iModel id. */
  iModelId: string;
  /** Parameters that will be appended to the entity list request url that will narrow down the results. */
  urlParams?: ParamsToGetPropertiesInfoUrl;
}

/** Parameters for extract schema info operation. */
export interface ParamsToExtractSchemaInfo extends AuthorizationParam {
  /** iModel id. */
  iModelId: string;
  /** Project id. */
  projectId: string;
}