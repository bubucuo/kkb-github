function createElement(type, props, ...children) {
  if (props) {
    delete props.__source;
    delete props.__self;
  }

  return {
    type,
    props: {
      ...props,
      children: children.map(child =>
        typeof child === "object" ? child : createTextNode(child)
      )
    }
  };
}

function createTextNode(text) {
  return {
    type: "TEXT",
    props: {
      children: [],
      nodeValue: text
    }
  };
}

export default {
  createElement
};
