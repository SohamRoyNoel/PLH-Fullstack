import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  AppBar,
  Tabs,
  Tab,
} from "@material-ui/core";
import swal from "sweetalert";
import {
  makeStyles,
  createMuiTheme,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import MUIDataTable from "mui-datatables";
import GET_APP_LIST_WHERE_USER_HAS_PENDING_REQUEST from "../../graphql/getUserHasPendingRequest.graphql";
import { useQuery } from "@apollo/client";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));
function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}
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

export default function AppManagement() {
  const classes = useStyles();
  const [value, setValue] = useState("Access Required");
  const [dataList, setdataList] = useState(undefined);
  const { loading, error, data } = useQuery(
    GET_APP_LIST_WHERE_USER_HAS_PENDING_REQUEST, { errorPolicy: 'all' }
  );
  console.log("data: ", error);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  ///MUI Table----------------------
  const columns_Pending = [
    {
      name: "Request_ID",
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
      name: "Request_App_Name",
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
      <Container style={{}}>
        <Formik
          initialValues={{
            AppName: "",
          }}
          validationSchema={Yup.object().shape({
            AppName: Yup.string().max(255),
          })}
          onSubmit={(event) => {
            // var resp = apiDataReturner(event);
            // const promise = new Promise((resolve, reject) => {
            //   setTimeout(() => {
            //     resolve(resp);
            //   }, 100);
            // });
            // promise.then((values) => {
            //   // console.log("Data : " + JSON.stringify(values));
            //   if (values !== undefined) {
            //     //var data =  JSON.stringify(values);
            //     //console.log("Datas : " + values.data.message);
            //     if (values.data.success) {
            //       swal("Added", "App name added", "success");
            //     } else {
            //       swal("Error", "Try Again", "error");
            //     }
            //   }
            // });
          }}
        >
          {({ errors, handleSubmit, isSubmitting, values, touched }) => (
            <form onSubmit={handleSubmit}>
              <Box>
                <Typography color="textPrimary" variant="h5">
                  Add new application
                </Typography>
                <TextField
                  error={Boolean(touched.AppName && errors.AppName)}
                  helperText={touched.AppName && errors.AppName}
                  label="Application Name"
                  margin="normal"
                  name="AppName"
                  variant="outlined"
                  style={{
                    float: "left",
                    width: "90%",
                    background: "white",
                    // border: ".5px solid",
                    // borderRadius: 5,
                  }}
                />

                <Button
                  color="primary"
                  disabled={isSubmitting}
                  size="large"
                  type="submit"
                  variant="contained"
                  style={{
                    float: "left",
                    marginTop: "23px",
                    marginLeft: "20px",
                  }}
                >
                  Add
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Container>
      <br></br>
      <Container style={{ padding: 0, paddingTop: 70 }}>
        <AppBar position="static" color="ghostwhite">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Required" {...a11yProps(0)} />
            <Tab label="Pending" {...a11yProps(1)} />
            <Tab label="Approved / Rejected" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <MuiThemeProvider theme={getMuiTheme()}>
            <MUIDataTable
              title={"Access required from admin"}
              data={dataList}
              columns={undefined}
              options={dataStateOptions()}
            />
          </MuiThemeProvider>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <MuiThemeProvider theme={getMuiTheme()}>
            <MUIDataTable
              title={"Access pending from admin"}
              data={dataList}
              columns={columns_Pending}
              options={dataStateOptions()}
            />
          </MuiThemeProvider>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <MuiThemeProvider theme={getMuiTheme()}>
            <MUIDataTable
              title={"Access approved or rejected"}
              data={dataList}
              columns={undefined}
              options={dataStateOptions()}
            />
          </MuiThemeProvider>
        </TabPanel>
      </Container>
    </React.Fragment>
  );
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Typography>{children}</Typography>}
    </div>
  );
}
