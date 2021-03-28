import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Company from "./Company";
import Jobs from "./Jobs";
import EditJobs from "./EditJobs";
import ErrorPage from "./ErrorPage";
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
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
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
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: 224,
    border: "1px solid",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function AboutUs(props) {
  const myContext = useContext(AppContext);
  const history = useHistory();
  const classes = useStyles();
  const [value, setValue] = React.useState("/about");

  const handleChange = (event, newValue) => {
    if (newValue === "/about/jobs/edit") {
      if (myContext.isAuthenticated) {
        history.push(newValue);
        setValue(newValue);
      } else {
        history.push("/signin");
        myContext.updatePath("/signin");
      }
    } else {
      history.push(newValue);
      setValue(newValue);
    }
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="Company" value="/about/company" {...a11yProps(0)} />
        <Tab label="Jobs" value="/about/jobs" {...a11yProps(1)} />
        <Tab label="Edit Jobs" value="/about/jobs/edit" {...a11yProps(2)} />
      </Tabs>

      <TabPanel value={value} index="/about">
        <div>About US</div>
      </TabPanel>

      <TabPanel value={value} index="/about/company">
        <Company />
      </TabPanel>
      <TabPanel value={value} index="/about/jobs">
        <Jobs />
      </TabPanel>
      <TabPanel value={value} index="/about/jobs/edit">
        <EditJobs />
      </TabPanel>
    </div>
  );
}
