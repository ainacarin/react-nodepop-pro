import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { tagsLoadAction } from "../../../store/actions/tags";

import { getTags } from "../../../store/selectors/tags";
import { getUi } from "../../../store/selectors/ui";
import { CheckboxGroup } from "../../shared";

function SelectTags(props) {

  const tags = useSelector(getTags);
  const { loading, error } = useSelector(getUi);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(tagsLoadAction());
  }, [dispatch]);

  return (
    <>
      {loading && <div> Cargando tags... </div>}
      {error && (
        <div
          // onClick={resetError}
          style={{ color: "red" }}
        >
          {error.message}
        </div>
      )}
      {!loading && !error && <CheckboxGroup options={tags} {...props} />}
    </>
  );
}

export default SelectTags;
