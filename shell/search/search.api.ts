import { DataStore, HttpService } from "../utils";

export class SearchApi {
  private http: HttpService = new HttpService();

  public async search(item: any, filters: any, league: any) {
    const searchOptions = {
      query: {
        name: "The Pariah",
        stats: [
          {
            filters: [],
            type: "and"
          }
        ],
        status: {
          option: "online"
        },
        type: "Unset Ring"
      },
      sort: {
        price: "asc"
      }
    };

    const body = JSON.stringify(searchOptions);

    const data = await this.http.post(
      `https://www.pathofexile.com/api/trade/search/${league}`,
      body
    );

    return data;

    // fetch(, {
    //   body: JSON.stringify(searchOptions),
    //   headers: {
    //     "content-type": "application/json"
    //   },
    //   method: "POST"
    // })
    //   .then(res => {
    //     if (res.ok) {
    //       return res.json();
    //     }

    //     throw new Error(res.status.toString());
    //   })
    //   // tslint:disable-next-line: no-console
    //   .then(console.log)
    //   // tslint:disable-next-line: no-console
    //   .catch(console.error);
  }

  public searchExchange(
    have: any,
    want: any,
    league: string,
    onlineStatus: string
  ) {
    const searchOptions = {
      exchange: {
        have,
        status: {
          option: onlineStatus
        },
        want
      }
    };

    const url = new URL(
      `https://www.pathofexile.com/api/trade/exchange/${league}`
    );

    this.http.post(url, JSON.stringify(searchOptions));
  }
}
