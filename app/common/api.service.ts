import { ipcRenderer } from "electron";
import { IpcRequest, UUID } from "../../common";

const apiService = {
  send<T>(channel: string, payload: any = null): Promise<T> {
    const requestId = `${channel}_${UUID()}`;
    const options: IpcRequest = {
      onSuccess: `${requestId}_SUCCESS`,
      onError: `${requestId}_ERROR`,
      payload
    };

    ipcRenderer.send(channel, options);

    return new Promise((resolve, reject) => {
      ipcRenderer.once(options.onSuccess, (_: any, response: any) => {
        resolve(response);
      });
      ipcRenderer.once(options.onError, (_: any, response: any) => {
        reject(response);
      });
    });
  }
};

export default apiService;
