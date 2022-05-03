/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import * as chai from "chai";
import type { AccessToken } from "@itwin/core-bentley";
import { take } from "../../base/iterators/IteratorUtilFunctions";
import { EntityListIterator } from "../../base/iterators/EntityListIterator";
import { PropertyValidationClient, PropertyValidationClientOptions } from "../../PropertyValidationClient";
import { TestConfig } from "../TestConfig";
import { MinimalRule, MinimalRun, ResponseFromGetResult, Rule, RuleDetails, RuleTemplate, Run, RunDetails, Test, TestDetails, TestItem } from "../../base";
import { ParamsToCreateRule, ParamsToCreateTest, ParamsToDeleteRule, ParamsToDeleteRun, ParamsToDeleteTest, ParamsToGetResult, ParamsToGetRule, ParamsToGetRuleList, ParamsToGetRun, ParamsToGetRunList, ParamsToGetTemplateList, ParamsToGetTest, ParamsToGetTestList, ParamsToRunTest, ParamsToUpdateRule, ParamsToUpdateTest } from "../../operations";

chai.should();
describe("PropertyValidationClient", async () => {
  const options: PropertyValidationClientOptions = {};
  const accessTokenCallback = TestConfig.getAccessTokenCallback();
  const propertyValidationClient: PropertyValidationClient = new PropertyValidationClient(options, accessTokenCallback);

  let accessToken: AccessToken;
  let projectId: string;
  let iModelId: string;

  before(async () => {
    accessToken = await TestConfig.getAccessToken();
    projectId = (await TestConfig.getProjectByName(accessToken, TestConfig.projectName)).id;
    chai.assert.isDefined(projectId);
    iModelId = (await TestConfig.getIModelByName(accessToken, projectId, TestConfig.iModelName)).id;
    chai.assert.isDefined(iModelId);
  });

  it("should get a list of rule templates", async () => {
    const params: ParamsToGetTemplateList = {
      urlParams: {
        projectId,
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
    const params: ParamsToCreateRule = {
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
    const rule: Rule = await propertyValidationClient.rules.create(params);

    // Expect rule to be found
    chai.expect(rule).to.not.be.undefined;

    // Save id of created rule
    propertyValidationClient.ruleId = rule.id;
  });

  it("should update a rule", async () => {
    const params: ParamsToUpdateRule = {
      ruleId: propertyValidationClient.ruleId,
      displayName: "TestRule1 - updated",
      description: "Test rule 1",
      severity: "high",
      ecSchema: "ArchitecturalPhysical",
      ecClass: "Door",
      whereClause: "Roll = '10'",
    };
    const rule: Rule = await propertyValidationClient.rules.update(params);

    // Expect rule to be found
    chai.expect(rule).to.not.be.undefined;
  });

  it("should get a list of rules (minimal)", async () => {
    const params: ParamsToGetRuleList = {
      urlParams: {
        projectId,
        $top: 5,
      },
    };
    const rulesIterator: EntityListIterator<MinimalRule> = propertyValidationClient.rules.getMinimalList(params);
    const rules: MinimalRule[] = await take(rulesIterator, 1);

    // At least one rule
    chai.expect(rules).to.not.be.empty;
  });

  it("should get a list of rules (representation", async () => {
    const params: ParamsToGetRuleList = {
      urlParams: {
        projectId,
        $top: 5,
      },
    };
    const rulesIterator: EntityListIterator<RuleDetails> = propertyValidationClient.rules.getRepresentationList(params);
    const rules: RuleDetails[] = await take(rulesIterator, 1);

    // At least one rule
    chai.expect(rules).to.not.be.empty;
  });

  it("should get a rule by id", async () => {
    const params: ParamsToGetRule = {
      ruleId: propertyValidationClient.ruleId,
    };
    const rule: RuleDetails = await propertyValidationClient.rules.getSingle(params);

    // Expect rule to be found
    chai.expect(rule).to.not.be.undefined;
  });

  it("should create a test", async () => {
    const rules: string[] = [propertyValidationClient.ruleId];
    const params: ParamsToCreateTest = {
      projectId,
      displayName: "Test1",
      description: "Test 1",
      stopExecutionOnFailure: false,
      rules,
    };
    const test: Test = await propertyValidationClient.tests.create(params);

    // Expect test to be created
    chai.expect(test).to.not.be.undefined;

    // Save id of created test
    propertyValidationClient.testId = test.id;
  });

  it("should update a test", async () => {
    const rules: string[] = [propertyValidationClient.ruleId];
    const params: ParamsToUpdateTest = {
      testId: propertyValidationClient.testId,
      displayName: "Test1 - updated",
      description: "Test 1",
      stopExecutionOnFailure: false,
      rules,
    };
    const test: Test = await propertyValidationClient.tests.update(params);

    // Expect test to be updated
    chai.expect(test).to.not.be.undefined;
  });

  it("should get a test by id", async () => {
    const params: ParamsToGetTest = {
      testId: propertyValidationClient.testId,
    };
    const test: TestDetails = await propertyValidationClient.tests.getSingle(params);

    // Expect test to be found
    chai.expect(test).to.not.be.undefined;
  });

  it("should get a list of tests", async () => {
    const params: ParamsToGetTestList = {
      urlParams: {
        projectId,
        $top: 5,
      },
    };
    const testsIterator: EntityListIterator<TestItem> = propertyValidationClient.tests.getList(params);
    const tests: TestItem[] = await take(testsIterator, 1);

    // At least one test
    chai.expect(tests).to.not.be.empty;
  });

  it("should run a test with no named version id", async () => {
    const params: ParamsToRunTest = {
      testId: propertyValidationClient.testId,
      iModelId,
    };
    const run: Run | undefined = await propertyValidationClient.tests.runTest(params);

    // Expect test to be run
    chai.expect(run).to.not.be.undefined;

    // Save id of test run
    propertyValidationClient.runId = run!.id;
  });

  it("should get a list of runs (minimal)", async () => {
    const params: ParamsToGetRunList = {
      urlParams: {
        projectId,
        $top: 5,
      },
    };
    const runs: MinimalRun[] = await propertyValidationClient.runs.getMinimalList(params);

    // At least one run
    chai.expect(runs).to.not.be.empty;
  });

  it("should get a list of runs (representation)", async () => {
    const params: ParamsToGetRunList = {
      urlParams: {
        projectId,
        $top: 5,
      },
    };
    const runs: RunDetails[] = await propertyValidationClient.runs.getRepresentationList(params);

    // At least one run
    chai.expect(runs).to.not.be.empty;

    runs.forEach((run) => {
      // Save id of result for the first completed run
      if (run.status === "completed") {
        propertyValidationClient.resultId = run.resultId;
        return;
      }
    });
  });

  it("should get a run by id", async () => {
    const params: ParamsToGetRun = {
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
    const params: ParamsToGetResult = {
      resultId: propertyValidationClient.resultId,
    };
    const response: ResponseFromGetResult = await propertyValidationClient.results.get(params);

    // Expect result to be found
    chai.expect(response).to.not.be.undefined;
  });

  it("should delete a rule by id", async () => {
    const params: ParamsToDeleteRule = {
      ruleId: propertyValidationClient.ruleId,
    };
    await propertyValidationClient.rules.delete(params);
  });

  it("should delete a test by id", async () => {
    const params: ParamsToDeleteTest = {
      testId: propertyValidationClient.testId,
    };
    await propertyValidationClient.tests.delete(params);
  });

  it("should delete a run by id", async () => {
    const params: ParamsToDeleteRun = {
      runId: propertyValidationClient.runId,
    };
    await propertyValidationClient.runs.delete(params);
  });
});
