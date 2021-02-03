import React, { useState, useEffect } from "react";

import { Box, Button, Container, Typography } from "@material-ui/core";
import swal from "sweetalert";
import {
  makeStyles,
  createMuiTheme,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import MUIDataTable from "mui-datatables";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const getMuiTheme = () =>
  createMuiTheme({
    overrides: {
      MUIDataTableBodyCell: {
        root: {
          // backgroundColor: '#FFFFFE',
          border: "3",
          fontSize: "11pt",
          fontWeight: "400",
          fontFamily: "Franklin Gothic Book",
        },
      },
    },
  });

const AppRelationManagement = () => {
  const classes = useStyles();
  const [dataList, setdataList] = useState(undefined);

  ///MUI Table----------------------
  const columns_Approved = [
    {
      name: "appId",
      label: "Id",
      options: {
        filter: true,
        sort: true,
        display: false,
        setCellHeaderProps: (value) => ({
          style: {
            textAlign: "center",
            position: "inherit",
          },
        }),
      },
    },
    {
      name: "appName",
      label: "Application Names",
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: (value) => ({
          style: {
            position: "inherit",
            textAlign: "center",
          },
        }),
        responsive: "simple",
        customBodyRender: (val, tableMeta) => {
          return tableMeta.rowData[1] + "-" + tableMeta.rowData[0];
        },
      },
    },
  ];
  const options = {
    selectableRows: "single",
    selectableRowsHideCheckboxes: true,
    rowHover: true,
    selectableRowsOnClick: false,
    filter: true,
    // textAlign: 'center',
    filterType: "dropdown",
    rowsPerPage: 5,
    pagination: true,
    responsive: true,
    maxHeight: "none",
    enableNestedDataAccess: ".",
    tableBodyHeight: "auto",
    tableBodyMaxHeight: "auto",
    print: false,
    filter: false,
    //viewColumns: false,
    rowsPerPageOptions: false,
    customToolbarSelect: (selectedRows, displayData, setSelectedRows) => {},
    disableToolbarSelect: true,
  };
  const dataStateOptions = () => {
    if (dataList === undefined) {
      const message = {
        textLabels: {
          body: {
            noMatch: "Sorry, no matching records found",
          },
        },
      };
      return { ...options, ...message };
    } else if (dataList.length === 0) {
      const message = {
        textLabels: {
          body: {
            noMatch: "Collecting data..",
          },
        },
      };
      return { ...options, ...message };
    } else {
      return options;
    }
  };
  ///----------------------

  return (
    <React.Fragment>
      <Container style={{ padding: 0 }}>
        <MuiThemeProvider theme={getMuiTheme()}>
          <MUIDataTable
            title={"Manage application access"}
            data={dataList}
            columns={columns_Approved}
            options={dataStateOptions()}
          />
        </MuiThemeProvider>
      </Container>
    </React.Fragment>
  );
};

export default AppRelationManagement;
