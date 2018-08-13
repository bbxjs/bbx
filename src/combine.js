import State from './state';

const combine = (...list) => (A) => {
  const array = list.filter(item => !!item);
  if (array.length === 0) {
    return A;
  }
  const map = {};
  const methods = [
    'willStateUpdate',
    'shouldStateUpdate',
    'didStateUpdate',
    'willMethodCall',
    'shouldMethodCall',
    'didMethodCall',
  ];
  array.forEach((item) => {
    methods.forEach((key) => {
      if (item[key]) {
        map[key] = map[key] || [];
        map[key].push(item[key]);
      }
    });
  });
  if (Object.keys(map).length === 0) {
    return A;
  }
  return class extends State {
    constructor(...constructorArgs) {
      super();
      const obj = new A(...constructorArgs);
      Object.keys(map).forEach((key) => {
        const method = obj[key].bind(obj);
        obj[key] = (...args) => {
          const result = method(...args);
          if (key.indexOf('will') === 0) {
            map[key].forEach(item => item.apply(obj, args));
          }
          if (key.indexOf('should') === 0) {
            let bool = result;
            map[key].forEach((item) => {
              if (item.apply(obj, args) !== true) {
                bool = false;
              }
            });
            if (bool) {
              const name = key.replace('should', 'did');
              if (map[name]) {
                map[name].forEach(item => item.apply(obj, args));
              }
            }
          }
        };
      });
      return obj;
    }
  };
};

export default combine;
