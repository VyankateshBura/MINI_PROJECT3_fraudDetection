import React,{useState} from 'react'
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import axios from 'axios'
import { getData,setData } from '../../data/NewData';
import {useNavigate} from 'react-router-dom'
import Loading from '../../components/Loading';

const Uploadfile = () => {
    const[file,setFile] = useState(null)
    const [loading, setLoading] = useState(false);
    const [openMessage, setOpenMessage] = React.useState(false);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    let navigate = useNavigate();
    const handleclick = ()=>{
      setLoading(true);
      console.log("Clicked ")
      let formData = new FormData()
      // console.log(file)
      formData.append('csv_file',file);

      axios.post("http://127.0.0.1:8000/uploadfile/",formData).then((res)=>{
        // console.log(res);
        let obj1 = {
          "id":"Non Fraudlent",
          color:  tokens("dark").greenAccent[500],
          data:res.data.data[0]
        }
        let obj2 = {
          "id":"Fraudlent",
          color: tokens("dark").redAccent[600],
          data:res.data.data[1]
        }
        setData(obj1,obj2)
        console.log(getData());
        setLoading(false);
        console.log("Display message");
        setOpenMessage(true);
        navigate("/line");
      }).catch((err)=>{
        console.log(err);
      })

    }


    const handleCloseMessage = () => {
      setOpenMessage(false);
    };

    


  return (
    <>
    {loading? <Loading/>:
    <Box m="20px">
      {/* Pop-up message viewer */}
      {openMessage? <MessageViewer open={openMessage} onClose={handleCloseMessage} setOpenMessage={setOpenMessage} msg={"Files Processed Successfully!"}/>:""} 
      <Box sx={{
          marginTop: 2,
          display: 'flex',
          flexDirection: 'column',

        }}>
      <Header
        title="Prediction Analysis"
        subtitle="Upload file to get predictions"
      />
      <div>
      <Button variant="contained" component="label" color="primary">
        <br></br>
        <input type="file" onChange={(e)=>{setFile(e.target.files[0])}} />
      </Button>
      <Button variant="contained" onClick={handleclick} component="label" color="secondary">
        Generate Report
      </Button>
      </div>
        

      </Box>
     
    </Box>}
    </>
  )
}

export default Uploadfile