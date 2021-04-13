import React from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Loader from '../../Components/Loader';
import noImage from '../../assets/doolys-welcome.png';
import { Helmet } from 'react-helmet';
import Message from '../../Components/Message';
import Poster from '../../Components/Poster';
import Section from '../../Components/Section';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const Cover = styled.div`
  width: 30%;
  height: 100%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.h3`
  font-size: 32px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
`;

const ImdbLink = styled.a`
  display: inline-block;
  margin-top: 8px;
`;

const StyledSlider = styled(Slider)`
  margin-top: 25px;
  width: ${props => (props.length === 1 ? '12.5%' : '25%')};
`;

const VideosWrapper = styled.select`
  display: block;
  margin-top: 5px;
  background: transparent;
  color: white;
  outline: none;
`;

const YoutubeLink = styled.option``;

const DetailPresenter = ({ result, error, loading, videos }) => {
  const settings = {
    infinite: true,
    speed: 500,
  };
  return loading ? (
    <>
      <Helmet>
        <title>Loading | Nomflix</title>
      </Helmet>
      <Loader />
    </>
  ) : error ? (
    <Message />
  ) : (
    <Container>
      <Helmet>
        <title>
          {result.original_title ? result.original_title : result.original_name}{' '}
          | Nomflix
        </title>
      </Helmet>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : noImage
          }
        />
        <Data>
          <Title>
            {result.original_title
              ? result.original_title
              : result.original_name}
          </Title>
          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Item>
            <Divider>·</Divider>
            <Item>
              {result.runtime ? result.runtime : result.episode_run_time[0]} min
            </Item>
            <Divider>·</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `
                )}
            </Item>
            {result.production_countries &&
              result.production_countries.map((value, idx) => (
                <span key={idx}>
                  <Divider>·</Divider>
                  <Item>{value.iso_3166_1}</Item>
                </span>
              ))}
          </ItemContainer>
          <Overview>{result.overview}</Overview>
          {result.imdb_id && (
            <ImdbLink
              href={`https://www.imdb.com/title/${result.imdb_id}`}
              target="_blank"
            >
              Go to Imdb 👉
            </ImdbLink>
          )}
          <VideosWrapper
            onChange={e =>
              e.target.value && window.open(e.target.value, '_blank')
            }
          >
            <YoutubeLink value="">Do you wanna videos? ✅</YoutubeLink>
            {videos &&
              videos.results.map(value => (
                <YoutubeLink
                  key={value.id}
                  value={`https://www.youtube.com/watch?v=${value.key}`}
                  target="_blank"
                >
                  {value.name}
                </YoutubeLink>
              ))}
          </VideosWrapper>
          {result.seasons && (
            <StyledSlider
              {...settings}
              slidesToShow={result.seasons.length === 1 ? 1 : 2}
              slidesToScroll={result.seasons.length === 1 ? 1 : 2}
              length={result.seasons.length}
            >
              {result.seasons &&
                result.seasons.map(value => (
                  <Poster
                    key={value.id}
                    id={value.id}
                    imageUrl={value.poster_path}
                    title={value.name}
                    detailPadding={true}
                  />
                ))}
            </StyledSlider>
          )}
          {result.production_companies && (
            <Section>
              {result.production_companies &&
                result.production_companies.map(value => (
                  <Poster
                    key={value.id}
                    id={value.id}
                    imageUrl={value.logo_path}
                    title={value.name}
                    detailPadding={true}
                  />
                ))}
            </Section>
          )}
        </Data>
      </Content>
    </Container>
  );
};

DetailPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default DetailPresenter;
