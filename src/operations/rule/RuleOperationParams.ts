/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { RequestToCreateRule, RequestToUpdateRule } from "../../base/interfaces/apiEntities/RuleInterfaces";
import { AuthorizationParam, CollectionRequestParams } from "../../base/interfaces/CommonInterfaces";

/** Url parameters supported in Rule list query. */
export interface ParamsToGetRuleListUrl extends CollectionRequestParams {
  /** Filters Rules for a specific project. */
  projectId: string;
}

/** Parameters for get Rule list operation. */
export interface ParamsToGetRuleList extends AuthorizationParam {
  /** Parameters that will be appended to the entity list request url that will narrow down the results. */
  urlParams?: ParamsToGetRuleListUrl;
}

/** Parameters for get single Rule operation. */
export interface ParamsToGetRule extends AuthorizationParam {
  /** Rule id. */
  ruleId: string;
}

/** Parameters for delete single Rule operation. */
export type ParamsToDeleteRule = ParamsToGetRule;

/** Parameters for create Rule operation. */
export interface ParamsToCreateRule extends AuthorizationParam {
  /** Rule create request body. */
  createRuleBody: RequestToCreateRule;
}

/** Parameters for update Rule operation. */
export interface ParamsToUpdateRule extends ParamsToGetRule {
  /** Rule update request body. */
  updateRuleBody: RequestToUpdateRule;
}
