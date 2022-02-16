/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { CollectionResponse, Link } from "../CommonInterfaces";

/** Links that belong to Test entity returned from Property Validation API. */
export interface TestDetailLinks {
  /** Link to get user info of creator. */
  createdBy: Link;
  /** Link to get user info of last modifier. */
  lastModifiedBy: Link;
  /** Link to get Test details. */
  test: Link;
}

export interface TestLinks {
  /** Link to get user info of creator. */
  createdBy: Link;
  /** Link to get user info of last modifier. */
  lastModifiedBy: Link;
}

/** Test item. */
export interface TestItem {
  /** Test id. */
  id: string;
  /** Test display name. */
  displayName: string;
  /** Test description. */
  description: string;
  /** Test creation date. */
  creationDateTime: string;
  /** Test modification date. */
  modificationDateTime: string;
  /** Test links. */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  _links: TestLinks;
}

/** Test details. */
export interface TestDetails {
  /** Test display name. */
  displayName: string;
  /** Test description. */
  description: string;
  /** Test creation date. */
  creationDateTime: string;
  /** Test modification date. */
  modificationDateTime: string;
  /** Test rule ids. */
  rules: string[];
  /** Stop execution on failure flag. */
  stopExecutionOnFailure: boolean;
  /** Test links. */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  _links: TestLinks;
}

/** Single Test API response. */
export interface TestResponse {
  test: TestDetails;
}

/** Test list API response. */
export interface TestsResponse extends CollectionResponse {
  tests: TestItem[];
}

/** Create Test API request. */
export interface CreateTestRequest {
  /** Project id. */
  projectId: string;
  /** Test display name. */
  displayName: string;
  /** Test description. */
  description: string;
  /** Stop execution on failure flag. */
  stopExecutionOnFailure: boolean;
  /** Array of rule ids to associate with test. */
  rules: string[];
}

/** Update Test API request. */
export interface UpdateTestRequest {
  /** Test display name. */
  displayName: string;
  /** Test description. */
  description: string;
  /** Stop execution on failure flag. */
  stopExecutionOnFailure: boolean;
  /** Array of rule ids to associate with test. */
  rules: string[];
}

export interface TestSelfLink {
  /** Link to get created test. */
  self: Link;
}

/** Test details. */
export interface Test {
  /** Test id. */
  id: string;
  /** Test display name. */
  displayName: string;
  /** Test description. */
  description: string;
  /** Test rule ids. */
  rules: string[];
  /** Stop execution on failure flag. */
  stopExecutionOnFailure: boolean;
  /** Test links. */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  _links: TestSelfLink;
}

/** Create Test API Response. */
export interface CreateTestResponse {
  test: Test;
}

/** Create Test API Response. */
export type UpdateTestResponse = CreateTestResponse;

/** Run test API request. */
export interface RunTestRequest {
  /** Test id. */
  testId: string;
  /** iModel id. */
  iModelId: string;
  /** Named version id. */
  namedVersionId: string;
}

export interface RunLink {
  /** Link to get Run. */
  run: Link;
}

/** Minimal representation of a Run. */
export interface Run {
  /** Run id. */
  id: string;
  /** Run link. */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  _links: RunLink;
}

/** Run test API Response. */
export interface RunTestResponse {
  run: Run;
}
