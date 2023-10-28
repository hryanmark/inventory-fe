import { Card } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export default function TableData({handleSelectionModelChange, data, columns}) {
  return (
    <Card sx={{ marginTop: "15px" }}>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={data}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          onRowSelectionModelChange={(ids) => {
            handleSelectionModelChange(ids);
          }}
          sx={{
            fontSize: "13px",
          }}
        />
      </div>
    </Card>
  );
}
