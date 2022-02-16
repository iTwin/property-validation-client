/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { OperationsBase } from "../../base/OperationsBase";
import { RuleTemplate, TemplatesResponse } from "../../base/interfaces/apiEntities/TemplateInterfaces";
import { EntityListIterator } from "../../base/iterators/EntityListIterator";
import { EntityListIteratorImpl } from "../../base/iterators/EntityListIteratorImpl";
import { OperationOptions } from "../OperationOptions";
import { GetTemplateListParams } from "./TemplateOperationParams";

export class TemplateOperations<TOptions extends OperationOptions> extends OperationsBase<TOptions> {
  constructor(
    options: TOptions,
  ) {
    super(options);
  }

  /**
   * Gets Templates for a specific project. This method returns Templates in their full representation. The returned
   * iterator internally queries entities in pages. Wraps the
   * {@link https://developer.bentley.com/apis/validation/operations/get-validation-propertyvalue--templates/ Get Template Rules}
   * operation from Property Validation API.
   * @param {GetTemplateListParams} params parameters for this operation. See {@link GetTemplateListParams}.
   * @returns {EntityListIterator<Template>} iterator for Template list. See {@link EntityListIterator},
   * {@link Template}.
   */
  public getList(params: GetTemplateListParams): EntityListIterator<RuleTemplate> {
    const entityCollectionAccessor = (response: unknown) => {
      const templates = (response as TemplatesResponse).ruleTemplates;
      return templates;
    };

    return new EntityListIteratorImpl(async () => this.getEntityCollectionPage<RuleTemplate>({
      authorization: params.authorization,
      url: this._options.urlFormatter.getTemplateListUrl({ urlParams: params.urlParams }),
      entityCollectionAccessor,
    }));
  }
}
