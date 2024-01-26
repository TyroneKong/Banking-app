import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import Sidebar from 'app/components/sidebar/sidebar';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';

function Dashboard() {
  return (
    // <CircularProgress size="200px" value={40} color="green.400">
    //   <CircularProgressLabel>40%</CircularProgressLabel>
    // </CircularProgress>
    <>
      <Sidebar />

      <Grid
        ml={40}
        mt={10}
        templateAreas={`"header header"
                  "nav main"
                  "nav main"
                  "nav2 main2"
                  "nav2 main2"
        

                  `}
        gridTemplateRows="100px"
        gridTemplateColumns="100rem "
        h="100rem"
        gap="20px"
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem borderRadius={10} pl="2" bg="#1A1C29" area="header">
          Header
        </GridItem>
        <GridItem borderRadius={10} pl="2" bg="#1A1C29" area="nav">
          <CircularProgress size="300px" value={40} color="pink.400">
            <CircularProgressLabel fontSize={60} color="white">$1000</CircularProgressLabel>
          </CircularProgress>
        </GridItem>
        <GridItem
          borderRadius={10}
          pl="2"
          bg="#1A1C29"
          area="main"
        />
        <GridItem borderRadius={10} pl="2" bg="#1A1C29" area="nav2">
          Nav2
        </GridItem>
        <GridItem borderRadius={10} pl="2" bg="#1A1C29" area="main2">
          <CircularProgress size="200px" value={40} color="green.400">
            <CircularProgressLabel>40%</CircularProgressLabel>
          </CircularProgress>
        </GridItem>
        {' '}
        <GridItem borderRadius={10} pl="2" bg="#1A1C29" area="nav2">
          Nav3
        </GridItem>
        <GridItem borderRadius={10} pl="2" bg="#1A1C29" area="main">
          Main
        </GridItem>
      </Grid>
    </>
  );
}

export default Dashboard;
