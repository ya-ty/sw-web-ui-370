import { defineMessages } from 'react-intl';

export const scope = 'app.iu.heatMap';

export default defineMessages({
  view_all: {
    id: `${scope}.filter.view_all`,
    defaultMessage: 'View All',
  },
  apparels: {
    id: `${scope}.filter.apparels`,
    defaultMessage: 'Apparels',
  },
  clothings: {
    id: `${scope}.filter.clothings`,
    defaultMessage: 'Clothings',
  }
});
