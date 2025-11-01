/**
 * Type definitions for JSON data structures
 */

export type JsonValue =
	| string
	| number
	| boolean
	| null
	| JsonObject
	| JsonArray;
export type JsonObject = Record<string, JsonValue>;
export type JsonArray = JsonValue[];
