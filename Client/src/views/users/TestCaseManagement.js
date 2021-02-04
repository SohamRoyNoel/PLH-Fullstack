import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from "@material-ui/core";
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
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

const TestCaseManagement = () => {
  const classes = useStyles();
  const [appName, setappName] = useState("");
  const [mapper, setmapper] = useState("");
  const [name, setName] = React.useState("");
  const [dataList, setdataList] = useState(undefined);

  const handleValueChange = (event) => {
    setappName(event.target.value);
  };
  const handleChange = (event) => {
    setName(event.target.value);
  };
  function handleSubmit() {}

  const getAppDD = () => {
    // appQuery()
    //   .then((data) => {
    //     if (data !== undefined && data.status < 205 && data.data.length > 0) {
    //       const list = data.data.map((val) => (
    //         <MenuItem key={val.id} value={val.id}>
    //           {" "}
    //           {val.name}{" "}
    //         </MenuItem>
    //       ));
    //       setmapper(list);
    //     } else {
    //       const item = (
    //         <MenuItem key={-1} value={-1}>
    //           {"No Data"}
    //         </MenuItem>
    //       );
    //       setmapper(item);
    //     }
    //   })
    //   .catch((err) => {
    //     const item = (
    //       <MenuItem key={-1} value={-1}>
    //         {"No Data"}
    //       </MenuItem>
    //     );
    //     setmapper(item);
    //   });
  };

  useEffect(() => {
    getAppDD();
  }, []);

  const columns = [
    {
      name: "id",
      label: "Id",
      options: {
        filter: true,
        sort: true,
        display: true,
        setCellHeaderProps: (value) => ({
          style: {
            textAlign: "center",
            position: "inherit",
          },
        }),
      },
    },
    {
      name: "tSName",
      label: "Scenario Names",
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

  return (
    <React.Fragment>
      <div>
        <div style={{ width: "50%" }}>
          <h3>{"Add Test Scenarios"}</h3>
          <Container
            style={{
              background: "white",
              padding: 2,
              width: "87%",
              float: "left",
              borderRadius: 5,
              boxShadow:
                "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
            }}
          >
            <FormControl required className={classes.formControl}>
              <InputLabel>Applications</InputLabel>
              <Select
                labelId="portId-select-label"
                value={appName}
                fullWidth
                onClick={handleValueChange}
                className={classes.selectEmpty}
                style={{ minWidth: 500 }}
              >
                {mapper}
              </Select>
            </FormControl>
            <br />
            <TextField
              required
              id="standard-required"
              label="Test Scenario Name"
              value={name}
              onChange={handleChange}
              style={{ minWidth: 500, margin: "8px" }}
            />
            <Button
              onClick={handleSubmit}
              color="primary"
              variant="contained"
              size="medium"
              style={{ float: "right", margin: 3, marginRight: 20 }}
            >
              Add
            </Button>
          </Container>
        </div>
        <div style={{ width: "50%" }}></div>
      </div>
      <div style={{ marginTop: "13rem" }}>
        <MuiThemeProvider theme={getMuiTheme()}>
          <MUIDataTable
            title={"Test scenario List"}
            data={dataList}
            columns={columns}
            options={dataStateOptions()}
          />
        </MuiThemeProvider>
      </div>
    </React.Fragment>
  );
};

export default TestCaseManagement;
