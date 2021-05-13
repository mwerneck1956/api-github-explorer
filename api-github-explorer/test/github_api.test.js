const expect = require('chai').expect;

import { getUserByUsername , getUserRepositories, getUserStarredRepositories, githubApi } from '../services/githubApi'



describe('GithubApi tests', () => {
  
  it('Get a user by username', () => {
    return getUserByUsername('octocat')
      .then(response => {

        expect(typeof response).to.equal('object');

        expect(response.name).to.equal('The Octocat')
        expect(response.company).to.equal('@github')
        expect(response.location).to.equal('San Francisco')
      });
  });


  it('Get all public repositories from a user', () => {
    return getUserRepositories('octocat')
      .then(response => {
        expect(response).to.have.lengthOf(8)
      })
  });
  
  it('Get all starred repos from a user', () => {
    return getUserStarredRepositories('octocat')
      .then(response => {
        expect(response).to.have.lengthOf(3)
      })
  });
  

});

