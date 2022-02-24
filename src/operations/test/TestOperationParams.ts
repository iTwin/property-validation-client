/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { RequestToCreateTest, RequestToRunTest, RequestToUpdateTest } from "../../base/interfaces/apiEntities/TestInterfaces";
import { AuthorizationParam, CollectionRequestParams } from "../../base/interfaces/CommonInterfaces";

/** Url parameters supported in Test list query. */
export interface ParamsToGetTestListUrl extends CollectionRequestParams {
  /** Filters Tests for a specific project. */
  projectId: string;
}

/** Parameters for get Test list operation. */
export interface ParamsToGetTestList extends AuthorizationParam {
  /** Parameters that will be appended to the entity list request url that will narrow down the results. */
  urlParams?: ParamsToGetTestListUrl;
}

/** Parameters for get single Test operation. */
export interface ParamsToGetTest extends AuthorizationParam {
  /** Test id. */
  testId: string;
}

/** Parameters for delete Test operation. */
export type ParamsToDeleteTest = ParamsToGetTest;

/** Parameters for create Test operation. */
export interface ParamsToCreateTest extends AuthorizationParam {
  /** Test create request body. */
  createTestBody: RequestToCreateTest;
}

/** Parameters for update Test operation. */
export interface ParamsToUpdateTest extends ParamsToGetTest {
  /** Test update request body. */
  updateTestBody: RequestToUpdateTest;
}

/** Parameters for Run Test operation. */
export interface ParamsToRunTest extends AuthorizationParam {
  /** Run test request body. */
  runTestBody: RequestToRunTest;
}
