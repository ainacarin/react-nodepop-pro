import React from 'react';
import { Redirect } from 'react-router-dom';

import Layout from '../../layout';
import FiltersForm from './FiltersForm';
import AdvertsList from './AdvertsList';
import EmptyList from './EmptyList';
import storage from '../../../utils/storage';
import { getAdverts } from '../../../api/adverts';
import { defaultFilters, filterAdverts } from './filters';
import usePromise from '../../../hooks/usePromise';
import { useDispatch, useSelector } from 'react-redux';
import { advertsLoaded } from '../../../store/actions/adverts';

const getFilters = () => storage.get('filters') || defaultFilters;
const saveFilters = filters => storage.set('filters', filters);

function AdvertsPage() {
  // const { isPending: isLoading, error, execute, data: adverts } = usePromise(
  const { isPending: isLoading, error, execute} = usePromise(

    []
  );
  const [filters, setFilters] = React.useState(getFilters);

    const dispatch = useDispatch();
    const adverts = useSelector(state => state.adverts);

    console.log('isloading',isLoading);
  React.useEffect(() => {
    console.log('useEffect');
    execute(getAdverts())
    .then(adverts => {
      dispatch(advertsLoaded(adverts));
    });
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
      {filteredAdverts.length ? (
        <AdvertsList adverts={filteredAdverts} />
      ) : (
        <EmptyList advertsCount={adverts.length} />
      )}
    </Layout>
  );
}

export default AdvertsPage;
