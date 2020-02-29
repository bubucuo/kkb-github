import React from "react";
import {TransitionGroup, CSSTransition} from "react-transition-group";
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link,
//   Redirect,
//   useLocation,
//   useParams
// } from "react-router-dom";

import Route from "../k-react-router-dom/Route";
import Link from "../k-react-router-dom/Link";
import Switch from "../k-react-router-dom/Switch";
import Redirect from "../k-react-router-dom/Redirect";
import {useLocation, useParams} from "../k-react-router-dom/hooks";

export default function AnimationExample({location, match}) {
  return (
    <Switch>
      <Route exact path="/animation">
        <Redirect to="animation/hsl/10/90/50" />
      </Route>
      <Route path="/animation">
        <AnimationApp location={location} match={match} />
      </Route>
    </Switch>
  );
}

function AnimationApp({location}) {
  return (
    <div style={styles.fill}>
      <ul style={styles.nav}>
        <Link to="/animation/hsl/10/90/50">Red</Link>
        <Link to="/animation/hsl/120/100/40">Green</Link>
        <Link to="/animation/rgb/33/150/243">Blue</Link>
        <Link to="/animation/rgb/240/98/146">Pink</Link>
      </ul>

      <div style={styles.content}>
        <TransitionGroup>
          {/*
            This is no different than other usage of
            <CSSTransition>, just make sure to pass
            `location` to `Switch` so it can match
            the old location as it animates out.
          */}
          <CSSTransition key={location.key} classNames="fade" timeout={300}>
            <Switch location={location}>
              <Route path="/animation/hsl/:h/:s/:l" component={HSL} />
              <Route path="/animation/rgb/:r/:g/:b" component={RGB} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </div>
    </div>
  );
}

function HSL({match}) {
  let {h, s, l} = match.params; // useParams();

  return (
    <div
      style={{
        ...styles.fill,
        ...styles.hsl,
        background: `hsl(${h}, ${s}%, ${l}%)`
      }}>
      hsl({h}, {s}%, {l}%)
    </div>
  );
}

function RGB({match}) {
  let {r, g, b} = match.params; //useParams();
  return (
    <div
      style={{
        ...styles.fill,
        ...styles.rgb,
        background: `rgb(${r}, ${g}, ${b})`
      }}>
      rgb({r}, {g}, {b})
    </div>
  );
}

const styles = {};

styles.fill = {
  position: "absolute",
  left: 0,
  right: 0,
  top: "100px",
  bottom: 0
};

styles.content = {
  ...styles.fill,
  top: "40px",
  textAlign: "center"
};

styles.nav = {
  padding: 0,
  margin: 0,
  position: "absolute",
  top: 0,
  height: "40px",
  width: "100%",
  display: "flex"
};

styles.navItem = {
  textAlign: "center",
  flex: 1,
  listStyleType: "none",
  padding: "10px"
};

styles.hsl = {
  ...styles.fill,
  color: "white",
  paddingTop: "20px",
  fontSize: "30px"
};

styles.rgb = {
  ...styles.fill,
  color: "white",
  paddingTop: "20px",
  fontSize: "30px"
};
