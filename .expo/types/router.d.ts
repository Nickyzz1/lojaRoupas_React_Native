/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(tabs)` | `/(tabs)/` | `/(tabs)/explore` | `/(tabs)/list` | `/(tabs)/products` | `/(tabs)\add` | `/(tabs)\jacket` | `/(tabs)\pants` | `/(tabs)\shirts` | `/(tabs)\shorts` | `/_sitemap` | `/explore` | `/list` | `/products` | `/register`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
