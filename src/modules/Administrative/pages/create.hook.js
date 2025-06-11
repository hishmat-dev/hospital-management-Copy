import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useEntityActions = (basePath, deleteAction, fetchAction) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });

  // Fetch entities on mount
  useEffect(() => {
    if (fetchAction) {
      dispatch(fetchAction());
    }
  }, [dispatch, fetchAction]);

  // Only update pagination total if it has changed
  const updatePaginationTotal = (total) => {
    setPagination((prev) => {
      if (prev.total !== total) {
        return { ...prev, total };
      }
      return prev;
    });
  };

  const handleView = (item) => {
    navigate(`/admin/${basePath}/view/${item.id}`);
  };

  const handleEdit = (item) => {
    navigate(`/admin/${basePath}/edit/${item.id}`);
  };

  const handleCreate = () => {
    navigate(`/admin/${basePath}/create`);
  };

  const handleDelete = async (id) => {
    if (window.confirm(`Are you sure you want to delete this ${basePath.slice(0, -1)}?`)) {
      await dispatch(deleteAction(id));
    }
  };

  const handlePageChange = (page) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  const handleLimitChange = (limit) => {
    setPagination((prev) => ({ ...prev, limit, page: 1 }));
  };

  const filterEntities = (entities, searchKey = "name") => {
    return entities.filter((entity) =>
      entity[searchKey].toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return {
    searchTerm,
    setSearchTerm,
    pagination,
    handleView,
    handleEdit,
    handleDelete,
    handleCreate,
    handlePageChange,
    handleLimitChange,
    filterEntities,
    updatePaginationTotal,
  };
};