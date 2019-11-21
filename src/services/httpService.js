import axios from "axios";

export const get = url => axios.get(url).then(({ data }) => data);

export default { get };
