/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { AuthorizationParam } from "../../base/interfaces/CommonInterfaces";

/** Parameters for get Result operation. */
export interface GetResultParams extends AuthorizationParam {
  /** Result id. */
  resultId: string;
}
