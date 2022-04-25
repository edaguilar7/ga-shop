/* eslint-disable no-underscore-dangle */
export class Environment {
  private static _baseUrl = process.env.REACT_APP_BASE_URL;

  public static get baseUrl(): string {
    if (!this._baseUrl) throw new Error('base url not set.');

    return this._baseUrl;
  }
}
