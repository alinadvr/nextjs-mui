"use client";

import { Pagination as MUIPagination, PaginationItem } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Pagination({
  count,
  defaultPage,
}: {
  count: number;
  defaultPage?: number;
}) {
  const [page, setPage] = useState(defaultPage ?? 1);

  useEffect(() => {
    setPage(defaultPage ?? 1);
  }, [defaultPage]);

  return (
    <MUIPagination
      count={count}
      page={page}
      variant="outlined"
      shape="rounded"
      sx={{ mx: "auto", width: "fit-content" }}
      onChange={(_, value) => setPage(value)}
      renderItem={(item) => (
        <PaginationItem
          component={Link}
          href={`/?page=${item.page}`}
          {...item}
        />
      )}
    />
  );
}
