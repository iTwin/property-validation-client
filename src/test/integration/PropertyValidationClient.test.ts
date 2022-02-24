/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import * as chai from "chai";
import { take } from "../../base/iterators/IteratorUtilFunctions";
import { EntityListIterator } from "../../base/iterators/EntityListIterator";
import { PropertyValidationClient } from "../../PropertyValidationClient";
import { TestConfig } from "../TestConfig";
import { MinimalRule, MinimalRun, RequestToCreateRule, RequestToCreateTest, RequestToRunTest, RequestToUpdateRule, RequestToUpdateTest, ResponseFromGetResult, Rule, RuleDetails, RuleTemplate, Run, RunDetails, Test, TestDetails, TestItem } from "../../base";
import { ParamsToCreateRule, ParamsToCreateTest, ParamsToDeleteRule, ParamsToDeleteRun, ParamsToDeleteTest, ParamsToGetResult, ParamsToGetRule, ParamsToGetRuleList, ParamsToGetRun, ParamsToGetRunList, ParamsToGetTemplateList, ParamsToGetTest, ParamsToGetTestList, ParamsToRunTest, ParamsToUpdateRule, ParamsToUpdateTest } from "../../operations";

chai.should();
describe("PropertyValidationClient", () => {
  const propertyValidationClient: PropertyValidationClient = new PropertyValidationClient();

  it("should get a list of rule templates", async () => {
    const accessToken = await TestConfig.getAccessToken();

    const params: ParamsToGetTemplateList = {
      accessToken,
      urlParams: {
        projectId: TestConfig.projectId,
        $top: 5,
      },
    };
    const templatesIterator: EntityListIterator<RuleTemplate> = propertyValidationClient.templates.getList(params);
    const templates: RuleTemplate[] = await take(templatesIterator, 1);

    // At least one rule template
    chai.expect(templates).to.not.be.empty;

    // Save id of first template
    propertyValidationClient.templateId = templates[0].id;
  });

  it("should create a rule", async () => {
    const accessToken = await TestConfig.getAccessToken();

    const createRuleBody: RequestToCreateRule = {
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

    const params: ParamsToCreateRule = {
      accessToken,
      createRuleBody,
    };
    const rule: Rule = await propertyValidationClient.rules.create(params);

    // Expect rule to be found
    chai.expect(rule).to.not.be.undefined;

    // Save id of created rule
    propertyValidationClient.ruleId = rule.id;
  });

  it("should update a rule", async () => {
    const accessToken = await TestConfig.getAccessToken();

    const updateRuleBody: RequestToUpdateRule = {
      displayName: "TestRule1 - updated",
      description: "Test rule 1",
      severity: "high",
      ecSchema: "ArchitecturalPhysical",
      ecClass: "Door",
      whereClause: "Roll = '10'",
    };

    const params: ParamsToUpdateRule = {
      accessToken,
      ruleId: propertyValidationClient.ruleId,
      updateRuleBody,
    };
    const rule: Rule = await propertyValidationClient.rules.update(params);

    // Expect rule to be found
    chai.expect(rule).to.not.be.undefined;
  });

  it("should get a list of rules (minimal)", async () => {
    const accessToken = await TestConfig.getAccessToken();

    const params: ParamsToGetRuleList = {
      accessToken,
      urlParams: {
        projectId: TestConfig.projectId,
        $top: 5,
      },
    };
    const rulesIterator: EntityListIterator<MinimalRule> = propertyValidationClient.rules.getMinimalList(params);
    const rules: MinimalRule[] = await take(rulesIterator, 1);

    // At least one rule
    chai.expect(rules).to.not.be.empty;
  });

  it("should get a list of rules (representation", async () => {
    const accessToken = await TestConfig.getAccessToken();

    const params: ParamsToGetRuleList = {
      accessToken,
      urlParams: {
        projectId: TestConfig.projectId,
        $top: 5,
      },
    };
    const rulesIterator: EntityListIterator<RuleDetails> = propertyValidationClient.rules.getRepresentationList(params);
    const rules: RuleDetails[] = await take(rulesIterator, 1);

    // At least one rule
    chai.expect(rules).to.not.be.empty;
  });

  it("should get a rule by id", async () => {
    const accessToken = await TestConfig.getAccessToken();

    const params: ParamsToGetRule = {
      accessToken,
      ruleId: propertyValidationClient.ruleId,
    };
    const rule: RuleDetails = await propertyValidationClient.rules.getSingle(params);

    // Expect rule to be found
    chai.expect(rule).to.not.be.undefined;
  });

  it("should create a test", async () => {
    const accessToken = await TestConfig.getAccessToken();

    const rules: string[] = [propertyValidationClient.ruleId];
    const createTestBody: RequestToCreateTest = {
      projectId: TestConfig.projectId,
      displayName: "Test1",
      description: "Test 1",
      stopExecutionOnFailure: false,
      rules,
    };

    const params: ParamsToCreateTest = {
      accessToken,
      createTestBody,
    };
    const test: Test = await propertyValidationClient.tests.create(params);

    // Expect test to be created
    chai.expect(test).to.not.be.undefined;

    // Save id of created test
    propertyValidationClient.testId = test.id;
  });

  it("should update a test", async () => {
    const accessToken = await TestConfig.getAccessToken();

    const rules: string[] = [propertyValidationClient.ruleId];
    const updateTestBody: RequestToUpdateTest = {
      displayName: "Test1 - updated",
      description: "Test 1",
      stopExecutionOnFailure: false,
      rules,
    };

    const params: ParamsToUpdateTest = {
      accessToken,
      testId: propertyValidationClient.testId,
      updateTestBody,
    };
    const test: Test = await propertyValidationClient.tests.update(params);

    // Expect test to be updated
    chai.expect(test).to.not.be.undefined;
  });

  it("should get a test by id", async () => {
    const accessToken = await TestConfig.getAccessToken();

    const params: ParamsToGetTest = {
      accessToken,
      testId: propertyValidationClient.testId,
    };
    const test: TestDetails = await propertyValidationClient.tests.getSingle(params);

    // Expect test to be found
    chai.expect(test).to.not.be.undefined;
  });

  it("should get a list of tests", async () => {
    const accessToken = await TestConfig.getAccessToken();

    const params: ParamsToGetTestList = {
      accessToken,
      urlParams: {
        projectId: TestConfig.projectId,
        $top: 5,
      },
    };
    const testsIterator: EntityListIterator<TestItem> = propertyValidationClient.tests.getList(params);
    const tests: TestItem[] = await take(testsIterator, 1);

    // At least one test
    chai.expect(tests).to.not.be.empty;
  });

  it("should run a test", async () => {
    const accessToken = await TestConfig.getAccessToken();

    const runTestBody: RequestToRunTest = {
      testId: propertyValidationClient.testId,
      iModelId: TestConfig.iModelId,
      namedVersionId: TestConfig.namedVersionId,
    };

    const params: ParamsToRunTest = {
      accessToken,
      runTestBody,
    };
    const run: Run = await propertyValidationClient.tests.runTest(params);

    // Expect test to be run
    chai.expect(run).to.not.be.undefined;

    // Save id of test run
    propertyValidationClient.runId = run.id;
  });

  it("should get a list of runs (minimal)", async () => {
    const accessToken = await TestConfig.getAccessToken();

    const params: ParamsToGetRunList = {
      accessToken,
      urlParams: {
        projectId: TestConfig.projectId,
        $top: 5,
      },
    };
    const runs: MinimalRun[] = await propertyValidationClient.runs.getMinimalList(params);

    // At least one run
    chai.expect(runs).to.not.be.empty;
  });

  it("should get a list of runs (representation)", async () => {
    const accessToken = await TestConfig.getAccessToken();

    const params: ParamsToGetRunList = {
      accessToken,
      urlParams: {
        projectId: TestConfig.projectId,
        $top: 5,
      },
    };
    const runs: RunDetails[] = await propertyValidationClient.runs.getRepresentationList(params);

    // At least one run
    chai.expect(runs).to.not.be.empty;

    runs.forEach((run) => {
      // Save id of result for the first completed run
      if (run.status === "completed") {
        const tokens = run._links.result.href.split("/");
        propertyValidationClient.resultId = tokens[tokens.length-1];
        return;
      }
    });
  });

  it("should get a run by id", async () => {
    const accessToken = await TestConfig.getAccessToken();

    const params: ParamsToGetRun = {
      accessToken,
      runId: propertyValidationClient.runId,
    };
    const run: RunDetails = await propertyValidationClient.runs.getSingle(params);

    // Expect run to be found
    chai.expect(run).to.not.be.undefined;
  });

  it("should get a result by id", async () => {
    if (propertyValidationClient.resultId === "") {
      return;
    }
    const accessToken = await TestConfig.getAccessToken();

    const params: ParamsToGetResult = {
      accessToken,
      resultId: propertyValidationClient.resultId,
    };
    const response: ResponseFromGetResult = await propertyValidationClient.results.get(params);

    // Expect result to be found
    chai.expect(response).to.not.be.undefined;
  });

  it("should delete a rule by id", async () => {
    const accessToken = await TestConfig.getAccessToken();

    const params: ParamsToDeleteRule = {
      accessToken,
      ruleId: propertyValidationClient.ruleId,
    };
    await propertyValidationClient.rules.delete(params);
  });

  it("should delete a test by id", async () => {
    const accessToken = await TestConfig.getAccessToken();

    const params: ParamsToDeleteTest = {
      accessToken,
      testId: propertyValidationClient.testId,
    };
    await propertyValidationClient.tests.delete(params);
  });

  it("should delete a run by id", async () => {
    const accessToken = await TestConfig.getAccessToken();

    const params: ParamsToDeleteRun = {
      accessToken,
      runId: propertyValidationClient.runId,
    };
    await propertyValidationClient.runs.delete(params);
  });
});
