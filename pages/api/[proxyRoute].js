import axios from 'axios';

const BACKEND = 'https://us-central1-aiot-fit-xlab.cloudfunctions.net';

export default async (req, res) => {
  const { query: { proxyRoute } } = req;
  const result = await axios.post(`${BACKEND}/${proxyRoute}`, req.body);
  res.json(result.data);
}
