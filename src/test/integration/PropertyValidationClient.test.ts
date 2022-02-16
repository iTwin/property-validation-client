/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import * as chai from "chai";
import { take } from "../../base/iterators/IteratorUtilFunctions";
import { EntityListIterator } from "../../base/iterators/EntityListIterator";
import { PropertyValidationClient } from "../../PropertyValidationClient";
import { TestConfig } from "../TestConfig";
import { CreateRuleRequest, CreateTestRequest, GetMinimalRunsResponse, GetResultResponse, GetRunsResponse, MinimalRule, Rule, RuleDetails, RuleTemplate, Run, RunDetails, RunTestRequest, Test, TestDetails, TestItem, UpdateRuleRequest, UpdateTestRequest } from "../../base";
import { CreateRuleParams, CreateTestParams, DeleteRuleParams, DeleteRunParams, DeleteTestParams, GetResultParams, GetRuleListParams, GetRunListParams, GetSingleRuleParams, GetSingleRunParams, GetSingleTestParams, GetTemplateListParams, GetTestListParams, RunTestParams, UpdateRuleParams, UpdateTestParams } from "../../operations";

chai.should();
describe("PropertyValidationClient", () => {
  const propertyValidationClient: PropertyValidationClient = new PropertyValidationClient();

  it("should get a list of rule templates", async () => {
    const authorization = async () => {
      const accessToken = await TestConfig.getAccessToken();
      return { scheme: "Bearer", token: accessToken.split(" ")[1] };
    };

    const getRuleTemplateListParams: GetTemplateListParams = {
      authorization,
      urlParams: {
        projectId: TestConfig.projectId,
        $top: 5,
      },
    };
    const templatesIterator: EntityListIterator<RuleTemplate> = propertyValidationClient.templates.getList(getRuleTemplateListParams);
    const templates: RuleTemplate[] = await take(templatesIterator, 1);

    // At least one rule template
    chai.expect(templates).to.not.be.empty;

    // Save id of first template
    propertyValidationClient.templateId = templates[0].id;
  });

  it("should create a rule", async () => {
    const authorization = async () => {
      const accessToken = await TestConfig.getAccessToken();
      return { scheme: "Bearer", token: accessToken.split(" ")[1] };
    };

    const createRuleBody: CreateRuleRequest = {
      templateId: propertyValidationClient.templateId,
      displayName: "TestRule1",
      description: "Test rule 1",
      severity: "medium",
      ecSchema: "ArchitecturalPhysical",
      ecClass: "Door",
      whereClause: "Roll = '10'",
      dataType: "property",
      functionParameters: {
        propertyName: "Pitch",
        upperBound: "2",
      },
    };

    const createRuleParams: CreateRuleParams = {
      authorization,
      createRuleBody,
    };
    const rule: Rule = await propertyValidationClient.rules.create(createRuleParams);

    // Expect rule to be found
    chai.expect(rule).to.not.be.undefined;

    // Save id of created rule
    propertyValidationClient.ruleId = rule.id;
  });

  it("should update a rule", async () => {
    const authorization = async () => {
      const accessToken = await TestConfig.getAccessToken();
      return { scheme: "Bearer", token: accessToken.split(" ")[1] };
    };

    const updateRuleBody: UpdateRuleRequest = {
      displayName: "TestRule1 - updated",
      description: "Test rule 1",
      severity: "high",
      ecSchema: "ArchitecturalPhysical",
      ecClass: "Door",
      whereClause: "Roll = '10'",
    };

    const updateRuleParams: UpdateRuleParams = {
      authorization,
      ruleId: propertyValidationClient.ruleId,
      updateRuleBody,
    };
    const rule: Rule = await propertyValidationClient.rules.update(updateRuleParams);

    // Expect rule to be found
    chai.expect(rule).to.not.be.undefined;
  });

  it("should get a list of rules (minimal)", async () => {
    const authorization = async () => {
      const accessToken = await TestConfig.getAccessToken();
      return { scheme: "Bearer", token: accessToken.split(" ")[1] };
    };

    const getRuleListParams: GetRuleListParams = {
      authorization,
      urlParams: {
        projectId: TestConfig.projectId,
        $top: 5,
      },
    };
    const rulesIterator: EntityListIterator<MinimalRule> = propertyValidationClient.rules.getMinimalList(getRuleListParams);
    const rules: MinimalRule[] = await take(rulesIterator, 1);

    // At least one rule
    chai.expect(rules).to.not.be.empty;
  });

  it("should get a list of rules (representation", async () => {
    const authorization = async () => {
      const accessToken = await TestConfig.getAccessToken();
      return { scheme: "Bearer", token: accessToken.split(" ")[1] };
    };

    const getRuleListParams: GetRuleListParams = {
      authorization,
      urlParams: {
        projectId: TestConfig.projectId,
        $top: 5,
      },
    };
    const rulesIterator: EntityListIterator<RuleDetails> = propertyValidationClient.rules.getRepresentationList(getRuleListParams);
    const rules: RuleDetails[] = await take(rulesIterator, 1);

    // At least one rule
    chai.expect(rules).to.not.be.empty;
  });

  it("should get a rule by id", async () => {
    const authorization = async () => {
      const accessToken = await TestConfig.getAccessToken();
      return { scheme: "Bearer", token: accessToken.split(" ")[1] };
    };

    const getRuleParams: GetSingleRuleParams = {
      authorization,
      ruleId: propertyValidationClient.ruleId,
    };
    const rule: RuleDetails = await propertyValidationClient.rules.getSingle(getRuleParams);

    // Expect rule to be found
    chai.expect(rule).to.not.be.undefined;
  });

  it("should create a test", async () => {
    const authorization = async () => {
      const accessToken = await TestConfig.getAccessToken();
      return { scheme: "Bearer", token: accessToken.split(" ")[1] };
    };

    const rules: string[] = [propertyValidationClient.ruleId];
    const createTestBody: CreateTestRequest = {
      projectId: TestConfig.projectId,
      displayName: "Test1",
      description: "Test 1",
      stopExecutionOnFailure: false,
      rules,
    };

    const createTestParams: CreateTestParams = {
      authorization,
      createTestBody,
    };
    const test: Test = await propertyValidationClient.tests.create(createTestParams);

    // Expect test to be created
    chai.expect(test).to.not.be.undefined;

    // Save id of created test
    propertyValidationClient.testId = test.id;
  });

  it("should update a test", async () => {
    const authorization = async () => {
      const accessToken = await TestConfig.getAccessToken();
      return { scheme: "Bearer", token: accessToken.split(" ")[1] };
    };

    const rules: string[] = [propertyValidationClient.ruleId];
    const updateTestBody: UpdateTestRequest = {
      displayName: "Test1 - updated",
      description: "Test 1",
      stopExecutionOnFailure: false,
      rules,
    };

    const updateTestParams: UpdateTestParams = {
      authorization,
      testId: propertyValidationClient.testId,
      updateTestBody,
    };
    const test: Test = await propertyValidationClient.tests.update(updateTestParams);

    // Expect test to be updated
    chai.expect(test).to.not.be.undefined;
  });

  it("should get a test by id", async () => {
    const authorization = async () => {
      const accessToken = await TestConfig.getAccessToken();
      return { scheme: "Bearer", token: accessToken.split(" ")[1] };
    };

    const getTestParams: GetSingleTestParams = {
      authorization,
      testId: propertyValidationClient.testId,
    };
    const test: TestDetails = await propertyValidationClient.tests.getSingle(getTestParams);

    // Expect test to be found
    chai.expect(test).to.not.be.undefined;
  });

  it("should get a list of tests", async () => {
    const authorization = async () => {
      const accessToken = await TestConfig.getAccessToken();
      return { scheme: "Bearer", token: accessToken.split(" ")[1] };
    };

    const getTestListParams: GetTestListParams = {
      authorization,
      urlParams: {
        projectId: TestConfig.projectId,
        $top: 5,
      },
    };
    const testsIterator: EntityListIterator<TestItem> = propertyValidationClient.tests.getList(getTestListParams);
    const tests: TestItem[] = await take(testsIterator, 1);

    // At least one test
    chai.expect(tests).to.not.be.empty;
  });

  it("should run a test", async () => {
    const authorization = async () => {
      const accessToken = await TestConfig.getAccessToken();
      return { scheme: "Bearer", token: accessToken.split(" ")[1] };
    };

    const runTestBody: RunTestRequest = {
      testId: propertyValidationClient.testId,
      iModelId: TestConfig.iModelId,
      namedVersionId: TestConfig.namedVersionId,
    };

    const runTestParams: RunTestParams = {
      authorization,
      runTestBody,
    };
    const run: Run = await propertyValidationClient.tests.runTest(runTestParams);

    // Expect test to be run
    chai.expect(run).to.not.be.undefined;

    // Save id of test run
    propertyValidationClient.runId = run.id;
  });

  it("should get a list of runs (minimal)", async () => {
    const authorization = async () => {
      const accessToken = await TestConfig.getAccessToken();
      return { scheme: "Bearer", token: accessToken.split(" ")[1] };
    };

    const getRunListParams: GetRunListParams = {
      authorization,
      urlParams: {
        projectId: TestConfig.projectId,
        $top: 5,
      },
    };
    const runs: GetMinimalRunsResponse = await propertyValidationClient.runs.getMinimalList(getRunListParams);

    // At least one run
    chai.expect(runs).to.not.be.empty;
  });

  it("should get a list of runs (representation)", async () => {
    const authorization = async () => {
      const accessToken = await TestConfig.getAccessToken();
      return { scheme: "Bearer", token: accessToken.split(" ")[1] };
    };

    const getRunListParams: GetRunListParams = {
      authorization,
      urlParams: {
        projectId: TestConfig.projectId,
        $top: 5,
      },
    };
    const getRunsResponse: GetRunsResponse = await propertyValidationClient.runs.getRepresentationList(getRunListParams);

    // At least one run
    chai.expect(getRunsResponse.runs).to.not.be.empty;

    getRunsResponse.runs.forEach((run) => {
      // Save id of result for the first completed run
      if (run.status === "completed") {
        const tokens = run._links.result.href.split("/");
        propertyValidationClient.resultId = tokens[tokens.length-1];
        return;
      }
    });
  });

  it("should get a run by id", async () => {
    const authorization = async () => {
      const accessToken = await TestConfig.getAccessToken();
      return { scheme: "Bearer", token: accessToken.split(" ")[1] };
    };

    const getRunParams: GetSingleRunParams = {
      authorization,
      runId: propertyValidationClient.runId,
    };
    const run: RunDetails = await propertyValidationClient.runs.getSingle(getRunParams);

    // Expect run to be found
    chai.expect(run).to.not.be.undefined;
  });

  it("should get a result by id", async () => {
    if (propertyValidationClient.resultId === "") {
      return;
    }
    const authorization = async () => {
      const accessToken = await TestConfig.getAccessToken();
      return { scheme: "Bearer", token: accessToken.split(" ")[1] };
    };

    const getResultParams: GetResultParams = {
      authorization,
      resultId: propertyValidationClient.resultId,
    };
    const resultResponse: GetResultResponse = await propertyValidationClient.results.get(getResultParams);

    // Expect result to be found
    chai.expect(resultResponse).to.not.be.undefined;
  });

  it("should delete a rule by id", async () => {
    const authorization = async () => {
      const accessToken = await TestConfig.getAccessToken();
      return { scheme: "Bearer", token: accessToken.split(" ")[1] };
    };

    const deleteRuleParams: DeleteRuleParams = {
      authorization,
      ruleId: propertyValidationClient.ruleId,
    };
    await propertyValidationClient.rules.delete(deleteRuleParams);
  });

  it("should delete a test by id", async () => {
    const authorization = async () => {
      const accessToken = await TestConfig.getAccessToken();
      return { scheme: "Bearer", token: accessToken.split(" ")[1] };
    };

    const deleteTestParams: DeleteTestParams = {
      authorization,
      testId: propertyValidationClient.testId,
    };
    await propertyValidationClient.tests.delete(deleteTestParams);
  });

  it("should delete a run by id", async () => {
    const authorization = async () => {
      const accessToken = await TestConfig.getAccessToken();
      return { scheme: "Bearer", token: accessToken.split(" ")[1] };
    };

    const deleteRunParams: DeleteRunParams = {
      authorization,
      runId: propertyValidationClient.runId,
    };
    await propertyValidationClient.runs.delete(deleteRunParams);
  });
});
