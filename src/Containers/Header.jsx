import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate } from "react-router-dom";
import { CryptoState } from '../CurrencyContext';
import { Container } from '@mui/system';



const Header = () => {

  const { currency, setCurrency } = CryptoState();

  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }} className=" h-20 pt-3">
      <AppBar color="transparent" position="static">
        <Container>
        <Toolbar>
          <Typography variant="h5"
           component="div"
            sx={{ flexGrow: 1 }}
             className="text-gold font-Montserrat font-bold z-40 cursor-pointer"
             onClick={()=>navigate('/')} >
            Crypto Tracker
          </Typography>
          <FormControl>
          <InputLabel id="demo-simple-select-label" className="text-gold z-50">Currency</InputLabel>
          <Select
            variant="outlined"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={currency}
            className="w-full mt-2 bg-gold"
            onChange={(e)=>setCurrency(e.target.value)}
          >
            <MenuItem value={"USD"}>USD</MenuItem>
            <MenuItem value={"INR"}>INR</MenuItem>
          </Select>
          </FormControl>
        </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

export default Header