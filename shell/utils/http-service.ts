import axios, { AxiosInstance } from "axios";
import rateLimit from "axios-rate-limit";

// const COOKIE_REGEXP = /^[0-9A-Fa-f]{32}$/;

export class HttpService {
  private readonly http: AxiosInstance = rateLimit(axios.create(), {
    perMilliseconds: 1000,
    maxRequests: 2
  });

  private getCookieHeader = (poesessid?: string) =>
    poesessid ? { cookie: `POESESSID=${poesessid}` } : {};

  public async get<T>(url: URL | string, poesessid?: string): Promise<T> {
    const requestUrl = typeof url === "string" ? new URL(url) : url;

    const response = await this.http.get<T>(requestUrl.toJSON(), {
      headers: this.getCookieHeader(poesessid)
    });

    return response.data;
  }

  public async post<T extends {}, TT extends {}>(
    url: URL | string,
    body: T,
    poesessid?: string
  ): Promise<TT> {
    const requestUrl = typeof url === "string" ? new URL(url) : url;

    const response = await this.http.post(requestUrl.toJSON(), body, {
      headers: {
        "content-type": "application/json",
        ...this.getCookieHeader(poesessid)
      }
    });

    return Promise.resolve<TT>(response.data);
  }
}
