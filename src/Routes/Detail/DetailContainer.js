import { moviesApi, tvApi } from '../../api';
import React from 'react';
import DetailPresenter from './DetailPresenter';

export default class extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { pathname },
    } = props;
    this.state = {
      result: null,
      videos: null,
      error: null,
      loading: true,
      isMovie: pathname.includes('/movie/'),
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
      history: { push },
    } = this.props;
    const { isMovie } = this.state;

    if (isNaN(+id)) {
      return push('/');
    }

    let result = null;
    let videos = null;
    try {
      if (isMovie) {
        ({ data: result } = await moviesApi.movieDetail(+id));
        ({ data: videos } = await moviesApi.videos(+id));
      } else {
        ({ data: result } = await tvApi.showDetail(+id));
        ({ data: videos } = await tvApi.videos(+id));
      }
    } catch {
      this.setState({ error: "Can't find anything." });
    } finally {
      this.setState({ loading: false, result, videos });
    }
  }

  render() {
    const { result, error, loading, videos } = this.state;
    return (
      <DetailPresenter
        result={result}
        error={error}
        loading={loading}
        videos={videos}
      />
    );
  }
}
