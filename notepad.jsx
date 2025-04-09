if (format === "sportname") {
    return (
      <span
        onClick={() => navigate(?m=${row?.sportname})}
        className={`px-2 py-1 text-xs cursor-pointer rounded text-blue-500 `}
      >
        {value}
      </span>
    );
  }
  if (format === "eventname") {
    console.log(row);

    return (
      <span
        onClick={() => navigate(?m=${row?.sportname}&e=${row?.eventname})}
        className={`px-2 py-1 text-xs cursor-pointer rounded text-blue-500 `}
      >
        {value}
      </span>
    );
  }
  if (format === "marketname") {
    return (
      <span
        onClick={() =>
          navigate(
            ?m=${row?.sportname}&e=${row?.eventname}&ma=${row.marketname}
          )
        }
        className={`px-2 py-1 text-xs cursor-pointer rounded text-blue-500 `}
      >
        {value}
      </span>
    );
  }
  if (format === "bettype") {
    return (
      <span
        className={`px-2 py-1 ${
          value < 0 ? " text-red-500" : ""
        }  text-black font-semibold  text-xs  rounded  `}
      >
        {value}
      </span>
    );
  }