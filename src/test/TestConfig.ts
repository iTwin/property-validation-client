/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { getAccessTokenFromBackend, TestUsers } from "@itwin/oidc-signin-tool/lib/cjs/frontend";
import { AccessTokenCallback } from "../base/interfaces/CommonInterfaces";
import { take } from "../base/iterators/IteratorUtilFunctions";
import { PropertyValidationClient } from "../PropertyValidationClient";
import { EntityListIterator } from "../base/iterators/EntityListIterator";
import type { AccessToken } from "@itwin/core-bentley";
import { Project, ProjectsAccessClient, ProjectsSearchableProperty } from "@itwin/projects-client";
import { AuthorizationCallback, GetIModelListParams, IModelsClient, MinimalIModel } from "@itwin/imodels-client-management";

/** Basic configuration used by all tests
 */
export class TestConfig {
  /** The project id used by some tests */
  public static readonly projectName: string = "APIM Test Project-20210205T1402";
  public static readonly iModelName: string = "ValidationTest1";

  /** Login the specified user and return the AuthorizationToken */
  public static async getAccessToken(): Promise<AccessToken> {
    return getAccessTokenFromBackend(TestUsers.regular);
  }

  public static getAccessTokenCallback(): AccessTokenCallback {
    return async () => this.getAccessToken();
  }

  public static async getProjectByName(accessToken: AccessToken, name: string): Promise<Project> {
    const projectsAccessClient = new ProjectsAccessClient();
    const projectList: Project[] = await projectsAccessClient.getAll(accessToken, {
      search: {
        searchString: name,
        propertyName: ProjectsSearchableProperty.Name,
        exactMatch: true,
      },
    });
    if (projectList.length === 0) {
      throw new Error(`Project ${name} was not found for user.`);
    } else if (projectList.length > 1) {
      throw new Error(`Multiple Projects named ${name} were found for the user.`);
    }
    return projectList[0];
  }

  public static async getIModelByName(accessToken: AccessToken, projectId: string, name: string): Promise<MinimalIModel> {
    const iModelsClient: IModelsClient = new IModelsClient();
    const authorization: AuthorizationCallback = PropertyValidationClient.toAuthorizationCallback(accessToken);
    const getIModelListParams: GetIModelListParams = {
      authorization,
      urlParams: {
        projectId,
        name,
      },
    };
    const iModelsIterator: EntityListIterator<MinimalIModel> = iModelsClient.iModels.getMinimalList(getIModelListParams);
    const iModels: MinimalIModel[] = await take(iModelsIterator, 1);
    if (iModels.length === 0) {
      throw new Error(`iModel ${name} was not found for user.`);
    } else if (iModels.length > 1) {
      throw new Error(`Multiple iModels named ${name} were found.`);
    }
    return iModels[0];
  }
}
