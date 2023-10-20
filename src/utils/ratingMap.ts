interface RatingMapProps {
  [key: string]: {
    textColor: string;
    color: string;
  };
}

export const ratingMap: RatingMapProps = {
  g: {
    textColor: 'white',
    color: '#00fd9c',
  },
  pg: {
    textColor: 'white',
    color: '#03caff',
  },
  'pg-13': {
    textColor: 'black',
    color: '#fff059',
  },
  r: {
    textColor: 'white',
    color: '#fd656a',
  },
};
