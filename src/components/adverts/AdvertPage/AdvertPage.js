import React from 'react';
import { Redirect, useParams, useHistory } from 'react-router-dom';

import Layout from '../../layout';
import AdvertDetail from './AdvertDetail';
import { getAdvert, deleteAdvert } from '../../../api/adverts';
import usePromise from '../../../hooks/usePromise';
import { useSelector } from 'react-redux';
import { getAdvertState } from '../../../store/selectors/adverts';

function AdvertPage() {
  const { advertId } = useParams();
  const history = useHistory();
  // const { isPending: isLoading, error, execute, data: advert } = usePromise(
  const { isPending: isLoading, error, execute } = usePromise(

    null
  );
  
  const advert = useSelector(getAdvertState(advertId));

  // console.log(advertSelector);
  // React.useEffect(() => {
  //   execute(getAdvert(advertId));
  // }, [advertId]);

  const handleDelete = () => {
    execute(deleteAdvert(advertId)).then(() => history.push('/'));
  };

  if (error?.statusCode === 401) {
    return <Redirect to="/login" />;
  }

  if (error?.statusCode === 404) {
    return <Redirect to="/404" />;
  }

  // console.log('advert page')

  // console.log(advert)
  return (
    <Layout>
      {advert && <AdvertDetail {...advert} onDelete={handleDelete} />}
    </Layout>
  );
}

export default AdvertPage;
