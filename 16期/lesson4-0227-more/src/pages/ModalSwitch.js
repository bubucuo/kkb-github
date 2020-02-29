import React from "react";
// import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Route from "../k-react-router-dom/Route";
import Link from "../k-react-router-dom/Link";
import Switch from "../k-react-router-dom/Switch";

// 这个例子展示给了我们怎样在同一个url下去render两个不用的页面，或者说是不同的context下的相同的页面
// This example shows how to render two different screens
// (or the same screen in a different context) at the same url,
// depending on how you got there.
//
// 点击
// Click the colors and see them full screen, then "visit the
// gallery" and click on the colors. Note the URL and the component
// are the same as before but now we see them inside a modal
// on top of the old screen.

class ModalSwitch extends React.Component {
  // 我们可以传递一个location给<Switch/>，让它忽略当前location而只是使用我们传的这个location
  //
  // 我们也可以使用"location state"来告诉app用户想要去一个地址为/img/2的modal，而不是在一个主页面，
  // 同时显示这个modal的时候，gallery页面在modal底部依然是可见的
  //
  // 一般来说，`/img/2`不会和gallery的`/`匹配
  // 因此，为了让两个页面都去render， 我们可以保留老的location，
  // 并且把它传值给Switch，这样它就会认为地址依然是`/img/2`

  previousLocation = this.props.location;

  componentWillUpdate(nextProps) {
    const {location} = this.props;
    // set previousLocation if props.location is not modal
    if (
      nextProps.history.action !== "POP" &&
      (!location.state || !location.state.modal)
    ) {
      this.previousLocation = this.props.location;
    }
  }

  render() {
    const {location} = this.props;
    const isModal = !!(
      location.state &&
      location.state.modal &&
      this.previousLocation !== location
    ); // not initial render
    console.log("modal", isModal, this.previousLocation, location); //sy-log
    return (
      <div>
        <Switch location={isModal ? this.previousLocation : location}>
          <Route exact path="/modalswicth" component={Home} />
          <Route path="/modalswicth/gallery" component={Gallery} />
          <Route path="/modalswicth/img/:id" component={ImageView} />
        </Switch>
        {isModal ? (
          <Route path="/modalswicth/img/:id" component={Modal} />
        ) : null}
      </div>
    );
  }
}

const IMAGES = [
  {id: 0, title: "Dark Orchid", color: "DarkOrchid"},
  {id: 1, title: "Lime Green", color: "LimeGreen"},
  {id: 2, title: "Tomato", color: "Tomato"},
  {id: 3, title: "Seven Ate Nine", color: "#789"},
  {id: 4, title: "Crimson", color: "Crimson"}
];

const Thumbnail = ({color}) => (
  <div
    style={{
      width: 50,
      height: 50,
      background: color
    }}>
    Thumbnail
  </div>
);

const Image = ({color}) => (
  <div
    style={{
      width: "100%",
      height: 400,
      background: color
    }}
  />
);

const Home = () => (
  <div>
    <Link to="/modalswicth/gallery">Visit the Gallery</Link>
    <h2>Featured Images</h2>
    <ul>
      <li>
        <Link to="/modalswicth/img/2">Tomato</Link>
      </li>
      <li>
        <Link to="/modalswicth/img/4">Crimson</Link>
      </li>
    </ul>
  </div>
);

const Gallery = () => (
  <div>
    {IMAGES.map(i => (
      <Link
        key={i.id}
        to={{
          pathname: `/modalswicth/img/${i.id}`,
          // this is the trick!
          state: {modal: true}
        }}>
        <Thumbnail color={i.color} />
        <p>{i.title}</p>
      </Link>
    ))}
  </div>
);

const ImageView = ({match}) => {
  const image = IMAGES[parseInt(match.params.id, 10)];
  if (!image) {
    return <div>Image not found</div>;
  }

  return (
    <div>
      <h1>{image.title}</h1>
      <Image color={image.color} />
    </div>
  );
};

const Modal = ({match, history}) => {
  const image = IMAGES[parseInt(match.params.id, 10)];
  if (!image) {
    return null;
  }
  const back = e => {
    e.stopPropagation();
    history.goBack();
  };
  return (
    <div
      onClick={back}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        background: "rgba(0, 0, 0, 0.15)"
      }}>
      <div
        className="modal"
        style={{
          position: "absolute",
          background: "#fff",
          top: 25,
          left: "10%",
          right: "10%",
          padding: 15,
          border: "2px solid #444"
        }}>
        <h1>{image.title}</h1>
        <Image color={image.color} />
        <button type="button" onClick={back}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ModalSwitch;
