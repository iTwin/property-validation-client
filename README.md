# @iTwin/property-validation-client

Copyright © Bentley Systems, Incorporated. All rights reserved. See [LICENSE.md](./LICENSE.md) for license terms and full copyright notice.

[iTwin.js](http://www.itwinjs.org) is an open source platform for creating, querying, modifying, and displaying Infrastructure Digital Twins. To learn more about the iTwin Platform and its APIs, visit the [iTwin developer portal](https://developer.bentley.com/).

If you have questions, or wish to contribute to iTwin.js, see our [Contributing guide](./CONTRIBUTING.md).

## Description

Contains the __@itwin/property-validation-client__ package that wraps sending requests to the validation service. Visit the [Property Validation API](https://developer.bentley.com/apis/validation/) for more documentation on the validation service.

## Usage examples

### Get all property validation rule templates
```typescript
import { Authorization, EntityListIterator, GetTemplateListParams, PropertyValidationClient, RuleTemplate } from "@itwin/property-validation-client";

/** Function that queries all rule templates for a particular project and prints their ids to the console. */
async function printRuleTemplateIds(projectId: string): Promise<void> {
  const propertyValidationClient: PropertyValidationClient = new PropertyValidationClient();
  const getRuleTemplateListParams: GetTemplateListParams = {
    authorization,
    urlParams: {
      projectId
    }
  };

  for await (const template of templatesIterator)
    console.log(template.id);
}

/** Function that returns valid authorization information. */
async function getAuthorization(): Promise<Authorization> {
  return { scheme: "Bearer", token: "ey..." };
}
```

### Create property validation rule
```typescript
import { Authorization, CreateRuleParams, CreateRuleRequest, PropertyValidationClient, Rule } from "@itwin/property-validation-client";

/** Function that creates a new property validation rule and prints its id to the console. */
async function createPropertyValidationRule(templateId: string): Promise<void> {
  const propertyValidationClient: PropertyValidationClient = new PropertyValidationClient();
  const createRuleBody: CreateRuleRequest = {
    templateId: templateId,
    displayName: "TestRule1",
    description: "Test rule 1",
    severity: "medium",
    ecSchema: "ArchitecturalPhysical",
    ecClass: "Door",
    whereClause: "Roll = '10'",
    dataType: "property",
    functionParameters: {
      propertyName: "Pitch",
      upperBound: "2"
    }
  };
  const createRuleParams: CreateRuleParams = {
    authorization: () => getAuthorization(),
    createRuleBody
  };
  const rule: Rule = await propertyValidationClient.rules.create(createRuleParams);

  console.log(rule.id);
}
```

### Update property validation rule
```typescript
import { Authorization, UpdateRuleParams, UpdateRuleRequest, PropertyValidationClient, Rule } from "@itwin/property-validation-client";

/** Function that updates a new property validation rule and prints its id to the console. */
async function updatePropertyValidationRule(ruleId: string): Promise<void> {
  const propertyValidationClient: PropertyValidationClient = new PropertyValidationClient();
  const updateRuleBody: UpdateRuleRequest = {
    displayName: "TestRule1 - updated",
    description: "Test rule 1",
    severity: "high",
    ecSchema: "ArchitecturalPhysical",
    ecClass: "Door",
    whereClause: "Roll = '10'"
  };
  const updateRuleParams: UpdateRuleParams = {
    authorization: () => getAuthorization(),
    ruleId: ruleId,
    updateRuleBody
  };
  const rule: Rule = await propertyValidationClient.rules.update(updateRuleParams);

  console.log(rule.id);
}
```

### Get all property validation rules
```typescript
import { Authorization, EntityListIterator, GetRuleListParams, PropertyValidationClient } from "@itwin/property-validation-client";

/** Function that queries all rules for a particular project and prints their ids to the console. */
async function printRuleIds(projectId: string): Promise<void> {
  const propertyValidationClient: PropertyValidationClient = new PropertyValidationClient();
  const getRuleListParams: GetRuleListParams = {
    authorization,
    urlParams: {
      projectId
    }
  };
  const rulesIterator: EntityListIterator<RuleDetails> = propertyValidationClient.rules.getRepresentationList(getRuleListParams);
  for await (const rule of rulesIterator)
    console.log(rule.id);
}
```

### Get property validation rule
```typescript
import { Authorization, GetSingleRuleParams, PropertyValidationClient, RuleDetails } from "@itwin/property-validation-client";

/** Function that gets a property validation rule and prints its name. */
async function getPropertyValidationRule(ruleId: string): Promise<void> {
  const propertyValidationClient: PropertyValidationClient = new PropertyValidationClient();
  const getRuleParams: GetSingleRuleParams = {
    authorization: () => getAuthorization(),
    ruleId
  };

  const rule: RuleDetails = await propertyValidationClient.rules.getSingle(getRuleParams);

  console.log(rule.displayName);
}
```

### Delete property validation rule
```typescript
import { Authorization, DeleteRuleParams, PropertyValidationClient } from "@itwin/property-validation-client";

/** Function that deletes a property validation rule. */
async function deletePropertyValidationRule(ruleId: string): Promise<void> {
  const propertyValidationClient: PropertyValidationClient = new PropertyValidationClient();
  const deleteRuleParams: DeleteRuleParams = {
    authorization: () => getAuthorization(),
    ruleId
  };
  await propertyValidationClient.rules.delete(deleteRuleParams);
}
```

### Create property validation test
```typescript
import { Authorization, CreateTestParams, CreateTestRequest, PropertyValidationClient, Test } from "@itwin/property-validation-client";

/** Function that creates a new property validation test and prints its id to the console. */
async function createPropertyValidationTest(projectId: string, rules: string[]): Promise<void> {
  const propertyValidationClient: PropertyValidationClient = new PropertyValidationClient();
  const createTestBody: CreateTestRequest = {
    projectId,
    displayName: "Test1",
    description: "Test 1",
    stopExecutionOnFailure: false,
    rules,
  };
  const createTestParams: CreateTestParams = {
    authorization: () => getAuthorization(),
    createTestBody
  };
  const test: Test = await propertyValidationClient.tests.create(createTestParams);

  console.log(test.id);
}
```

### Update property validation test
```typescript
import { Authorization, UpdateTestParams, UpdateTestRequest, PropertyValidationClient, Test } from "@itwin/property-validation-client";

/** Function that updates a new property validation test and prints its id to the console. */
async function updatePropertyValidationTest(testId: string, rules: string[]): Promise<void> {
  const propertyValidationClient: PropertyValidationClient = new PropertyValidationClient();
  const updateTestBody: UpdateTestRequest = {
    displayName: "Test1 - updated",
    description: "Test 1",
    stopExecutionOnFailure: false,
    rules,
  };
  const updateTestParams: UpdateTestParams = {
    authorization: () => getAuthorization(),
    testId,
    updateTestBody
  };
  const test: Test = await propertyValidationClient.tests.update(updateTestParams);

  console.log(test.id);
}
```

### Get all property validation tests
```typescript
import { Authorization, EntityListIterator, GetTestListParams, PropertyValidationClient } from "@itwin/property-validation-client";
/** Function that queries all tests for a particular project and prints their ids to the console. */
async function printTestIds(projectId: string): Promise<void> {
  const propertyValidationClient: PropertyValidationClient = new PropertyValidationClient();
  const getTestListParams: GetTestListParams = {
    authorization,
    urlParams: {
      projectId
    }
  };
  const testsIterator: EntityListIterator<TestItem> = propertyValidationClient.tests.getList(getTestListParams);
  for await (const test of testsIterator)
    console.log(test.id);
}
```

### Get property validation test
```typescript
import { Authorization, GetSingleTestParams, PropertyValidationClient, TestDetails } from "@itwin/property-validation-client";

/** Function that gets a property validation test and prints its name. */
async function getPropertyValidationTest(testId: string): Promise<void> {
  const propertyValidationClient: PropertyValidationClient = new PropertyValidationClient();
  const getTestParams: GetSingleTestParams = {
    authorization: () => getAuthorization(),
    testId
  };

  const test: TestDetails = await propertyValidationClient.tests.getSingle(getTestParams);

  console.log(test.displayName);
}
```

### Run property validation test
```typescript
import { Authorization, GetSingleTestParams, PropertyValidationClient, RunTestRequest, Run } from "@itwin/property-validation-client";

/** Function that runs a property validation test and prints its run id. */
async function runPropertyValidationTest(testId: string, iModelId: string, namedVersionId: string): Promise<void> {
  const propertyValidationClient: PropertyValidationClient = new PropertyValidationClient();
  const runTestBody: RunTestRequest = {
    testId: testId,
    iModelId: iModelId,
    namedVersionId: namedVersionId,
  };
  const runTestParams: RunTestParams = {
    authorization: () => getAuthorization(),
    runTestBody,
  };

  const run: Run = await propertyValidationClient.tests.runTest(runTestParams);

  console.log(run.id);
}
```

### Delete property validation test
```typescript
import { Authorization, DeleteTestParams, PropertyValidationClient } from "@itwin/property-validation-client";

/** Function that deletes a property validation test. */
async function deletePropertyValidationTest(testId: string): Promise<void> {
  const propertyValidationClient: PropertyValidationClient = new PropertyValidationClient();
  const deleteTestParams: DeleteTestParams = {
    authorization: () => getAuthorization(),
    testId
  };
  await propertyValidationClient.tests.delete(deleteTestParams);
}
```

### Get all property validation runs
```typescript
import { Authorization, GetRunListParams, GetRunsResponse, PropertyValidationClient } from "@itwin/property-validation-client";
/** Function that queries all runs for a particular project and prints their ids to the console. */
async function printRunIds(projectId: string): Promise<void> {
  const propertyValidationClient: PropertyValidationClient = new PropertyValidationClient();
  const getRunListParams: GetRunListParams = {
    authorization,
    urlParams: {
      projectId
    }
  };
  const getRunsResponse: GetRunsResponse = await propertyValidationClient.runs.getRepresentationList(getRunListParams);
  getRunsResponse.runs.forEach((run) => {
    console.log(run.id);
  });
}
```

### Get property validation run
```typescript
import { Authorization, GetSingleRunParams, PropertyValidationClient, RunDetails } from "@itwin/property-validation-client";

/** Function that gets a property validation run and prints its name and status. */
async function getPropertyValidationRun(runId: string): Promise<void> {
  const propertyValidationClient: PropertyValidationClient = new PropertyValidationClient();
  const getRunParams: GetSingleRunParams = {
    authorization: () => getAuthorization(),
    runId
  };

  const run: RunDetails = await propertyValidationClient.runs.getSingle(getRunParams);

  console.log('${run.displayName}: ${run.status}');
}
```

### Delete property validation run
```typescript
import { Authorization, DeleteRunParams, PropertyValidationClient } from "@itwin/property-validation-client";

/** Function that deletes a property validation run. */
async function deletePropertyValidationRun(runId: string): Promise<void> {
  const propertyValidationClient: PropertyValidationClient = new PropertyValidationClient();
  const deleteRunParams: DeleteRunParams = {
    authorization: () => getAuthorization(),
    runId
  };
  await propertyValidationClient.runs.delete(deleteRunParams);
}
```

### Get property validation result
```typescript
import { Authorization, GetResultParams, PropertyValidationClient, GetResultResponse } from "@itwin/property-validation-client";

/** Function that gets a property validation result and prints the count of validation failures. */
async function getPropertyValidationResult(resultId: string): Promise<void> {
  const propertyValidationClient: PropertyValidationClient = new PropertyValidationClient();
  const getResultParams: GetResultParams = {
    authorization: () => getAuthorization(),
    resultId
  };

  const resultResponse: GetResultResponse = await propertyValidationClient.results.get(getResultParams);

  console.log('Results count: ${resultResponse.result.length.toString()}');
}
```

