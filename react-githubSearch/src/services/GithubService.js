import axios from 'axios';

export class GithubService {
    static URL = 'https://api.github.com/';
    static async searchUsers(value) {
        const response = await axios.get(
            `${GithubService.URL}search/users?q=${value}`,
        );
        return response.data.items;
    }
    static async getUser(name) {
        const userInfo = await axios.get(`${GithubService.URL}users/${name}`);
        const userRepos = await axios.get(
            `${GithubService.URL}users/${name}/repos`,
        );
        return { ...userInfo.data, repos: userRepos.data };
    }
}
