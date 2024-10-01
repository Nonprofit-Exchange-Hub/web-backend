import * as React from 'react';
import { NavLink, useHistory } from 'react-router-dom';

import { makeStyles } from 'tss-react/mui';
import Typography from '@mui/material/Typography';

import type { Theme } from '@mui/material/styles';

import AssetsList from './AssetsList';
import OrgsList from './OrgsList';
import FilterGroup from '../components/FilterGroup';
import SearchCategoryCard from '../components/SearchCategoryCard';
import Search from '../components/Search';
import { filters1, filters2, filters3 } from '../assets/temp';
import { APP_API_BASE_URL } from '../configs';
import routes from '../routes/routes';

import type { Asset, Organization } from '../types';

const useStyles = makeStyles()((theme: Theme) => ({
  searchResultsContainer: {
    display: 'grid',
    padding: '20px 10%',
    gridTemplateRows: 'auto',
    gridTemplateAreas: `' searchBar '
                      'searchBody '`,
    gap: '4em 0',
    backgroundColor: '#f7fbfd',
  },
  iconButton: {
    padding: 10,
    '&:hover': {
      backgroundColor: 'inherit',
      borderRadius: '10px',
    },
  },
  searchBody: {
    gridArea: 'searchBody',
    display: 'grid',
    gridTemplateColumns: '300px 1fr',
    gridTemplateRows: 'auto',
    gridTemplateAreas: `'leftPanel rightPanel'`,
    gap: '1em',
  },
  leftPanel: {
    gridArea: 'leftPanel',
    minWidth: '200px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '1em',
  },
  groupHeader: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginLeft: '15%',
  },
  rightHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'top',
  },
  rightPanel: {
    gridArea: 'rightPanel',
  },
  makeAPost: {
    fontWeight: 'bold',
    textDecoration: 'none',
    color: 'black',
  },
}));

function SearchResults(): JSX.Element {
  const { classes } = useStyles();
  const history = useHistory();

  const searchParams = new URLSearchParams(history.location.search);
  const querySearchText = searchParams.get('search');
  const querySearchCategory = searchParams.get('category');

  const [selectedFilters, setSelectedFilters] = React.useState<{ [key: string]: boolean }>({});
  const [offers, setOffers] = React.useState<Asset[]>([]);
  const [needs, setNeeds] = React.useState<Asset[]>([]);
  const [orgs, setOrgs] = React.useState<Organization[]>([]);
  // TODO: create Volunteer Type in types/index.ts and change Object[] to Volunteer[] below
  const [volunteer, setVolunteer] = React.useState<Object[]>([]);

  const fetchSearchData = React.useCallback(() => {
    if (querySearchCategory === 'Volunteer') {
      // TODO: Change API to /volunteer
      fetch(`${APP_API_BASE_URL}/organizations`)
        .then((resp) => resp.json())
        .then((data: Asset[]) => {
          setVolunteer(data);
        });
    } else if (querySearchCategory === 'Offers' || querySearchCategory === 'Needs') {
      const newSearchParams = new URLSearchParams();
      newSearchParams.set('type', querySearchCategory === 'Needs' ? 'request' : 'donation');
      newSearchParams.set('search', querySearchText || '');
      fetch(`${APP_API_BASE_URL}/assets?${newSearchParams.toString()}`)
        .then((resp) => resp.json())
        .then((data: Asset[]) => {
          if (querySearchCategory === 'Needs') {
            setNeeds(data);
          } else {
            setOffers(data);
          }
        });
    } else if (querySearchCategory === 'Nonprofits') {
      const newSearchParams = new URLSearchParams();
      newSearchParams.set('search', querySearchText || '');
      fetch(`${APP_API_BASE_URL}/organizations?${newSearchParams.toString()}`)
        .then((resp) => resp.json())
        .then((data: Organization[]) => {
          setOrgs(data);
        });
    } else {
      // TODO: Change API to fetch ALL combined data
    }
  }, [querySearchCategory, querySearchText]);

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFilters({
      ...selectedFilters,
      [event.target.value]: event.target.checked,
    });
  };

  React.useEffect(() => {
    fetchSearchData();
  }, [querySearchText, querySearchCategory, volunteer, offers, orgs]);

  return (
    <div className={classes.searchResultsContainer}>
      <Search />
      <div className={classes.searchBody}>
        <div className={classes.leftPanel}>
          <SearchCategoryCard />
          <Typography
            variant="inherit"
            component="h5"
            color="textPrimary"
            className={classes.groupHeader}
          >
            Location
          </Typography>
          <span style={{ fontSize: '15px' }}>
            <NavLink className={classes.makeAPost} to={routes.Signup.path}>
              Join now
            </NavLink>{' '}
            to view posts from your local community.
          </span>
          <div
            style={{ paddingTop: '40px', display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            <FilterGroup
              header="Delivery Method"
              onHandleCheck={handleCheck}
              filters={filters1}
              selectedFilters={selectedFilters}
            />
            <FilterGroup
              header="Condition"
              onHandleCheck={handleCheck}
              filters={filters2}
              selectedFilters={selectedFilters}
            />
            <FilterGroup
              header="Categories"
              onHandleCheck={handleCheck}
              filters={filters3}
              selectedFilters={selectedFilters}
            />
          </div>
        </div>
        <div className={classes.rightPanel}>
          <div className={classes.rightHeader}>
            {/* {TODO:   Need to combine all lists under one "List" component} */}
            {/* {TODO:   Create and add a VolunteerList component below */}
            {querySearchCategory === 'All' ? (
              <div>
                {needs.length > 0 ? <AssetsList headerText={'Needs'} assets={needs} /> : <></>}
                {offers.length > 0 ? <AssetsList headerText={'Offers'} assets={offers} /> : <></>}
                {orgs.length > 0 ? <OrgsList headerText={'Nonprofits'} orgs={orgs} /> : <></>}
                {volunteer.length > 0 ? `<VolunteerList Componet TBD />` : <></>}
              </div>
            ) : (
              <></>
            )}
            {querySearchCategory === 'Needs' || querySearchCategory === 'Offers' ? (
              <AssetsList
                headerText={querySearchCategory === 'Needs' ? 'All Recent Needed Items' : 'Offers'}
                assets={querySearchCategory === 'Needs' ? needs : offers}
              />
            ) : (
              <></>
            )}
            {querySearchCategory === 'Nonprofits' ? (
              <OrgsList headerText={'Nonprofits'} orgs={orgs} />
            ) : (
              <></>
            )}
          </div>
          {querySearchCategory === 'Volunteer' ? `<VolunteerList Componet TBD />` : <></>}
          {needs.length + offers.length + orgs.length + volunteer.length === 0 && 'No Results'}
        </div>
      </div>
    </div>
  );
}

export default SearchResults;
