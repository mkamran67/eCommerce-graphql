import RequestReset from '../components/RequestReset';
import Reset from '../components/Reset';

export default function ResetPage({ query }) {
  if (!query?.token) {
    return (
      <>
        <p>Hey! You don't have a token try try this...</p>
        <RequestReset />
      </>
    );
  }
  return (
    <div>
      <Reset />
    </div>
  );
}
