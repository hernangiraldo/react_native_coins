import {useState, useEffect} from 'react';
import Http from '../../../libs/Http';
import {HttpStatus} from '../../../libs/HttpStatus';

export const useCoins = () => {
  const url = 'https://api.coinlore.net/api/tickers/';
  const [coins, setCoins] = useState();
  const [allCoins, setAllCoins] = useState();
  const [requestStatus, setRequestStatus] = useState(null);

  useEffect(() => {
    (async () => {
      const httpStatus = new HttpStatus();

      try {
        setRequestStatus(httpStatus.onLoading());

        const {data: coinsList} = await Http.instance.get(url);

        if (coinsList.length === 0) {
          setRequestStatus(httpStatus.onEmpty());
          return;
        }

        setCoins(coinsList);
        setAllCoins(coinsList);
        setRequestStatus(httpStatus.onSuccess());
      } catch (err) {
        setRequestStatus(httpStatus.onError());
      }
    })();
  }, []);

  return [coins, setCoins, allCoins, requestStatus];
};
