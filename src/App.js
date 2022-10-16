
import React from 'react';
import axios from 'axios';
import { result, sortBy } from 'lodash';
import styles from './App.module.css';

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

const storiesReducer = (state, action) => {
  switch (action.type) {
    case 'STORIES_FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'STORIES_FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'STORIES_FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case 'REMOVE_STORY':
      return {
        ...state,
        data: state.data.filter(
          story => action.payload.objectID !== story.objectID
        ),
      };
    default:
      throw new Error();
  }
};

// const getLastSearches=urls=>urls.slice(-5).map(extractLastSearchTerm);

const extractLastSearchTerm=url=>url.replace(API_ENDPOINT,'');
// const getLastSearches=urls=>urls.slice(-5).map(url=>extractLastSearchTerm(url));
const getUrl=searchTerm=>`${API_ENDPOINT}${searchTerm}`;

const getLastSearches=urls=>urls.reduce((result,url,index)=>{
const searchTerm=extractLastSearchTerm(url);
if(index==0)
{
    return result.concat(searchTerm);
}
const previousSearchTerm=result[result.length-1];
if(searchTerm===previousSearchTerm)
{
    return result;
}
else{
    return result.concat(searchTerm);
}
},[]).slice(-6).slice(0,-1);
const App = () => {
  const [searchTerm, setSearchTerm] = useSemiPersistentState(
    'search',
    'React'
  );

  const [urls, setUrls] = React.useState([
    getUrl(searchTerm)
  ]);
  const handleSearch=searchTerm=>{
      const url=getUrl(searchTerm);
      setUrls(urls.concat(url));
  }

const handleLastSearches=searchTerm=>{
    setSearchTerm(searchTerm);

   handleSearch(searchTerm);
}

const lastSearches=getLastSearches(urls);

  const [stories, dispatchStories] = React.useReducer(
    storiesReducer,
    { data: [], isLoading: false, isError: false }
  );

  const handleFetchStories = React.useCallback(async () => {
    dispatchStories({ type: 'STORIES_FETCH_INIT' });

    try {
        const lastUrl=urls[urls.length-1];
      const result = await axios.get(lastUrl);

      dispatchStories({
        type: 'STORIES_FETCH_SUCCESS',
        payload: result.data.hits,
      });
    } catch {
      dispatchStories({ type: 'STORIES_FETCH_FAILURE' });
    }
  }, [urls]);

  React.useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  const handleRemoveStory = item => {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
    });
  };

  const handleSearchInput = event => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = event => {
    handleSearch(searchTerm);
    event.preventDefault();
  };

  return (
    <div className={styles.container}>
      <h1>My Hacker Stories</h1>

      <SearchForm
        searchTerm={searchTerm}
        onSearchInput={handleSearchInput}
        onSearchSubmit={handleSearchSubmit}
      />


      <hr />

      {
          lastSearches.map((searchTerm,index)=>(
              <button key={searchTerm+index} type='button' onClick={()=>handleLastSearches(searchTerm)}>{searchTerm}</button>
          ))
      }
      {stories.isError && <p>Something went wrong ...</p>}

      {stories.isLoading ? (
        <p>Loading ...</p>
      ) : (
        <List list={stories.data} onRemoveItem={handleRemoveStory} />
      )}
    </div>
  );
};

const SearchForm = ({
  searchTerm,
  onSearchInput,
  onSearchSubmit,
}) => (
  <form onSubmit={onSearchSubmit} className={styles.searchForm}>
    <InputWithLabel
      id="search"
      value={searchTerm}
      isFocused
      onInputChange={onSearchInput}
    >
      <strong>Search:</strong>
    </InputWithLabel>

    <button type="submit" disabled={!searchTerm}>
      Submit
    </button>
  </form>
);

const InputWithLabel = ({
  id,
  value,
  type = 'text',
  onInputChange,
  isFocused,
  children,
}) => {
  const inputRef = React.useRef();

  React.useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <>
      <label htmlFor={id}>{children}</label>
      &nbsp;
      <input
        ref={inputRef}
        id={id}
        type={type}
        value={value}
        onChange={onInputChange}
      />
    </>
  );
};

const SORTS = {
  NONE: list => list,
  TITLE: list => sortBy(list, 'title'),
  AUTHOR: list => sortBy(list, 'author'),
  COMMENT: list => sortBy(list, 'num_comments').reverse(),
  POINT: list => sortBy(list, 'points').reverse(),
};

const List = ({ list, onRemoveItem }) => {
  const [sort, setSort] = React.useState({
    sortKey: 'NONE',
    isReverse: false,
  });

  const handleSort = sortKey => {
    const isReverse = sort.sortKey === sortKey && !sort.isReverse;

    setSort({ sortKey, isReverse });
  };

  const sortFunction = SORTS[sort.sortKey];

  const sortedList = sort.isReverse
    ? sortFunction(list).reverse()
    : sortFunction(list);

  return (
    <div>
      <div style={{display:'flex'}}>
        <span style={{width:'40%'}}>TITLE</span>
        <span style={{width:'30%'}}>AUTHOR</span>
        <span style={{width:'10%'}}>COMENT</span>
        <span style={{width:'10%'}}>POINTS</span>
        <span style={{width:'10%'}}>ACTIONS</span>

      </div>
      <div style={{display:'flex'}}>
        <span  style={{width:'40%'}}>
          <button type="button" onClick={() => handleSort('TITLE')}>
            Title
          </button>
        </span>
        <span style={{width:'30%'}}> 
          <button type="button" onClick={() => handleSort('AUTHOR')}>
            Author
          </button>
        </span>
        <span style={{width:'10%'}}>
          <button type="button" onClick={() => handleSort('COMMENT')}>
            Comments
          </button>
        </span>
        <span style={{width:'10%'}}>
          <button type="button" onClick={() => handleSort('POINT')}>
            Points
          </button>
        </span >
        <span style={{width:'10%'}}><button type="button" onClick={() =>{}}>
            Actions
          </button></span>
      </div>

      {sortedList.map(item => (
        <Item
          key={item.objectID}
          item={item}
          onRemoveItem={onRemoveItem}
        />
      ))}
    </div>
  );
};

const Item = ({ item, onRemoveItem }) => (
  <div className={styles.item} style={{display:'flex'}}>
    <span style={{width:'40%'}}>
      <a href={item.url}>{item.title}</a>
    </span>
    <span style={{width:'30%'}}>{item.author}</span>
    <span style={{width:'10%'}}>{item.num_comments}</span>
    <span style={{width:'10%'}}>{item.points}</span>
    <span style={{width:'11%'}}>
      <button type="button" onClick={() => onRemoveItem(item)}>
        Dismiss
      </button>
    </span>
  </div>
);

export default App;




