/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { getAccessTokenFromBackend, TestUsers } from "@itwin/oidc-signin-tool/lib/cjs/frontend";
import { AccessTokenCallback } from "../base/interfaces/CommonInterfaces";

/** Basic configuration used by all tests
 */
export class TestConfig {
  /** The project id used by some tests */
  public static readonly projectId: string = "e01065ed-c52b-4ddf-a326-e7845442716d";
  public static readonly iModelId: string = "202b3aef-3856-4472-b27e-215b0597fd01";
  public static readonly namedVersionId: string = "f1319989-3bdf-4bcd-9a9c-c52fe49293cd";

  /** Login the specified user and return the AuthorizationToken */
  public static async getAccessToken(): Promise<string> {
    return getAccessTokenFromBackend(TestUsers.regular);

  }

  public static getAccessTokenCallback(): AccessTokenCallback {
    return async () => this.getAccessToken();
  }
}
