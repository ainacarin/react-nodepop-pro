import React from 'react';
import { Redirect } from 'react-router-dom';

import Layout from '../../layout';
import FiltersForm from './FiltersForm';
import AdvertsList from './AdvertsList';
import EmptyList from './EmptyList';
import storage from '../../../utils/storage';
import { defaultFilters, filterAdverts } from './filters';
import { useDispatch, useSelector } from 'react-redux';
import { advertsLoadAction } from '../../../store/actions/adverts';
import { getAdverts } from '../../../store/selectors/adverts';
import { getUi } from '../../../store/selectors/ui';
import { resetErrorAction } from '../../../store/actions/ui';

const getFilters = () => storage.get('filters') || defaultFilters;
const saveFilters = filters => storage.set('filters', filters);

function AdvertsPage() {

  const [filters, setFilters] = React.useState(getFilters);

    const dispatch = useDispatch();
    const adverts = useSelector(getAdverts);
    const { loading, error } = useSelector(getUi);
    
    const resetError = () => dispatch(resetErrorAction());

    console.log('isloading',loading);
  React.useEffect(() => {
    console.log('useEffect');
    dispatch( advertsLoadAction() );
 
  }, []);

  React.useEffect(() => {
    saveFilters(filters);
  }, [filters]);

  if (error?.statusCode === 401) {
    return <Redirect to="/login" />;
  }

  console.log('renderizes adverts page')
  const filteredAdverts = filterAdverts(adverts, filters);

  console.log(filteredAdverts)
  return (
    <Layout>
      {adverts.length > 0 && (
        <FiltersForm
          initialFilters={filters}
          defaultFilters={defaultFilters}
          prices={adverts.map(({ price }) => price)}
          onFilter={setFilters}
        />
      )}
      {loading && <div> Cargando... </div>}
      {error && (
        <div 
        // onClick={resetError} 
        style={{ color: 'red' }}>
          {error.message}
        </div>
      )}
      {!loading && !error && filteredAdverts.length && 
        <AdvertsList adverts={filteredAdverts} />
      }
      {!loading && !error && (filteredAdverts.length === 0) &&
        <EmptyList advertsCount={adverts.length} />
      }
    </Layout>
  );
}

export default AdvertsPage;
