import axios from 'axios';

const resolveApiUrl = (url) => {
  return `/api${url}`;
};

const getGetRequest = (url, params) => {
  const apiUrl = resolveApiUrl(url);
  return axios
    .create({
      params,
    })
    .get(apiUrl)
    .then((response) => {
      return response.data;
    });
};

const getPostRequest = (url, data, params) => {
  const apiUrl = resolveApiUrl(url);
  return axios
    .create({
      params,
    })
    .post(apiUrl, data)
    .then((response) => {
      return response.data;
    });
};

const getDeleteRequest = (url, params) => {
  const apiUrl = resolveApiUrl(url);
  return axios
    .create({
      params,
    })
    .delete(apiUrl)
    .then((response) => {
      return response.data;
    });
};

export function getGitRepos(searchQuery) {
  return getGetRequest('/git/repos', { q: searchQuery });
}

export function getGitMarkedRepos() {
  return getGetRequest('/git/repos/marked');
}

export function markGitRepo(repo) {
  return getPostRequest('/git/repos/mark', repo);
}

export function unmarkGitRepo(id) {
  return getDeleteRequest('/git/repos/mark', { id });
}
