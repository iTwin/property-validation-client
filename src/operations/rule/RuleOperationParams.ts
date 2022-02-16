/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { CreateRuleRequest, UpdateRuleRequest } from "../../base/interfaces/apiEntities/RuleInterfaces";
import { AuthorizationParam, CollectionRequestParams } from "../../base/interfaces/CommonInterfaces";

/** Url parameters supported in Rule list query. */
export interface GetRuleListUrlParams extends CollectionRequestParams {
  /** Filters Rules for a specific project. */
  projectId: string;
}

/** Parameters for get Rule list operation. */
export interface GetRuleListParams extends AuthorizationParam {
  /** Parameters that will be appended to the entity list request url that will narrow down the results. */
  urlParams?: GetRuleListUrlParams;
}

/** Parameters for get single Rule operation. */
export interface GetSingleRuleParams extends AuthorizationParam {
  /** Rule id. */
  ruleId: string;
}

/** Parameters for delete single Rule operation. */
export type DeleteRuleParams = GetSingleRuleParams;

/** Parameters for create Rule operation. */
export interface CreateRuleParams extends AuthorizationParam {
  /** Rule create request body. */
  createRuleBody: CreateRuleRequest;
}

/** Parameters for update Rule operation. */
export interface UpdateRuleParams extends GetSingleRuleParams {
  /** Rule update request body. */
  updateRuleBody: UpdateRuleRequest;
}
