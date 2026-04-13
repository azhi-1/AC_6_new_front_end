/**
 * SillyTavern + TavernHelper 全局函数声明
 * 这些函数在 ST 消息 iframe 环境中由宿主注入，无需 import 直接调用。
 * 在 Vite 开发环境下不可用，代码中应先检查 typeof 再调用。
 */

declare function getLastMessageId(): number;

declare function getChatMessages(
  range: string | number,
  options?: { role?: 'assistant' | 'user' },
): Array<{ message_id: number; role: string; message: string; [key: string]: any }>;

declare function getVariables(options: {
  type: 'message' | 'chat' | 'character' | 'global' | 'script';
  message_id?: number | 'latest';
  script_id?: string;
}): Record<string, any>;

declare function waitGlobalInitialized(name: string): Promise<void>;

declare function waitUntil(condition: () => boolean, options?: { timeout?: number }): Promise<void>;

declare function getCurrentMessageId(): number;

declare function eventOn(event: string, callback: (...args: any[]) => void): void;

declare const Mvu: {
  getMvuData(options: { type: 'message'; message_id?: number | 'latest' }): Record<string, any>;
  events: {
    VARIABLE_UPDATE_ENDED: string;
    COMMAND_PARSED: string;
  };
};

declare const _: {
  get(object: any, path: string, defaultValue?: any): any;
  has(object: any, path: string): boolean;
  set(object: any, path: string, value: any): any;
  clamp(value: number, min: number, max: number): number;
  [key: string]: any;
};
