/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import type { AccessToken } from "@itwin/core-bentley";
import { getAccessTokenFromBackend, TestUserCredentials, TestUsers } from "@itwin/oidc-signin-tool/lib/cjs/frontend";

/** Basic configuration used by all tests
 */
export class TestConfig {
  /** The project id used by some tests */
  public static readonly projectId: string = "e01065ed-c52b-4ddf-a326-e7845442716d";
  public static readonly iModelId: string = "391b23a5-b7b0-4437-bcd0-37ebb14b1e5f";
  public static readonly namedVersionId: string = "381a7791-bd65-4aa1-aab6-83737a7b0bb4";

  /** Login the specified user and return the AuthorizationToken */
  public static async getAccessToken(user: TestUserCredentials = TestUsers.regular): Promise<AccessToken> {
    return getAccessTokenFromBackend(user);
  }
}
