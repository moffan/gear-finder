import { ipcRenderer } from "electron";
import { IpcRequest, PoeRequests, UUID } from "../../common";

export interface ApiService {
  send<T>(request: PoeRequests, payload?: any): Promise<T>;
}

export const apiService: ApiService = {
  send<T>(request: PoeRequests, payload: any): Promise<T> {
    const requestId = `${request}_${UUID()}`;
    const options: IpcRequest<T> = {
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
