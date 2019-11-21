import axios from "axios";

export const get = url =>
  new Promise(res => {
    setTimeout(() => {
      res(axios.get(url).then(({ data }) => data));
    }, 2000);
  });

export default { get };
