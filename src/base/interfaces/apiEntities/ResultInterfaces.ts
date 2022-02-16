/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

/** Result details. */
export interface ResultDetails {
  /** Element id. */
  elementId: string;
  /** Element display name. */
  elementLabel: string;
  /** Rule index. */
  ruleIndex: string;
  /** Result value. */
  badValue: string;
}

/** Rule details. */
export interface RuleList {
  /** Rule id. */
  id: string;
  /** Rule display name. */
  displayName: string;
}

/** Single Result API response. */
export interface GetResultResponse {
  result: ResultDetails[];
  ruleList: RuleList[];
}
