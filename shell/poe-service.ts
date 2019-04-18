import { ipcMain, WebContents } from "electron";
import { URLSearchParams } from "url";
import fetch from "node-fetch";

import { PoeRequests, IpcRequest, IpcEvent } from "../common";

ipcMain.on(
  PoeRequests.Character,
  ({ sender }: IpcEvent, { payload, onError, onSuccess }: IpcRequest) => {
    const { sessionId, character, accountName } = payload;

    if (!character || !accountName || !sessionId) {
      return sender.send(
        onError,
        "accountName, character and sessionId must be provided"
      );
    }

    const params = new URLSearchParams();
    params.append("character", character);
    params.append("accountName", accountName);

    fetch("https://www.pathofexile.com/character-window/get-items", {
      headers: {
        Cookie: `POESESSID=${sessionId}`
      },
      method: "POST",
      body: params
    })
      .then(res => {
        if (res.ok) {
          return res
            .json()
            .then(data => {
              sender.send(onSuccess, data);
            })
            .catch(err => {
              sender.send(onError, err);
            });
        }

        res.text().then(err => {
          sender.send(onError, err);
        });
      })
      .catch(err => {
        sender.send(onError, err);
      });
  }
);

ipcMain.on(
  PoeRequests.CharacterList,
  ({ sender }: IpcEvent, { payload, onError, onSuccess }: IpcRequest) => {
    const { sessionId } = payload;
    poeFetch(
      "https://www.pathofexile.com/character-window/get-characters",
      sessionId,
      sender,
      onSuccess,
      onError
    );
  }
);

ipcMain.on(
  PoeRequests.CurrentLeagues,
  ({ sender }: IpcEvent, { payload, onError, onSuccess }: IpcRequest) => {
    const { sessionId } = payload;
    poeFetch(
      "https://www.pathofexile.com/api/trade/data/leagues",
      sessionId,
      sender,
      onSuccess,
      onError
    );
  }
);

ipcMain.on(
  PoeRequests.Stats,
  ({ sender }: IpcEvent, { payload, onError, onSuccess }: IpcRequest) => {
    const { sessionId } = payload;
    poeFetch(
      "https://www.pathofexile.com/api/trade/data/stats",
      sessionId,
      sender,
      onSuccess,
      onError
    );
  }
);

ipcMain.on(
  PoeRequests.ItemSearch,
  ({ sender }: IpcEvent, { payload, onError, onSuccess }: IpcRequest) => {
    const { item, filters, league } = payload;

    const searchOptions = {
      query: {
        status: {
          option: "online"
        },
        name: "The Pariah",
        type: "Unset Ring",
        stats: [
          {
            type: "and",
            filters: []
          }
        ]
      },
      sort: {
        price: "asc"
      }
    };

    fetch(`https://www.pathofexile.com/api/trade/search/${league}`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(searchOptions)
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        throw new Error(res.status.toString());
      })
      .then(console.log)
      .catch(console.error);
  }
);

const poeFetch = (
  url: string,
  sessionId: string,
  sender: WebContents,
  onSuccess: string,
  onError: string
) => {
  fetch(url, {
    headers: {
      Cookie: `POESESSID=${sessionId}`
    }
  })
    .then(res => {
      if (res.ok) {
        return res
          .json()
          .then(data => {
            sender.send(onSuccess, data);
          })
          .catch(err => {
            sender.send(onError, err);
          });
      }

      res.text().then(err => {
        sender.send(onError, err);
      });
    })
    .catch(err => {
      sender.send(onError, err);
    });
};
