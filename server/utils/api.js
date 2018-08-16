import axios from 'axios';
import { remove } from 'lodash';

export class Api {
  markedRepos = [];

  getGitRepos(params) {
    return this.sendGetRequest('https://api.github.com/search/repositories', params);
  }

  getGitMarkedRepos() {
    return this.markedRepos;
  }

  markGitRepo(repo) {
    const parsedRepo = repo;
    parsedRepo.marked = true;
    if (this.markedRepos.filter((r) => { return r.id === parsedRepo.id; }).length === 0) {
      this.markedRepos.push(parsedRepo);
    }
    return { success: true };
  }

  unmarkGitRepo(id) {
    remove(this.markedRepos, (item) => {
      return item.id === id;
    });
    return { success: true };
  }

  sendGetRequest(url, params) {
    return new Promise((resolve, reject) => {
      axios.create({
        params,
      })
        .get(url)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

export default new Api();
