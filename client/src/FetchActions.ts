import { APP_API_BASE_URL } from './configs';
import { Message } from './types';

export const getRequest = (
  url: string,
  onSuccess: Function,
  abortController?: AbortController,
  onError = (statusCode?: Number, statusText?: string) => {},
) => {
  // best practice for fetching is to allow fetches to be aborted, in case props change while a fetch is in progress
  const options = abortController ? { signal: abortController.signal } : {};
  fetch(url, options)
    .then((resp) => {
      if (!resp.ok) {
        onError(resp.status, resp.statusText);
      } else {
        return resp.json();
      }
    })
    .then((data) => onSuccess(data))
    .catch((e) => {
      if (e.name === 'AbortError') {
        // usually, this abort is intentional due to a change in props
        console.log('fetch aborted');
      } else {
        onError();
      }
    });
};

export const patchRequest = (
  url: string,
  body: any,
  onSuccess: Function,
  abortController?: AbortController,
  onError = (statusCode?: Number, statusText?: string) => {},
) => {
  let options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    signal: abortController?.signal,
    body: JSON.stringify(body),
  };
  fetch(url, options)
    .then((resp) => {
      if (!resp.ok) {
        onError(resp.status, resp.statusText);
      } else {
        return resp.json();
      }
    })
    .then((data) => onSuccess(data))
    .catch((e) => {
      if (e.name === 'AbortError') {
        // usually, this abort is intentional due to a change in props
        console.log('fetch aborted');
      } else {
        onError();
      }
    });
};
// best practice for fetching is to allow fetches to be aborted, in case props change while a fetch is in progress

export const fetchNeeds = (
  limit: string,
  offset: string,
  onSuccess: Function,
  abortController?: AbortController,
  onError = (statusCode?: Number, statusText?: string) => {},
) => {
  const assetsApiRequest = new URL(`${APP_API_BASE_URL}/assets`);
  assetsApiRequest.searchParams.append('type', 'request');
  assetsApiRequest.searchParams.append('limit', limit);
  assetsApiRequest.searchParams.append('offset', offset);
  getRequest(assetsApiRequest.href + assetsApiRequest.hash, onSuccess, abortController, onError);
};

export const fetchDonations = (
  limit: string,
  offset: string,
  onSuccess: Function,
  abortController?: AbortController,
  onError = (statusCode?: Number, statusText?: string) => {},
) => {
  const assetsApiRequest = new URL(`${APP_API_BASE_URL}/assets`);
  assetsApiRequest.searchParams.append('type', 'donation');
  assetsApiRequest.searchParams.append('limit', limit);
  assetsApiRequest.searchParams.append('offset', offset);

  getRequest(assetsApiRequest.href + assetsApiRequest.hash, onSuccess, abortController, onError);
};

export const fetchInbox = (
  onSuccess: Function,
  abortController?: AbortController,
  onError = (statusCode?: Number, statusText?: string) => {},
) => {
  const assetsApiRequest = new URL(`${APP_API_BASE_URL}/transactions/inbox`);
  getRequest(assetsApiRequest.href + assetsApiRequest.hash, onSuccess, abortController, onError);
};

export const updateMessage = (
  messageBody: Message,
  onSuccess: Function,
  onError = (statusCode?: Number, statusText?: string) => {},
) => {
  const messageApiRequest = new URL(`${APP_API_BASE_URL}/messages/${messageBody.id}`);
  patchRequest(messageApiRequest.href, messageBody, onSuccess, new AbortController(), () => {});
};
