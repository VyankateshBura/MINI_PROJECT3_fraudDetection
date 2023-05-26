import * as React from 'react';
import {useState,useEffect} from 'react';
import axios from 'axios'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import getUrl from "../../getUrl"
// const options = ['Create a merge commit', 'Squash and merge', 'Rebase and merge'];

export default function Dropdown({getlogs,makeempty,loggrp}) {
  const [options,setOptions] = React.useState(['Select log Group']);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [mylogs, setmylogs] = useState([]);

  const url = getUrl();

  const fetchlogs = (ls)=>{
    
    var bodyFormData = new FormData();
    bodyFormData.append('logGroupName', options[selectedIndex]);
    bodyFormData.append('logStreamName', ls);
    
    axios
      .post(url+'log_events',bodyFormData)
      .then(function (response) {
        console.log(response.data);
        // let dt = JSON.parse(response.data);
        // let mydt = JSON.parse(response.data);
        // console.log("Logs",response.data);
        setmylogs([...mylogs,...response.data])
        getlogs(response.data);
        // for(let x=0;x<mydt.logStreams.length;x++){
        //     console.log(mydt.logStreams[x].logStreamName)
        // }

        // setdata(dt);
      })
      .catch(function (error) {
        console.error(error);
      });
  }
  const fetchlogsstream = ()=>{
    // setloading(true);
    setmylogs([]);
    makeempty();
    var bodyFormData = new FormData();
    bodyFormData.append('logGroupName', options[selectedIndex]);

    axios
      .post(url+'logs_stream',bodyFormData)
      .then(function (response) {
        // console.log(response.data);
        // let dt = JSON.parse(response.data);
        let mydt = JSON.parse(response.data);
        console.log("Log Streams",mydt.logStreams[0].logStreamName);
        for(let x=0;x<1;x++){
            // console.log(mydt.logStreams[x].logStreamName)
            fetchlogs(mydt.logStreams[x].logStreamName)
        }

        
        // setloading(false);
        // setdata(dt);
      })
      .catch(function (error) {
        console.error(error);
      });
  }





  useEffect(() => {
    // const axios = require("axios");
    // console.log("Station name:", station);
    setOptions(['Select log group']);
    const options = {
      method: "GET",
      url: "http://54.244.176.36/log_grps",
    };
     axios
      .get(url+"log_grps")
      .then(function (response) {
        let val1 = JSON.parse(response.data)
        // console.log("Response",val1.logGroups);
        let arr = []
        for (const [key, value] of Object.entries(val1.logGroups)) {
          arr.push(value.logGroupName);
        
        }
        setOptions([...arr]);
        // loggrp=true;
        
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);


  const handleClick = () => {
    console.log(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
    console.log("Toggled")
    fetchlogsstream();
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
    
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
    
  };

console.log(selectedIndex);
  return (
    <React.Fragment>
      <ButtonGroup m="30px" variant="contained" ref={anchorRef} aria-label="split button">
        <Button onClick={handleClick}>{options[selectedIndex]}</Button>
        <Button
          size="small"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={index}
                      disabled={index === 2}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
}
