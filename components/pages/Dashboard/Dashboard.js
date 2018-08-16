/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  loadRepos,
  loadMarkedRepos,
  addBookmark,
  removeBookmark,
} from '../../../redux/git/actions';
import './dashboard.scss';

class Dashboard extends React.PureComponent {
  static propTypes = {
    loading: PropTypes.bool,
    loadingError: PropTypes.string,
    repos: PropTypes.shape({
      totalCount: PropTypes.number,
      items: PropTypes.array,
    }),
    loadRepos: PropTypes.func.isRequired,
    loadMarkedRepos: PropTypes.func.isRequired,
    addBookmark: PropTypes.func.isRequired,
    removeBookmark: PropTypes.func.isRequired,
  };

  static defaultProps = {
    loading: false,
    loadingError: null,
    repos: null,
  };

  state = { toolbar: 'search' };

  renderToolbar() {
    return (
      <div className="toolbar">
        <ul>
          <li
            className={this.state.toolbar === 'search' ? 'active' : ''}
            onClick={this.switchToolbar}
          >
            Search
          </li>
          <li
            className={this.state.toolbar === 'marked' ? 'active' : ''}
            onClick={this.switchToolbar}
          >
            Show marked
          </li>
        </ul>
        {this.state.toolbar === 'search' && this.renderSearchBox()}
      </div>
    );
  }

  switchToolbar = () => {
    if (this.state.toolbar === 'search') {
      this.setState({ toolbar: 'marked' });
      this.props.loadMarkedRepos();
    } else {
      this.setState({ toolbar: 'search' });
    }
  };

  renderSearchBox() {
    return (
      <div className="search-box">
        <input
          type="text"
          ref={(e) => { this.searchQueryEl = e; }}
          onKeyDown={this.onSearchBoxKeyDown}
        />
        <button
          className={`${this.props.loading ? 'loading' : ''}`}
          disabled={this.props.loading}
          onClick={this.onSearchClick}
        >
          <span>Search</span>
        </button>
      </div>
    );
  }

  onSearchBoxKeyDown = (event) => {
    if (event.which === 13 || event.keyCode === 13) {
      this.onSearchClick();
      return false;
    }
    return true;
  }

  onSearchClick = () => {
    if (!this.props.loading) {
      this.props.loadRepos(this.searchQueryEl.value);
    }
  }

  renderError() {
    if (this.props.loadingError) {
      return (
        <React.Fragment>
          <p>Something went wrong :(</p>
          <p>Please try again later</p>
        </React.Fragment>
      );
    }
    return null;
  }

  renderGitRepoItems() {
    if (this.props.repos) {
      if (this.props.repos.totalCount) {
        return (
          <React.Fragment>
            <p>
              Showing {this.props.repos.items.length} of {this.props.repos.totalCount} repos found.
            </p>
            {this.props.repos.items.map(this.renderGitRepo)}
          </React.Fragment>
        );
      }
      return <p>Nothing was found by your request.</p>;
    }
    return null;
  }

  renderGitRepo = (item) => {
    return (
      <div
        key={item.id.toString()}
        className={`repo ${item.marked ? 'marked' : ''}`}
      >
        <dl>
          <dt><strong>{item.name}</strong> by {item.owner}</dt>
          <a href={item.url}>{item.url}</a>
        </dl>
        <button
          onClick={() => { this.saveBookmark(item); }}
        >
          {item.marked ? 'Delete Bookmark' : 'Add Bookmark'}
        </button>
      </div>
    );
  }

  saveBookmark = (repo) => {
    if (repo.marked) {
      this.props.removeBookmark(repo.id);
    } else {
      this.props.addBookmark(repo);
    }
  };

  render() {
    return (
      <div className="page page-padded dashboard">
        <div className="wrapper">
          <section>
            <h1>Git Dashboard</h1>
            {this.renderToolbar()}
            {this.renderError()}
            {this.renderGitRepoItems()}
          </section>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => {
    return { ...state.git };
  },
  {
    loadRepos,
    loadMarkedRepos,
    addBookmark,
    removeBookmark,
  },
)(Dashboard);
