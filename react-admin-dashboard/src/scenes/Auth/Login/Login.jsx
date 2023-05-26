import  React,{useState} from 'react';
import { useTheme } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import axios from 'axios';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import LaptopIcon from '@mui/icons-material/Laptop';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { red,blue,indigo } from '@mui/material/colors';
import { ColorModeContext, tokens } from "../../../theme";
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import getUrl from "../../../getUrl"
import {useNavigate} from 'react-router-dom'
import Loading from '../../../components/Loading';

const Login = ({setLogin}) => {
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const url = getUrl();

  const navigate = useNavigate();
  function Copyright(props) {
      return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
          {'Copyright © '}
          <Link color="inherit" href="https://mui.com/">
            Your Website
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      );
    }

    const handleSubmit = (event) => {
        setLoading(true);
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // console.log({
        //   username: data.get('Username'),
        //   password: data.get('password'),
        // });
        let dt = {
          username: data.get('Username'),
          password: data.get('password'),
        }
        console.log(dt)
        axios.post(url+"api/token/",{
          "username":dt.username,
          "password":dt.password
        }).then((res)=>{
          console.log(res.data.access);
          localStorage.setItem("token",res.data.access)
          // localStorage.setItem("login",true);
          setLogin(true);
          setLoading(false);
          navigate("/dashboard")
        }).catch((err)=>{
          console.log(err);
          alert(" Invalid Credentials! Please check your username or password")
        })


      };
  return (
    <>
    {loading? <Loading/>:
    <ThemeProvider theme={theme}>
      
    <Container component="main" maxWidth="xs">
    
      <CssBaseline />
      
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* <Avatar sx={{ m: 1, bgcolor: indigo[50] }}>
          
        </Avatar> */}
        <LaptopIcon style={{fontSize:'180'}}/>
        <Typography component="h1" variant="h2" >
          CardSecure+
        </Typography>
        {/* <img src="./logmanager.png" alt="Image here"/> */}
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {/* <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid> */}
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="Username"
                required
                fullWidth
                id="Username"
                label="Username"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                
              >
              </TextField>
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
           Login
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/register" variant="body2" color="inherit">
                Create Account? Register
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 2 }} />
    </Container>
  </ThemeProvider>}
  </>
  )
}

export default Login