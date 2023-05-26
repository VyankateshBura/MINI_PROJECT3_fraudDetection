import * as React from 'react';
import { Box,IconButton,Button } from "@mui/material";
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import {useState,useEffect} from 'react'
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
// import Dropdown from 'muicss/lib/react/dropdown';
// import DropdownItem from 'muicss/lib/react/dropdown-item';
import Dropdown from "../dropdown/Dropdown"
// import DateTimePicker from "../DateTimePicker/DateTimePicker"
// import DateTimePicker from "@mui/lab/DateTimePicker";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";

import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import "./contacts.css"
const Contacts = () => {
  const theme = useTheme();
  const [startvalue, setStartValue] = React.useState(dayjs('2022-04-17T15:30'));
  const [endvalue, setEndValue] = React.useState(dayjs('2022-04-17T15:30'));
  const [startfinalvalue, setStartFinalValue] = React.useState(1681639200485 );
  const [endfinalvalue, setEndFinalValue] = React.useState(1681639200485);
  const colors = tokens(theme.palette.mode);
  const [totallogs, setTotallogs] = useState([])
  const [data, setData] = useState([])
  const [selection, setSelection] = useState("Select")
  const loggrp=false;
  const handleChange = (e)=>{
    console.log(e.target)
    // setSelection()
  }

  const makeempty=()=>{
    setTotallogs([]);
  }
  useEffect(()=>{
    let starttime= new Date(startvalue.$d)
    
    let startutcTime = new Date();

    startutcTime.setUTCHours(starttime.getUTCHours());
    startutcTime.setUTCMinutes(starttime.getUTCMinutes());
    startutcTime.setUTCSeconds(starttime.getUTCSeconds());
    // format the UTC time as an ISO 8601 string
    let formattedUtcTime = startutcTime.toISOString();
    setStartFinalValue(Date.parse(formattedUtcTime));
    // console.log("Here is the time ",starttime)

  },[startvalue])

  useEffect(()=>{
    
    let endtime= new Date(endvalue.$d)
    let endutcTime = new Date();

    endutcTime.setUTCHours(endtime.getUTCHours());
    endutcTime.setUTCMinutes(endtime.getUTCMinutes());
    endutcTime.setUTCSeconds(endtime.getUTCSeconds());
    let formatteUtcTime = endutcTime.toISOString();
    setEndFinalValue(Date.parse(formatteUtcTime))
    // console.log("Here is the time ",endtime)

  },[endvalue])
  useEffect(() => {
    let dt = []
    for (let index = 0; index < totallogs.length; index++) {
      const element = totallogs[index];
      dt.push({id:index,message:element.message,timestamp:element.timestamp})
      
    }
    setData(dt)
  
   
  }, [totallogs])
  

  const getlogs = (dt)=>{
    setTotallogs([...totallogs,...dt])
 
  }

  // console.log("Here is the data ",data)
  
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "timestamp", headerName: "TimeStamp" },
    {
      field: "message",
      headerName: "Message",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    // {
    //   field: "ingestionTime",
    //   headerName: "IngestionTime",
    //   type: "number",
    //   headerAlign: "left",
    //   align: "left",
    // },
    // {
    //   field: "phone",
    //   headerName: "Phone Number",
    //   flex: 1,
    // },
    // {
    //   field: "email",
    //   headerName: "Email",
    //   flex: 1,
    // },
    // {
    //   field: "address",
    //   headerName: "Address",
    //   flex: 1,
    // },
    // {
    //   field: "city",
    //   headerName: "City",
    //   flex: 1,
    // },
    // {
    //   field: "zipCode",
    //   headerName: "Zip Code",
    //   flex: 1,
    // },
  ];
  // console.log("Final values ",startfinalvalue,endfinalvalue);
  return (
    <Box m="20px">
      <Box sx={{
          marginTop: 2,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
      {/* <Header
        title="LOGS"
        subtitle="List of logs data from aws"
      /> */}

<Button />
      {/* <Typography variant="h4" m="20px" >
        Select the log Group
      </Typography> */}
      {loggrp?"":<Dropdown getlogs={getlogs} makeempty={makeempty} loggrp={loggrp}/>}
    
      </Box>


      {/* <DateTimePicker/> */}

      <LocalizationProvider dateAdapter={AdapterDayjs} >
      <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
      <div style={{ display: 'flex', flexDirection: 'row' ,width:"50%"}}>
        <DateTimePicker
          label="Start DateTime"
          value={startvalue}
          inputProps={{ style: { fontSize: 12 ,width:80} }}
          onChange={(newValue) => setStartValue(newValue)}
        />
        <DateTimePicker
          label="End DateTime"
          value={endvalue}
          inputProps={{ style: { fontSize: 12,width:80 } }}
          onChange={(newValue) => setEndValue(newValue)}
        />

      <Button style={{marginLeft:"10%",borderRadius:"10px",paddingLeft:"5%"}} variant="contained">Search
          <SearchIcon style={{margin:"10px"}}/>
          </Button>
        </div>
      </DemoContainer>
    </LocalizationProvider>
      
      
    

      {/* SEARCH BAR */}
      {/* <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box> */}


      

      <Box
        m="40px 0 0 0"
        
        height="75vh"
        sx={{
          fontSize:50,
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={data} 
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row.id}
          rowHeight={80} 
          getRowClassName={(params) => "font-size-36"} 
        />
      </Box>
    </Box>
  );
};

export default Contacts;
