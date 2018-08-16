import { Router as expressRouter } from 'express';
import bodyParser from 'body-parser';
import Api from '../utils/api';

const router = expressRouter();
router.use(bodyParser.json());

const sendError = (res, error) => {
  res
    .status((error && typeof error.response.status === 'number') ? error.response.status : 500)
    .send(error && error.response ? error.response.data : { message: error.message });
};

router.get('/git/repos', (req, res) => {
  Api.getGitRepos(req.query)
    .then((response) => {
      res.send(response);
    })
    .catch((error) => {
      sendError(res, error);
    });
});

router.get('/git/repos/marked', (req, res) => {
  res.send(Api.getGitMarkedRepos());
});

router.post('/git/repos/mark', (req, res) => {
  res.send(Api.markGitRepo(req.body));
});

router.delete('/git/repos/mark/', (req, res) => {
  res.send(Api.unmarkGitRepo(parseInt(req.query.id, 10)));
});

export default router;
