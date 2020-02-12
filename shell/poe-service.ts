// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { ipcMain, WebContents } from "electron";
// import { URLSearchParams } from "url";

// import { IpcEvent, IpcRequest, PoeRequests } from "../common";

// const poeFetch = (
//   url: string,
//   sessionId: string,
//   sender: WebContents,
//   onSuccess: string,
//   onError: string
// ) => {
//   fetch(url, {
//     headers: {
//       Cookie: `POESESSID=${sessionId}`
//     }
//   })
//     .then(res => {
//       if (res.ok) {
//         return res
//           .json()
//           .then(data => {
//             sender.send(onSuccess, data);
//           })
//           .catch(err => {
//             sender.send(onError, err);
//           });
//       }

//       res.text().then(err => {
//         sender.send(onError, err);
//       });
//     })
//     .catch(err => {
//       sender.send(onError, err);
//     });
// };

// ipcMain.on(
//   PoeRequests.Character,
//   ({ sender }: IpcEvent, { payload, onError, onSuccess }: IpcRequest<any>) => {
//     const { sessionId, character, accountName } = payload;

//     if (!character || !accountName || !sessionId) {
//       return sender.send(
//         onError,
//         "accountName, character and sessionId must be provided"
//       );
//     }

//     const params = new URLSearchParams();
//     params.append("character", character);
//     params.append("accountName", accountName);

//     fetch("https://www.pathofexile.com/character-window/get-items", {
//       body: params,
//       headers: {
//         Cookie: `POESESSID=${sessionId}`
//       },
//       method: "POST"
//     })
//       .then(res => {
//         if (res.ok) {
//           return res
//             .json()
//             .then(data => {
//               sender.send(onSuccess, data);
//             })
//             .catch(err => {
//               sender.send(onError, err);
//             });
//         }

//         res.text().then(err => {
//           sender.send(onError, err);
//         });
//       })
//       .catch(err => {
//         sender.send(onError, err);
//       });
//   }
// );

// ipcMain.on(
//   PoeRequests.CurrentLeagues,
//   ({ sender }: IpcEvent, { payload, onError, onSuccess }: IpcRequest<any>) => {
//     const { sessionId } = payload;
//     poeFetch(
//       "https://www.pathofexile.com/api/trade/data/leagues",
//       sessionId,
//       sender,
//       onSuccess,
//       onError
//     );
//   }
// );

// ipcMain.on(
//   PoeRequests.Stats,
//   ({ sender }: IpcEvent, { payload, onError, onSuccess }: IpcRequest<any>) => {
//     const { sessionId } = payload;
//     poeFetch(
//       "https://www.pathofexile.com/api/trade/data/stats",
//       sessionId,
//       sender,
//       onSuccess,
//       onError
//     );
//   }
// );

// ipcMain.on(
//   PoeRequests.ItemSearch,
//   ({ sender }: IpcEvent, { payload, onError, onSuccess }: IpcRequest<any>) => {
//     const { item, filters, league } = payload;

//     const searchOptions = {
//       query: {
//         name: "The Pariah",
//         stats: [
//           {
//             filters: [],
//             type: "and"
//           }
//         ],
//         status: {
//           option: "online"
//         },
//         type: "Unset Ring"
//       },
//       sort: {
//         price: "asc"
//       }
//     };

//     fetch(`https://www.pathofexile.com/api/trade/search/${league}`, {
//       body: JSON.stringify(searchOptions),
//       headers: {
//         "content-type": "application/json"
//       },
//       method: "POST"
//     })
//       .then(res => {
//         if (res.ok) {
//           return res.json();
//         }

//         throw new Error(res.status.toString());
//       })
//       .then(console.log)
//       .catch(console.error);
//   }
// );
