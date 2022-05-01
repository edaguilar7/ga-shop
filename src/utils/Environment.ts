/* eslint-disable no-underscore-dangle */
export class Environment {
  private static _baseUrl = process.env.REACT_APP_BASE_URL;

  private static _gaTrackingId = process.env.REACT_APP_GA_TRACKING_ID;

  private static _gtmTrackingId = process.env.REACT_APP_GTM_TRACKING_ID;

  public static get baseUrl(): string {
    if (!this._baseUrl) throw new Error('base url not set.');

    return this._baseUrl;
  }

  public static get gaTrackingId(): string {
    if (!this._gaTrackingId) throw new Error('GA tracking id not set.');

    return this._gaTrackingId;
  }

  public static get gtmTrackingId(): string {
    if (!this._gtmTrackingId) throw new Error('GTM tracking id not set.');

    return this._gtmTrackingId;
  }
}
