import fetch, { Response } from "node-fetch";

export class HttpService {
  private readonly defaultHeaders: { [key: string]: string } = {};

  constructor(sessionId?: string) {
    if (!!sessionId) {
      this.defaultHeaders.cookie = `POESESSID=${sessionId}`;
    }
  }

  public async get<T>(url: URL | string): Promise<T> {
    const requestUrl = typeof url === "string" ? new URL(url) : url;

    const response = await fetch(requestUrl.toJSON(), {
      headers: { ...this.defaultHeaders },
      method: "GET"
    });
    this.checkResponse(response);

    return await response.json();
  }

  private checkResponse(response: Response) {
    if (!response.ok) {
      // tslint:disable-next-line: no-console
      console.error(response);
      throw new Error(`${response.status}:${response.statusText}`);
    }
  }
}
