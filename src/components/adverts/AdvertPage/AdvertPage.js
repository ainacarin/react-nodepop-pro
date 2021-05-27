import React from 'react';
import { Redirect, useParams } from 'react-router-dom';

import Layout from '../../layout';
import AdvertDetail from './AdvertDetail';
import { useDispatch, useSelector } from 'react-redux';
import { getAdvertState } from '../../../store/selectors/adverts';
import { advertDeleteAction, advertDetailAction } from '../../../store/actions/adverts';
import { getUi } from '../../../store/selectors/ui';

function AdvertPage() {
  const { advertId } = useParams();

  const dispatch = useDispatch();
  const { error:errorS, loading } = useSelector(getUi);


    const advert = useSelector(getAdvertState(advertId));
  
  React.useEffect(() => {
      dispatch( advertDetailAction(advertId) )
    },[advertId, dispatch]);

 
  const handleDelete = () => {
    dispatch( advertDeleteAction(advertId) )
  };

  if (errorS?.statusCode === 401) {
    return <Redirect to="/login" />;
  }

  if (errorS?.statusCode === 404) {
    return <Redirect to="/404" />;
  }


  return (
    <Layout>
      {loading && <div> Cargando anuncio... </div>}
      {errorS && (
        <div
          // onClick={resetError}
          style={{ color: "red" }}
        >
          {errorS.message}
        </div>
      )}
      {!loading && !errorS && advert && <AdvertDetail {...advert} onDelete={handleDelete} />}
    </Layout>
  );
}

export default AdvertPage;
