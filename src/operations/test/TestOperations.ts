/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { OperationsBase } from "../../base/OperationsBase";
import { CreateTestResponse, Run, RunTestResponse, Test, TestDetails, TestItem, TestResponse, TestsResponse, UpdateTestResponse } from "../../base/interfaces/apiEntities/TestInterfaces";
import { EntityListIterator } from "../../base/iterators/EntityListIterator";
import { EntityListIteratorImpl } from "../../base/iterators/EntityListIteratorImpl";
import { OperationOptions } from "../OperationOptions";
import { CreateTestParams, DeleteTestParams, GetSingleTestParams, GetTestListParams, RunTestParams, UpdateTestParams  } from "./TestOperationParams";

export class TestOperations<TOptions extends OperationOptions> extends OperationsBase<TOptions> {
  constructor(
    options: TOptions,
  ) {
    super(options);
  }

  /**
   * Gets Tests for a specific project. This method returns Tests in their summary representation. The returned
   * iterator internally queries entities in pages. Wraps the
   * {@link https://developer.bentley.com/apis/validation/operations/get-validation-propertyvalue-tests/ Get Tests}
   * operation from Property Validation API.
   * @param {GetTestListParams} params parameters for this operation. See {@link GetTestListParams}.
   * @returns {EntityListIterator<Test>} iterator for Test list. See {@link EntityListIterator},
   * {@link Test}.
   */
  public getList(params: GetTestListParams): EntityListIterator<TestItem> {
    const entityCollectionAccessor = (response: unknown) => {
      const tests = (response as TestsResponse).tests;
      return tests;
    };

    return new EntityListIteratorImpl(async () => this.getEntityCollectionPage<TestItem>({
      authorization: params.authorization,
      url: this._options.urlFormatter.getTestListUrl({ urlParams: params.urlParams }),
      entityCollectionAccessor,
    }));
  }

  /**
   * Gets a single Test identified by id. This method returns a Test in its full representation.
   * Wraps the {@link https://developer.bentley.com/apis/validation/operations/get-validation-propertyvalue-test/
   * Get Test} operation from Property Validation API.
   * @param {GetSingleTestParams} params parameters for this operation. See {@link GetSingleTestParams}.
   * @returns {Promise<Test>} a Test with specified id. See {@link Test}.
   */
  public async getSingle(params: GetSingleTestParams): Promise<TestDetails> {
    const test: TestDetails = await this.querySingleInternal(params);
    return test;
  }

  protected async querySingleInternal(params: GetSingleTestParams): Promise<TestDetails> {
    const { authorization, testId } = params;
    const response = await this.sendGetRequest<TestResponse>({
      authorization,
      url: this._options.urlFormatter.getSingleTestUrl({ testId }),
    });
    return response.test;
  }

  /**
   * Creates a Test. Wraps the {@link https://developer.bentley.com/apis/validation/operations/create-validation-propertyvalue-test/
   * Create Test} operation from Property Validation API.
   * @param {CreateTestParams} params parameters for this operation. See {@link CreateTestParams}.
   * @returns newly created Test. See {@link Test}.
   */
  public async create(params: CreateTestParams): Promise<Test> {
    const createTestResponse = await this.sendPostRequest<CreateTestResponse>({
      authorization: params.authorization,
      url: this._options.urlFormatter.createTestUrl(),
      body: params.createTestBody,
    });

    return createTestResponse.test;
  }

  /**
   * Updates a Test. Wraps the {@link https://developer.bentley.com/apis/validation/operations/update-validation-propertyvalue-test/
   * Update Test} operation from Property Validation API.
   * @param {UpdateTestParams} params parameters for this operation. See {@link UpdateTestParams}.
   * @returns newly updated Test. See {@link Test}.
   */
  public async update(params: UpdateTestParams): Promise<Test> {
    const updateTestResponse = await this.sendPutRequest<UpdateTestResponse>({
      authorization: params.authorization,
      url: this._options.urlFormatter.updateTestUrl(params),
      body: params.updateTestBody,
    });

    return updateTestResponse.test;
  }

  /**
   * Runs a test. Wraps the {@link https://developer.bentley.com/apis/validation/operations/run-validation-propertyvalue-test/
   * Run test} operation from Property Validation API.
   * @param {RunTestParams} params parameters for this operation. See {@link RunTestParams}.
   * @returns newly started Run. See {@link Run}.
   */
  public async runTest(params: RunTestParams): Promise<Run> {
    const runTestResponse = await this.sendPostRequest<RunTestResponse>({
      authorization: params.authorization,
      url: this._options.urlFormatter.runTestUrl(),
      body: params.runTestBody,
    });

    return runTestResponse.run;
  }

  /**
   * Deletes a single Test identified by id.
   * Wraps the {@link https://developer.bentley.com/apis/validation/operations/delete-validation-propertyvalue-test/
   * Get Rule} operation from Property Validation API.
   * @param {SingleRuleParams} params parameters for this operation. See {@link SingleRuleParams}.
   * @returns {Promise<void>}. See {@link Rule}.
   */
  public async delete(params: DeleteTestParams): Promise<void> {
    await this.deleteInternal(params);
  }

  protected async deleteInternal(params: DeleteTestParams): Promise<void> {
    const { authorization, testId } = params;
    await this.sendDeleteRequest<void>({
      authorization,
      url: this._options.urlFormatter.deleteTestUrl({ testId }),
    });
  }
}
