import { loadRequestData } from 'services/firebase.service';
import { getCookie } from '@actions/auth-actions';
import RequestList from 'components/RequestList/RequestList';
import { RequestHistory } from '@types';

export default async function HistoryPage() {
  const userId = await getCookie('userUid');

  if (!userId) {
    return <div>Authentication required</div>;
  }

  const requests = await loadRequestData(userId);

  const validRequests: RequestHistory[] = Array.isArray(requests)
    ? requests
        .map((req) => {
          const timestamp =
            typeof req.timestamp === 'string'
              ? new Date(req.timestamp).getTime()
              : Number(req.timestamp);
          return {
            method: req.method,
            url: req.url,
            timestamp: isNaN(timestamp) ? Date.now() : timestamp,
            latency: Number(req.latency) || 0,
            status: Number(req.status) || 0,
            requestSize: Number(req.requestSize) || 0,
            responseSize: Number(req.responseSize) || 0,
            errorType: req.errorType ?? null,
          };
        })
        .filter(
          (req): req is RequestHistory =>
            typeof req.method === 'string' &&
            typeof req.url === 'string' &&
            typeof req.timestamp === 'number' &&
            typeof req.latency === 'number' &&
            typeof req.status === 'number' &&
            typeof req.requestSize === 'number' &&
            typeof req.responseSize === 'number' &&
            (req.errorType === null || typeof req.errorType === 'string')
        )
    : [];

  const sortedRequests = validRequests.sort(
    (a, b) => b.timestamp - a.timestamp
  );

  return <RequestList requests={sortedRequests} />;
}
