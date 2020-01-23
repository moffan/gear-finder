import { ipcRenderer } from "electron";
import { IpcRequest, PoeRequests, UUID } from "../../common";

const apiService = {
  send<T>(request: PoeRequests, payload: any = null): Promise<T> {
    const requestId = `${request}_${UUID()}`;
    const options: IpcRequest = {
      onError: `${requestId}_ERROR`,
      onSuccess: `${requestId}_SUCCESS`,
      payload
    };

    ipcRenderer.send(request, options);

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
