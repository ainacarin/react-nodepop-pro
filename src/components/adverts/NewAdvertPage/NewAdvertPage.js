import React from 'react';
import { Redirect } from 'react-router-dom';

import Layout from '../../layout';
import NewAdvertForm from './NewAdvertForm';
import { getUi } from '../../../store/selectors/ui';
import { useDispatch, useSelector } from 'react-redux';
import { advertCreateAction } from '../../../store/actions/adverts';

function NewAdvertPage() {

  const [createdAdvert, setCreatedAdvert] = React.useState(null);
  const dispatch = useDispatch();
  const { loading, error } = useSelector(getUi);

  const handleSubmit = async newAdvert => {
    const advert = await dispatch(advertCreateAction(newAdvert));
    setCreatedAdvert(advert);
  }

  if (error && error?.status === 401) {
    return <Redirect to="/login" />;
  }

  if (createdAdvert) {
    return <Redirect to={`/adverts/${createdAdvert.id}`} />;
  }

  return (
    <Layout>
      {loading && <div> Creando anuncio... </div>}
      {error && (
        <div 
        // onClick={resetError} 
        style={{ color: 'red' }}>
          Error al crear anuncio.  {error.message}
        </div>
      )}
      {!loading && !error && <NewAdvertForm onSubmit={handleSubmit} />}
    </Layout>
  );
}


export default NewAdvertPage;
