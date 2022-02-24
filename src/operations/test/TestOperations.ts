/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { OperationsBase } from "../../base/OperationsBase";
import { ResponseFromCreateTest, ResponseFromGetTest, ResponseFromGetTestList, ResponseFromRunTest, ResponseFromUpdateTest, Run, Test, TestDetails, TestItem } from "../../base/interfaces/apiEntities/TestInterfaces";
import { EntityListIterator } from "../../base/iterators/EntityListIterator";
import { EntityListIteratorImpl } from "../../base/iterators/EntityListIteratorImpl";
import { OperationOptions } from "../OperationOptions";
import { ParamsToCreateTest, ParamsToDeleteTest, ParamsToGetTest, ParamsToGetTestList, ParamsToRunTest, ParamsToUpdateTest  } from "./TestOperationParams";

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
   * @param {ParamsToGetTestList} params parameters for this operation. See {@link ParamsToGetTestList}.
   * @returns {EntityListIterator<TestItem>} iterator for Test list. See {@link EntityListIterator},
   * {@link TestItem}.
   */
  public getList(params: ParamsToGetTestList): EntityListIterator<TestItem> {
    const entityCollectionAccessor = (response: unknown) => {
      const tests = (response as ResponseFromGetTestList).tests;
      return tests;
    };

    return new EntityListIteratorImpl(async () => this.getEntityCollectionPage<TestItem>({
      accessToken: params.accessToken,
      url: this._options.urlFormatter.getTestListUrl({ urlParams: params.urlParams }),
      entityCollectionAccessor,
    }));
  }

  /**
   * Gets a single Test identified by id. This method returns a Test in its full representation.
   * Wraps the {@link https://developer.bentley.com/apis/validation/operations/get-validation-propertyvalue-test/
   * Get Test} operation from Property Validation API.
   * @param {ParamsToGetTest} params parameters for this operation. See {@link ParamsToGetTest}.
   * @returns {Promise<TestDetails>} a Test with specified id. See {@link TestDetails}.
   */
  public async getSingle(params: ParamsToGetTest): Promise<TestDetails> {
    const { accessToken, testId } = params;
    const response = await this.sendGetRequest<ResponseFromGetTest>({
      accessToken,
      url: this._options.urlFormatter.getSingleTestUrl({ testId }),
    });
    return response.test;
  }

  /**
   * Creates a Test. Wraps the {@link https://developer.bentley.com/apis/validation/operations/create-validation-propertyvalue-test/
   * Create Test} operation from Property Validation API.
   * @param {ParamsToCreateTest} params parameters for this operation. See {@link ParamsToCreateTest}.
   * @returns {Promise<Test>} newly created Test. See {@link Test}.
   */
  public async create(params: ParamsToCreateTest): Promise<Test> {
    const response = await this.sendPostRequest<ResponseFromCreateTest>({
      accessToken: params.accessToken,
      url: this._options.urlFormatter.createTestUrl(),
      body: params.createTestBody,
    });

    return response.test;
  }

  /**
   * Updates a Test. Wraps the {@link https://developer.bentley.com/apis/validation/operations/update-validation-propertyvalue-test/
   * Update Test} operation from Property Validation API.
   * @param {ParamsToUpdateTest} params parameters for this operation. See {@link ParamsToUpdateTest}.
   * @returns {Promise<Test>} newly updated Test. See {@link Test}.
   */
  public async update(params: ParamsToUpdateTest): Promise<Test> {
    const response = await this.sendPutRequest<ResponseFromUpdateTest>({
      accessToken: params.accessToken,
      url: this._options.urlFormatter.updateTestUrl(params),
      body: params.updateTestBody,
    });

    return response.test;
  }

  /**
   * Runs a test. Wraps the {@link https://developer.bentley.com/apis/validation/operations/run-validation-propertyvalue-test/
   * Run test} operation from Property Validation API.
   * @param {ParamsToRunTest} params parameters for this operation. See {@link ParamsToRunTest}.
   * @returns {Promise<Run>} newly started Run. See {@link Run}.
   */
  public async runTest(params: ParamsToRunTest): Promise<Run> {
    const response = await this.sendPostRequest<ResponseFromRunTest>({
      accessToken: params.accessToken,
      url: this._options.urlFormatter.runTestUrl(),
      body: params.runTestBody,
    });

    return response.run;
  }

  /**
   * Deletes a single Test identified by id.
   * Wraps the {@link https://developer.bentley.com/apis/validation/operations/delete-validation-propertyvalue-test/
   * Get Rule} operation from Property Validation API.
   * @param {ParamsToDeleteTest} params parameters for this operation. See {@link ParamsToDeleteTest}.
   * @returns {Promise<void>}.
   */
  public async delete(params: ParamsToDeleteTest): Promise<void> {
    const { accessToken, testId } = params;
    await this.sendDeleteRequest<void>({
      accessToken,
      url: this._options.urlFormatter.deleteTestUrl({ testId }),
    });
  }
}
