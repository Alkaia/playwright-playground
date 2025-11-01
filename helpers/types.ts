/**
 * Type definitions for API testing
 */

export interface User {
  id: number;
  name: string;
  email: string;
  username?: string;
  phone?: string;
  website?: string;
}

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export type JsonValue = string | number | boolean | null | JsonObject | JsonArray;
export interface JsonObject extends Record<string, JsonValue> {}
export type JsonArray = JsonValue[];

