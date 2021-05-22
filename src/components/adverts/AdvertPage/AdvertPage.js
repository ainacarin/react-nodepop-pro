import React, { useState } from 'react';
import { Redirect, useParams, useHistory } from 'react-router-dom';

import Layout from '../../layout';
import AdvertDetail from './AdvertDetail';
import { getAdvert, deleteAdvert } from '../../../api/adverts';
import usePromise from '../../../hooks/usePromise';
import { useDispatch, useSelector } from 'react-redux';
import { getAdvertState } from '../../../store/selectors/adverts';
import { advertDetailAction } from '../../../store/actions/adverts';

function AdvertPage() {
  const { advertId } = useParams();

  console.log('on advert page advertid', advertId)
  const history = useHistory();
  // const { isPending: isLoading, error, execute, data: advert } = usePromise(
  const { isPending: isLoading, error, execute } = usePromise(

    null
  );
  const [ advert, setAdvert ] = useState(null);

  // const advert = useSelector(getAdvertState(advertId));

  console.log('advert page', advert);
  const dispatch = useDispatch();

  // React.useEffect(() => {
  //   execute(getAdvert(advertId));
  // }, [advertId]);

  if(!advert){
    console.log('!advert')
    dispatch( advertDetailAction(advertId) )
    .then(setAdvert);
  }
    // React.useEffect(() => {
    //   console.log('advert page useEffect')
    //   dispatch( advertDetailAction(advertId) )
    //   .then(setAdvert);
    // },[advertId])

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
