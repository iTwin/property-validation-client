/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { SchemaList } from "..//CommonInterfaces";

/** Properties info search results */
export interface PropertiesSearchResults {
  /* Array of schemas in iModel */
  schemas: SchemaList[];
}

/** Properties info data object */
export interface PropertiesData {
  /* The properties info data object retrieved */
  searchProperty: PropertiesSearchResults;
}

/** Get Schema Info API response. */
export interface ResponseFromGetPropertiesInfo {
  /** The status of the properties info extraction. One of 'available', 'unavailable'. */
  status: string;
  /* The properties info data object retrieved */
  data: PropertiesData;
}
