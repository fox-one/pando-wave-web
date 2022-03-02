declare namespace State {
  export interface AppBarState {
    style: "home" | "nav";
    title: string;
    show: boolean;
    back: boolean;
    extension?: null | any;
    extensionHeight?: number;
  }

  export interface SettingsState {
    dark: boolean;
  }

  export interface PayState {
    visible: boolean;
    text?: string;
    timer?: any;
  }

  export interface App {
    appbar: AppBarState;
    settings: SettingsState;
    initing: boolean;
    paying: PayState;
  }
}
