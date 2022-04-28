# Property Validation Client Library

Copyright © Bentley Systems, Incorporated. All rights reserved. See [LICENSE.md](./LICENSE.md) for license terms and full copyright notice.

[iTwin.js](http://www.itwinjs.org) is an open source platform for creating, querying, modifying, and displaying Infrastructure Digital Twins. To learn more about the iTwin Platform and its APIs, visit the [iTwin developer portal](https://developer.bentley.com/).

If you have questions, or wish to contribute to iTwin.js, see our [Contributing guide](./CONTRIBUTING.md).

## About this Repository

The __@itwin/property-validation-client__ package consists of thin wrapper functions for sending requests to the iTwin Validation API. There are CRUD functions for the four components of validation: rules, tests, runs and results. Define validation criteria in rules, add rules to tests, run the tests for versions of iModels, and retrieve the validation results. Visit the [Property Validation API](https://developer.bentley.com/apis/validation/) for more details.

## Authorization options

There are two ways to provide the authorization token for the wrapper functions:

1. Set accessToken in parameters object every time a wrapper function is called (as shown in usage examples below).

2. Provide a callback function to the PropertyValidationClient constructor. This callback will be called by the wrapper function if the accessToken parameter in Option 1 is not provided.

```typescript
    import { PropertyValidationClient, PropertyValidationClientOptions } from "@itwin/property-validation-client";

    public static initWrapperClient(accessToken: string, projectId: string): PropertyValidationClient {
      const options: PropertyValidationClientOptions = {};
      const accessTokenCallback = async () => this.getAccessToken();
      const propertyValidationClient: PropertyValidationClient = new PropertyValidationClient(options, accessTokenCallback);
    }

    public static async getAccessToken(): Promise<string> {
      return "Bearer ey..."
    }
```

## Usage examples

### Get all property validation rule templates
```typescript
import { EntityListIterator, ParamsToGetTemplateList, PropertyValidationClient, RuleTemplate } from "@itwin/property-validation-client";

/** Function that queries all rule templates for a particular project and prints their ids to the console. */
async function printRuleTemplateIds(accessToken: string, projectId: string): Promise<void> {
  const propertyValidationClient: PropertyValidationClient = new PropertyValidationClient();
  const params: ParamsToGetTemplateList = {
    accessToken,
    urlParams: {
      projectId
    }
  };

  const templatesIterator: EntityListIterator<RuleTemplate> = propertyValidationClient.templates.getList(params);
  for await (const template of templatesIterator)
    console.log(template.id);
}
```

### Get property validation rule template by function name
```typescript
import { ParamsToGetTemplate, PropertyValidationClient, RuleTemplate } from "@itwin/property-validation-client";

/** Function that queries for a rule template by function name and prints its id to the console. */
async function printRuleTemplateId(accessToken: string, projectId: string, functionName: string): Promise<void> {
  const propertyValidationClient: PropertyValidationClient = new PropertyValidationClient();
  const params: ParamsToGetTemplate = {
    accessToken,
    functionName,
    urlParams: {
      projectId
    }
  };

  const template: RuleTemplate = await propertyValidationClient.templates.getSingle(params);

  console.log(template.id);
}
```

### Create property validation rule
```typescript
import { ParamsToCreateRule, PropertyValidationClient, Rule } from "@itwin/property-validation-client";

/** Function that creates a new property validation rule and prints its id to the console. */
async function createPropertyValidationRule(accessToken: string, templateId: string): Promise<void> {
  const propertyValidationClient: PropertyValidationClient = new PropertyValidationClient();
  const params: ParamsToCreateRule = {
    accessToken,
    templateId,
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
  const rule: Rule = await propertyValidationClient.rules.create(params);

  console.log(rule.id);
}
```

### Update property validation rule
```typescript
import { ParamsToUpdateRule, PropertyValidationClient, Rule } from "@itwin/property-validation-client";

/** Function that updates a new property validation rule and prints its id to the console. */
async function updatePropertyValidationRule(accessToken: string, ruleId: string): Promise<void> {
  const propertyValidationClient: PropertyValidationClient = new PropertyValidationClient();
  const params: ParamsToUpdateRule = {
    accessToken,
    ruleId,
    displayName: "TestRule1 - updated",
    description: "Test rule 1",
    severity: "high",
    ecSchema: "ArchitecturalPhysical",
    ecClass: "Door",
    whereClause: "Roll = '10'"
  };
  const rule: Rule = await propertyValidationClient.rules.update(params);

  console.log(rule.id);
}
```

### Get all property validation rules
```typescript
import { EntityListIterator, ParamsToGetRuleList, PropertyValidationClient, RuleDetails } from "@itwin/property-validation-client";

/** Function that queries all rules for a particular project and prints their ids to the console. */
async function printRuleIds(accessToken: string, projectId: string): Promise<void> {
  const propertyValidationClient: PropertyValidationClient = new PropertyValidationClient();
  const params: ParamsToGetRuleList = {
    accessToken,
    urlParams: {
      projectId
    }
  };
  const rulesIterator: EntityListIterator<RuleDetails> = propertyValidationClient.rules.getRepresentationList(params);
  for await (const rule of rulesIterator)
    console.log(rule.id);
}
```

### Get property validation rule
```typescript
import { ParamsToGetRule, PropertyValidationClient, RuleDetails } from "@itwin/property-validation-client";

/** Function that gets a property validation rule and prints its name. */
async function getPropertyValidationRule(accessToken: string, ruleId: string): Promise<void> {
  const propertyValidationClient: PropertyValidationClient = new PropertyValidationClient();
  const params: ParamsToGetRule = {
    accessToken,
    ruleId
  };

  const rule: RuleDetails = await propertyValidationClient.rules.getSingle(params);

  console.log(rule.displayName);
}
```

### Delete property validation rule
```typescript
import { ParamsToDeleteRule, PropertyValidationClient } from "@itwin/property-validation-client";

/** Function that deletes a property validation rule. */
async function deletePropertyValidationRule(accessToken: string, ruleId: string): Promise<void> {
  const propertyValidationClient: PropertyValidationClient = new PropertyValidationClient();
  const params: ParamsToDeleteRule = {
    accessToken,
    ruleId
  };
  await propertyValidationClient.rules.delete(params);
}
```

### Create property validation test
```typescript
import { ParamsToCreateTest, PropertyValidationClient, Test } from "@itwin/property-validation-client";

/** Function that creates a new property validation test and prints its id to the console. */
async function createPropertyValidationTest(accessToken: string, projectId: string, rules: string[]): Promise<void> {
  const propertyValidationClient: PropertyValidationClient = new PropertyValidationClient();
  const params: ParamsToCreateTest = {
    accessToken,
    projectId,
    displayName: "Test1",
    description: "Test 1",
    stopExecutionOnFailure: false,
    rules,
  };
  const test: Test = await propertyValidationClient.tests.create(params);

  console.log(test.id);
}
```

### Update property validation test
```typescript
import { ParamsToUpdateTest, PropertyValidationClient, Test } from "@itwin/property-validation-client";

/** Function that updates a new property validation test and prints its id to the console. */
async function updatePropertyValidationTest(accessToken: string, testId: string, rules: string[]): Promise<void> {
  const propertyValidationClient: PropertyValidationClient = new PropertyValidationClient();
  const params: ParamsToUpdateTest = {
    accessToken,
    testId,
    displayName: "Test1 - updated",
    description: "Test 1",
    stopExecutionOnFailure: false,
    rules,
  };
  const test: Test = await propertyValidationClient.tests.update(params);

  console.log(test.id);
}
```

### Get all property validation tests
```typescript
import { EntityListIterator, ParamsToGetTestList, PropertyValidationClient, TestItem } from "@itwin/property-validation-client";
/** Function that queries all tests for a particular project and prints their ids to the console. */
async function printTestIds(accessToken: string, projectId: string): Promise<void> {
  const propertyValidationClient: PropertyValidationClient = new PropertyValidationClient();
  const params: ParamsToGetTestList = {
    accessToken,
    urlParams: {
      projectId
    }
  };
  const testsIterator: EntityListIterator<TestItem> = propertyValidationClient.tests.getList(params);
  for await (const test of testsIterator)
    console.log(test.id);
}
```

### Get property validation test
```typescript
import { ParamsToGetTest, PropertyValidationClient, TestDetails } from "@itwin/property-validation-client";

/** Function that gets a property validation test and prints its name. */
async function getPropertyValidationTest(accessToken: string, testId: string): Promise<void> {
  const propertyValidationClient: PropertyValidationClient = new PropertyValidationClient();
  const params: ParamsToGetTest = {
    accessToken,
    testId
  };

  const test: TestDetails = await propertyValidationClient.tests.getSingle(params);

  console.log(test.displayName);
}
```

### Run property validation test
```typescript
import { ParamsToRunTest, PropertyValidationClient, Run } from "@itwin/property-validation-client";

/** Function that runs a property validation test and prints its run id. */
async function runPropertyValidationTest(accessToken: string, testId: string, iModelId: string, namedVersionId?: string): Promise<void> {
  const propertyValidationClient: PropertyValidationClient = new PropertyValidationClient();
  const params: ParamsToRunTest = {
    accessToken,
    testId,
    iModelId,
    namedVersionId,   // Optional - defaults to latest
  };

  const run: Run = await propertyValidationClient.tests.runTest(params);

  console.log(run.id);
}
```

### Delete property validation test
```typescript
import { ParamsToDeleteTest, PropertyValidationClient } from "@itwin/property-validation-client";

/** Function that deletes a property validation test. */
async function deletePropertyValidationTest(accessToken: string, testId: string): Promise<void> {
  const propertyValidationClient: PropertyValidationClient = new PropertyValidationClient();
  const params: ParamsToDeleteTest = {
    accessToken,
    testId
  };
  await propertyValidationClient.tests.delete(params);
}
```

### Get all property validation runs
```typescript
import { ParamsToGetRunList, PropertyValidationClient, RunDetails } from "@itwin/property-validation-client";
/** Function that queries all runs for a particular project and prints their ids to the console. */
async function printRunIds(accessToken: string, projectId: string): Promise<void> {
  const propertyValidationClient: PropertyValidationClient = new PropertyValidationClient();
  const params: ParamsToGetRunList = {
    accessToken,
    urlParams: {
      projectId
    }
  };
  const runs: RunDetails[] = await propertyValidationClient.runs.getRepresentationList(params);
  runs.forEach((run) => {
    console.log(run.id);
  });
}
```

### Get property validation run
```typescript
import { ParamsToGetRun, PropertyValidationClient, RunDetails } from "@itwin/property-validation-client";

/** Function that gets a property validation run and prints its name and status. */
async function getPropertyValidationRun(accessToken: string, runId: string): Promise<void> {
  const propertyValidationClient: PropertyValidationClient = new PropertyValidationClient();
  const params: ParamsToGetRun = {
    accessToken,
    runId
  };

  const run: RunDetails = await propertyValidationClient.runs.getSingle(params);

  console.log('${run.displayName}: ${run.status}');
}
```

### Delete property validation run
```typescript
import { ParamsToDeleteRun, PropertyValidationClient } from "@itwin/property-validation-client";

/** Function that deletes a property validation run. */
async function deletePropertyValidationRun(accessToken: string, runId: string): Promise<void> {
  const propertyValidationClient: PropertyValidationClient = new PropertyValidationClient();
  const params: ParamsToDeleteRun = {
    accessToken,
    runId
  };
  await propertyValidationClient.runs.delete(params);
}
```

### Get property validation result
```typescript
import { GetResultResponse, ParamsToGetResult, PropertyValidationClient } from "@itwin/property-validation-client";

/** Function that gets a property validation result and prints the count of validation failures. */
async function getPropertyValidationResult(accessToken: string, resultId: string): Promise<void> {
  const propertyValidationClient: PropertyValidationClient = new PropertyValidationClient();
  const params: ParamsToGetResult = {
    accessToken,
    resultId
  };

  const response: GetResultResponse = await propertyValidationClient.results.get(params);

  console.log('Results count: ${response.result.length.toString()}');
}
```

