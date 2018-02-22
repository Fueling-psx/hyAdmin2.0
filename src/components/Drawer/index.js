import Drawer from 'material-ui/Drawer';
import React from 'react';
import { withStyles } from 'material-ui/styles';


const styles = theme => ({
  container: {
    minWidth: '800px'
  }
});

class UI extends React.Component {
  render() {
    const { classes , open, children, anchor} = this.props;
    return (
      <div>
        <Drawer anchor={anchor} open={open}>
          <div className={classes.container}>
            {children}
          </div>
        </Drawer>
      </div>
    );
  }
}

export default withStyles(styles)(UI)
