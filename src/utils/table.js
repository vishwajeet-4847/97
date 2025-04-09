export const filterData = (data, searchQuery) => {
    if (!searchQuery) return data;

    return data.filter((item) =>
      Object.values(item).some(
        (val) =>
          val &&
          val.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  };

export  const sortData = (data, field, direction) => {
    return [...data].sort((a, b) => {
      const aValue = a[field] ?? "";
      const bValue = b[field] ?? "";

      if (typeof aValue === "string") {
        return direction === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else {
        return direction === "asc" ? aValue - bValue : bValue - aValue;
      }
    });
  };

  export const paginateData = (data, page, perPage) => {
    const startIndex = (page - 1) * perPage;
    const paginatedData = data.slice(startIndex, startIndex + perPage);
    const totalPages = Math.ceil(data.length / perPage);
    return { paginatedData, totalPages };
  };
  
 