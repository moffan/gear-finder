import { ipcRenderer } from "electron";
import { IpcRequest, UUID, PoeRequests } from "../../common";

const apiService = {
  send<T>(request: PoeRequests, payload: any = null): Promise<T> {
    const requestId = `${request}_${UUID()}`;
    const options: IpcRequest = {
      onSuccess: `${requestId}_SUCCESS`,
      onError: `${requestId}_ERROR`,
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
