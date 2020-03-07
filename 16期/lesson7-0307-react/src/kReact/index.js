function createElement(type, props, ...children) {
  if (props) {
    delete props.__source;
    delete props.__self;
  }

  // 返回一个ReactElement
  return {
    type: type,
    props: {
      ...props,
      children: children.map(child => {
        return typeof child === "object" ? child : createTextNode(child);
      })
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
  createElement,
  version: "1"
};
