/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { CreateTestRequest, RunTestRequest, UpdateTestRequest } from "../../base/interfaces/apiEntities/TestInterfaces";
import { AuthorizationParam, CollectionRequestParams } from "../../base/interfaces/CommonInterfaces";

/** Url parameters supported in Test list query. */
export interface GetTestListUrlParams extends CollectionRequestParams {
  /** Filters Tests for a specific project. */
  projectId: string;
}

/** Parameters for get Test list operation. */
export interface GetTestListParams extends AuthorizationParam {
  /** Parameters that will be appended to the entity list request url that will narrow down the results. */
  urlParams?: GetTestListUrlParams;
}

/** Parameters for get single Test operation. */
export interface GetSingleTestParams extends AuthorizationParam {
  /** Test id. */
  testId: string;
}

/** Parameters for delete Test operation. */
export type DeleteTestParams = GetSingleTestParams;

/** Parameters for create Test operation. */
export interface CreateTestParams extends AuthorizationParam {
  /** Test create request body. */
  createTestBody: CreateTestRequest;
}

/** Parameters for update Test operation. */
export interface UpdateTestParams extends GetSingleTestParams {
  /** Test update request body. */
  updateTestBody: UpdateTestRequest;
}

/** Parameters for Run Test operation. */
export interface RunTestParams extends AuthorizationParam {
  /** Run test request body. */
  runTestBody: RunTestRequest;
}
