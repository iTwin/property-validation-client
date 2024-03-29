/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { OperationUtils } from "../OperationUtils";
import { OperationsBase } from "../../base/OperationsBase";
import type { ResponseFromGetTemplates, RuleTemplate } from "../../base/interfaces/apiEntities/TemplateInterfaces";
import type { EntityListIterator } from "../../base/iterators/EntityListIterator";
import { EntityListIteratorImpl } from "../../base/iterators/EntityListIteratorImpl";
import type { OperationOptions } from "../OperationOptions";
import type { ParamsToGetTemplateList } from "./TemplateOperationParams";

export class TemplateOperations<TOptions extends OperationOptions> extends OperationsBase<TOptions> {
  constructor(
    options: TOptions,
  ) {
    super(options);
  }

  /**
   * Gets Rule Templates for a specific project. This method returns Rule Templates in their full representation. The returned
   * iterator internally queries entities in pages. Wraps the
   * {@link https://developer.bentley.com/apis/validation/operations/get-validation-propertyvalue-rule-templates/ Get Rule Template}
   * operation from Property Validation API.
   * @param {ParamsToGetTemplateList} params parameters for this operation. See {@link ParamsToGetTemplateList}.
   * @returns {EntityListIterator<RuleTemplate>} iterator for Template list. See {@link EntityListIterator},
   * {@link RuleTemplate}.
   */
  public getList(params: ParamsToGetTemplateList): EntityListIterator<RuleTemplate> {
    const entityCollectionAccessor = (response: unknown) => {
      const templates = (response as ResponseFromGetTemplates).ruleTemplates;
      return templates;
    };
    OperationUtils.ensureAccessTokenProvided(params.accessToken, this._options.accessTokenCallback);
    return new EntityListIteratorImpl(async () => this.getEntityCollectionPage<RuleTemplate>({
      // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
      accessToken: params.accessToken ?? await this._options.accessTokenCallback!(),
      url: this._options.urlFormatter.getTemplateListUrl({ urlParams: params.urlParams }),
      entityCollectionAccessor,
      userMetadata: false,
    }));
  }
}
