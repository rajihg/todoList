import React, { useState } from 'react';
import Tasks from './tasks/Tasks';
import { makeStyles, CssBaseline, createTheme, ThemeProvider } from '@material-ui/core';
import SideMenu from './components/SideMenu';
import Admin from './tasks/Admin';
import ScrollToBottomButton from './components/ScrollToBottom';
import OpenLayersMap from './components/OpenLayersMap';
import { TaskProvider  } from './tasks/TaskContext';

const theme = createTheme({
  palette: {
    primary: {
      main: "#333996",
      light: '#3c44b126'
    },
    secondary: {
      main: "#f83245",
      light: '#f8324526'
    },
    background: {
      default: "#f4f5fd"
    },
    undone: {
      main: "#a7a8a7",
      light: "333996"
    }
  },
  overrides: {
    MuiAppBar: {
      root: {
        transform: 'translateZ(0)'
      }
    }
  },
  props: {
    MuiIconButton: {
      disableRipple: true
    }
  }
})

const useStyles = makeStyles({
  appMain: {
    paddingLeft: '320px',
    width: '80%',
  }
})

const App = () => {
  const classes = useStyles();

  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (index) => {
    setSelectedTab(index);
  };

  return (
    <ThemeProvider theme = { theme }>
      <TaskProvider>
      <div className = { classes.appMain }>
        <SideMenu
          onTabChange = { handleTabChange }
        />
        { selectedTab == 0 ? <Tasks /> : <Admin /> }
        
        <ScrollToBottomButton />
      </div>
      </TaskProvider>
    </ThemeProvider>
  )
}

export default App;
