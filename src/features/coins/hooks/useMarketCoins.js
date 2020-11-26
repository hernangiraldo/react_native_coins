import {useState, useEffect} from 'react';
import Http from '../../../libs/Http';
import {HttpStatus} from '../../../libs/HttpStatus';

export const useMarketsCoins = (coinId) => {
  const [marketsCoin, setMarketsCoin] = useState();
  const [requestStatus, setRequestStatus] = useState(null);

  useEffect(() => {
    (async () => {
      const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`;
      const httpStatus = new HttpStatus();

      try {
        setRequestStatus(httpStatus.onLoading());

        const markets = await Http.instance.get(url);
        setMarketsCoin(markets);

        setRequestStatus(httpStatus.onSuccess());
      } catch (err) {
        setRequestStatus(httpStatus.onError());
      }
    })();
  }, [coinId]);

  return [marketsCoin, requestStatus];
};
