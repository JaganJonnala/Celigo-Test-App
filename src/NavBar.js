import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import AppContext from "./context";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    flexGrow: 0.2,
    marginTop: "5px",
    fontSize: "25px",
  },
  nav: {
    display: "flex",
  },
  logo: {
    cursor: "pointer",
    marginLeft: "40px",
    marginRight: "60px",
  },
}));

export default function NavBar(props) {
  const myContext = useContext(AppContext);
  let history = useHistory();
  const classes = useStyles();
  //const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    console.log("dasf", newValue);

    history.push(newValue);
    myContext.updatePath(history.location.pathname);
  };

  const handleLogoClick = () => {
    history.push("/home");
    myContext.updatePath("/home");
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <div className={classes.nav}>
          <div
            className={classes.logo}
            title="company logo"
            onClick={() => handleLogoClick()}
          >
            <Typography variant="h6" className={classes.title}>
              Logo
            </Typography>
          </div>
          <Tabs
            value={myContext.navPath || "/home"}
            onChange={handleChange}
            aria-label="nav tabs example"
          >
            <Tab label="Home" value="/home" {...a11yProps(0)} />
            <Tab label="SignIn" value="/signin" {...a11yProps(1)} />
            <Tab label="About" value="/about" {...a11yProps(2)} />
          </Tabs>
        </div>
      </AppBar>
      {/* <TabPanel value={value} index={0}>
        <Link to="/home" />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Page Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Page Three
      </TabPanel> */}
    </div>
  );
}
