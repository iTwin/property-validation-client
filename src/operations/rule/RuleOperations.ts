/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { OperationsBase } from "../../base/OperationsBase";
import { PreferReturn } from "../../base/interfaces/CommonInterfaces";
import { CreateRuleResponse, GetMinimalRulesResponse, GetRuleResponse, GetRulesResponse, MinimalRule, Rule, RuleDetails, UpdateRuleResponse } from "../../base/interfaces/apiEntities/RuleInterfaces";
import { EntityListIterator } from "../../base/iterators/EntityListIterator";
import { EntityListIteratorImpl } from "../../base/iterators/EntityListIteratorImpl";
import { OperationOptions } from "../OperationOptions";
import { CreateRuleParams, DeleteRuleParams, GetRuleListParams, GetSingleRuleParams, UpdateRuleParams } from "./RuleOperationParams";

export class RuleOperations<TOptions extends OperationOptions> extends OperationsBase<TOptions> {
  constructor(
    options: TOptions,
  ) {
    super(options);
  }

  /**
   * Gets Rules for a specific project. This method returns Rules in their minimal representation. The
   * returned iterator internally queries entities in pages. Wraps the
   * {@link https://developer.bentley.com/apis/validation/operations/get-validation-propertyvalue-rules/ Get Rules}
   * operation from Property Validation API.
   * @param {GetRuleListParams} params parameters for this operation. See {@link GetRuleListParams}.
   * @returns {EntityListIterator<MinimalRule>} iterator for Rule list. See {@link EntityListIterator},
   * {@link MinimalRule}.
   */
  public getMinimalList(params: GetRuleListParams): EntityListIterator<MinimalRule> {
    const entityCollectionAccessor = (response: unknown) => {
      const rules = (response as GetMinimalRulesResponse).rules;
      return rules;
    };

    return new EntityListIteratorImpl(async () => this.getEntityCollectionPage<MinimalRule>({
      authorization: params.authorization,
      url: this._options.urlFormatter.getRuleListUrl({urlParams: params.urlParams }),
      preferReturn: PreferReturn.Minimal,
      entityCollectionAccessor,
    }));
  }

  /**
   * Gets Rules for a specific project. This method returns Rules in their full representation. The returned
   * iterator internally queries entities in pages. Wraps the
   * {@link https://developer.bentley.com/apis/validation/operations/get-validation-propertyvalue-rules/ Get Rules}
   * operation from Property Validation API.
   * @param {GetRuleListParams} params parameters for this operation. See {@link GetRuleListParams}.
   * @returns {EntityListIterator<Rule>} iterator for Rule list. See {@link EntityListIterator},
   * {@link Rule}.
   */
  public getRepresentationList(params: GetRuleListParams): EntityListIterator<RuleDetails> {
    const entityCollectionAccessor = (response: unknown) => {
      const rules = (response as GetRulesResponse).rules;
      return rules;
    };

    return new EntityListIteratorImpl(async () => this.getEntityCollectionPage<RuleDetails>({
      authorization: params.authorization,
      url: this._options.urlFormatter.getRuleListUrl({urlParams: params.urlParams }),
      preferReturn: PreferReturn.Representation,
      entityCollectionAccessor,
    }));
  }

  /**
   * Gets a single Rule identified by id. This method returns a Rule in its full representation.
   * Wraps the {@link https://developer.bentley.com/apis/validation/operations/get-validation-propertyvalue-rule/
   * Get Rule} operation from Property Validation API.
   * @param {GetSingleRuleParams} params parameters for this operation. See {@link GetSingleRuleParams}.
   * @returns {Promise<Rule>} a Rule with specified id. See {@link Rule}.
   */
  public async getSingle(params: GetSingleRuleParams): Promise<RuleDetails> {
    const rule: RuleDetails = await this.querySingleInternal(params);
    return rule;
  }

  protected async querySingleInternal(params: GetSingleRuleParams): Promise<RuleDetails> {
    const { authorization, ruleId } = params;
    const response = await this.sendGetRequest<GetRuleResponse>({
      authorization,
      url: this._options.urlFormatter.getSingleRuleUrl({ ruleId }),
    });
    return response.rule;
  }

  /**
   * Deletes a single Rule identified by id.
   * Wraps the {@link https://developer.bentley.com/apis/validation/operations/delete-validation-propertyvalue-rule/
   * Delete Rule} operation from Property Validation API.
   * @param {DeleteRuleParams} params parameters for this operation. See {@link DeleteRuleParams}.
   * @returns {Promise<void>}. See {@link Rule}.
   */
  public async delete(params: DeleteRuleParams): Promise<void> {
    await this.deleteInternal(params);
  }

  protected async deleteInternal(params: DeleteRuleParams): Promise<void> {
    const { authorization, ruleId } = params;
    await this.sendDeleteRequest<void>({
      authorization,
      url: this._options.urlFormatter.deleteRuleUrl({ ruleId }),
    });
  }

  /**
   * Creates a Rule. Wraps the {@link https://developer.bentley.com/apis/validation/operations/create-validation-propertyvalue-rule/
   * Create Rule} operation from Property Validation API.
   * @param {CreateRuleParams} params parameters for this operation. See {@link CreateRuleParams}.
   * @returns newly created Rule. See {@link Rule}.
   */
  public async create(params: CreateRuleParams): Promise<Rule> {
    const createRuleResponse = await this.sendPostRequest<CreateRuleResponse>({
      authorization: params.authorization,
      url: this._options.urlFormatter.createRuleUrl(),
      body: params.createRuleBody,
    });

    return createRuleResponse.rule;
  }

  /**
   * Updates a Rule. Wraps the {@link https://developer.bentley.com/apis/validation/operations/update-validation-propertyvalue-rule/
   * Update Rule} operation from Property Validation API.
   * @param {UpdateRuleParams} params parameters for this operation. See {@link UpdateRuleParams}.
   * @returns newly updated Rule. See {@link Rule}.
   */
  public async update(params: UpdateRuleParams): Promise<Rule> {
    const updateRuleResponse = await this.sendPutRequest<UpdateRuleResponse>({
      authorization: params.authorization,
      url: this._options.urlFormatter.updateRuleUrl(params),
      body: params.updateRuleBody,
    });

    return updateRuleResponse.rule;
  }
}
