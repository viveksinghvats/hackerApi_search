/ /// import logo from './logo.svg';
// // import React from 'react';
// // import './App.css';

// // const App=()=>  {
// //   const stories=[
// //     {
// //       title:'book1',
// //       aurthor:'a1',
// //       objectKey:0
// //     },
// //     {
// //       title:'bok2',
// //       aurthor:'a2',
// //       objectKey:1,
// //     }
// //   ];

// //   //SECTION ASYNC DATA FETCH
// //   const initialStories=[
// //     {
// //       title:'book1',
// //       aurthor:'a1',
// //       objectKey:0
// //     },
// //     {
// //       title:'bok2',
// //       aurthor:'a2',
// //       objectKey:1,
// //     }
// //   ];
// //   const getAsyncStories=()=>
// //   new Promise(resolve=>setTimeout(()=>resolve({data:{storie:initialStories}}),2000));
// //   const [storie,setStories]=React.useState(
// //     []
// //   );
// //   React.useEffect(()=>{
// //     getAsyncStories().then(result=>{
// //       setStories(result.data.stories)
// //     });
// //   },[]);
// //   //!SECTION
  

// // const handleRemoveStory=item=>{
// //   const newStories=storie.filter(
// //     story=>item.objectKey!==story.objectKey
// //   );
// //   setStories(newStories);
// // }

// //   const [searchTerm,setSearchTerm]=useSemiPersistentState('search','book');
// //   const handleSearch=event=>{
// //     setSearchTerm(event.target.value); 
// //   }; 
// //   // React.useEffect(()=>{
// //   //  localStorage.setItem('searchData',searchTerm)
// //   // },[searchTerm]);
// //   const searchStories=stories.filter(story=>
// //     story.title.toLowerCase().includes(searchTerm.toLowerCase())
// //   );
// //   return (
// //     <div>
// //       <h1>
// //         My Stories
// //       </h1>
// //       <Search onSearch={handleSearch} searchData={searchTerm}/>

// //       <InputWithLabel id='search1' label='Search1' isFocused={true} value={searchTerm} onInputChange={handleSearch} type='text'>
// //         <strong>
// //         Searching2:

// //         </strong>
// //       </InputWithLabel>

// //       <hr/>
// //       <List list={searchStories} onRemoveItems={handleRemoveStory}/>
// //     </div>
// //   );
// // }
// // const Search=({onSearch,searchData})=>{
// //   // const {onSearch,searchData}=props;
  
// //   return (
// //     <>
// //       <label htmlFor='search'>
// //         Search:
// //       </label>
// //       <input id='search' type='text' onChange={onSearch} value={searchData}/>
// //       <p>
// //         Searching for <strong><i>{searchData}</i></strong>
// //       </p>
// //     </>
// //   );
// // }
// // //SECTION normal destructuring of data
// // // const List=({list})=>
// // //    list.map(item=><Item key={item.objectKey} item={item}/>);

// // //!SECTION 

// // //SECTION destructuring of data using spread and rest operator

// // // const List=({list,onRemoveItems})=>
// // //    list.map(({objectKey,...item})=><Item key={objectKey} {...item}/>);
// // const List=({list,onRemoveItems})=>
// //    list.map(item=><Item key={item.objectKey} item={item} onRemoveItems={onRemoveItems}/>);

// // // const Item=({title,aurthor})=>
// // //    (
// // //       <div>
// // //         <span>
// // //           <a  class='App-link' href={aurthor}>{title}</a>
// // //         </span>
// // //         <span>
// // //           <a  class='App-link' href={title}>{aurthor}</a>
// // //         </span>
// // //       </div>
// // //     );
// // const Item=({item,onRemoveItems})=>{

// //   const handleRemoveItem=()=>{
// //     onRemoveItems(item);
// //   }


// //    return (
// //       <div>
// //         <span>
// //           <a  class='App-link' href={item.aurthor}>{item.title}</a>
// //         </span>
// //         <span>
// //           <button type='button' onClick={()=>onRemoveItems(item)}>Dismiss</button>
// //         </span>
// //       </div>
// //     );
// //    }

// // //!SECTION 

// // //SECTION Custom React Hooks

// // const useSemiPersistentState=(key,initialState)=>{

// //   const [searchTerm,setSearchTerm]=React.useState(
// //     localStorage.getItem(key)||initialState
// //   );

// //   React.useEffect(()=>{
// //     localStorage.setItem(key,searchTerm)
// //    },[searchTerm]);
// //   return [searchTerm,setSearchTerm];
// // } 
// // //!SECTION

// // //SECTION resuable react component

// // const InputWithLabel=({
// //   id,label,value,type='text',onInputChange,children,isFocused
// // })=>(
// //   <>
// //   <label htmlFor={id}>
// //     {children} 
// //   </label>
// //   &nbsp;
// //   <input id={id} type={type} value={value} autoFocus={isFocused}  onChange={onInputChange}/>
// //   </>
// // );
// // //!SECTION

// // export default App;


// import React from 'react';
// import axios from 'axios';
// import styles from './App.module.css';
// import {ReactComponent as Check} from './check.svg';
// import { sortBy } from 'lodash';

// const initialStories = [
//   {
//     title: 'React',
//     url: 'https://reactjs.org/',
//     author: 'Jordan Walke',
//     num_comments: 3,
//     points: 4,
//     objectID: 0,
//   },
//   {
//     title: 'Redux',
//     url: 'https://redux.js.org/',
//     author: 'Dan Abramov, Andrew Clark',
//     num_comments: 2,
//     points: 5,
//     objectID: 1,
//   },
// ];

// type Story={
//   objectID:number,
//   url:string,
//   title:string,
//   author:string,
//   num_comments:number,
//   points:number
// }
// type Stories=Array<Story>;
// type ListProps={
//   list:Stories;
//   onRemoveItem:(item:Story)=>void
// }
// type ItemProps={
//   item:Story,
//   OnRemoveItem:(item:Story)=>void
// }

// type StoriesState={
//   data:Stories;
//   isLoading:boolean;
//   isError:boolean;
// };




// // const getAsyncStories = () =>
// //   new Promise(resolve =>
// //     setTimeout(
// //       () => resolve({ data: { stories: initialStories } }),
// //       2000
// //     )
// //   );

// const useSemiPersistentState = (
//   key:string, initialState:string):
//   [string,(newValue:string)=>void] => {
//   const isMounted=React.useRef(false);
//   const [value, setValue] = React.useState(
//     localStorage.getItem(key) || initialState
//   );

//   React.useEffect(() => {
//     if(!isMounted.current)
//     {
//       isMounted.current=true;
//     }
//     else{
//       console.log('A');
//     localStorage.setItem(key, value);
//     }
//   }, [value, key]);
//   return [value, setValue];
// };

// // const storiesReducer = (state:StoriesState, action:StoriesAction) => {
// //   switch (action.type) {
// //     // case 'SET_STORIES':
// //     //   return action.payload;
// //     // case 'REMOVE_STORY':
// //     //   return state.filter(
// //     //     story => action.payload.objectID !== story.objectID
// //     //   );
// //     case 'STORIES_FETCH_INIT':
// //       return {
// //         ...state,
// //         isLoading:true,
// //         isError:false
// //       };
// //       case 'STORIES_FETCH_SUCCESS':
// //       return {
// //         ...state,
// //         isLoading:false,
// //         isError:false,
// //         data:action.payload,
// //       };
// //       case 'STORIES_FETCH_FAILURE':
// //       return {
// //         ...state,
// //         isLoading:false,
// //         isError:true,
// //       };
// //       case 'REMOVE_STORY':
// //       return {
// //         ...state,
// //         data:state.data.filter(
// //           story=>action.payload.objectID!==story.objectID
// //         )
// //       };
// //     default:
// //       throw new Error();
// //   }
// // };
// interface StoriesFetchInitAction{
//   type:'STORIES_FETCH_INIT';
// };

// interface StoriesFetchSuccessAction{
//   type:'STORIES_FETCH_SUCCESS';
//   payload:Stories;
// };


// interface StoriesFetchFailureAction{
//   type:'STORIES_FETCH_FAILURE';
// };

// interface StoriesRemoveAction{
//   type:'REMOVE_STORY';
//   payload:Story;
// };
// type StoriesAction=|StoriesFetchInitAction|StoriesFetchSuccessAction|StoriesFetchFailureAction|StoriesRemoveAction;
// const storiesReducer=(
//   state:StoriesState,
//   action:StoriesAction
// )=>{
//   switch (action.type) {
//     // case 'SET_STORIES':
//     //   return action.payload;
//     // case 'REMOVE_STORY':
//     //   return state.filter(
//     //     story => action.payload.objectID !== story.objectID
//     //   );
//     case 'STORIES_FETCH_INIT':
//       return {
//         ...state,
//         isLoading:true,
//         isError:false
//       };
//       case 'STORIES_FETCH_SUCCESS':
//       return {
//         ...state,
//         isLoading:false,
//         isError:false,
//         data:action.payload,
//       };
//       case 'STORIES_FETCH_FAILURE':
//       return {
//         ...state,
//         isLoading:false,
//         isError:true,
//       };
//       case 'REMOVE_STORY':
//       return {
//         ...state,
//         data:state.data.filter(
//           story=>action.payload.objectID!==story.objectID
//         )
//       };
//     default:
//       throw new Error();
// };
// }

// type SearchFormProps={
//   searchTerm:string,
//   onSearchInput:(event:React.ChangeEvent<HTMLInputElement>)=>void;
//   onSearchSubmit:(event:React.FormEvent<HTMLFormElement>)=>void;
// };



// const API_ENDPOINT='https://hn.algolia.com/api/v1/search?query=';

// const SearchForm=({
//   searchTerm,
//   onSearchInput,
//   onSearchSubmit
// }:SearchFormProps)=>(
//   <form onSubmit={onSearchSubmit} className={styles.searchForm}>
//   <InputWithLabel 
//   id='search'
//   value={searchTerm}
//   isFocused
//   onInputChange={onSearchInput}
//   >
//     <strong>
//       Search:
//     </strong>
//   </InputWithLabel>
// <button type='submit' disabled={!searchTerm} className={`${styles.button}${styles.buttonLarge}`}>
// Submit
// </button>
//   </form>
// );

// const getLastSearches={urls:String}=>urls.



// const App = () => {
//   const [searchTerm, setSearchTerm] = useSemiPersistentState(
//     'search',
//     ''
//   );
//   const [url,setUrl]=React.useState(`${API_ENDPOINT}${searchTerm}`);
//   const [urls,setUrls]=React.useState(`${API_ENDPOINT}${searchTerm}`);

//   // const handleSearch = event=> {
//   //   setSearchTerm(event.target.value);
//   // };
//   const handleSearchInput = (event:React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(event.target.value);
//   };
//   const handleSearchSubmit = (event:React.FormEvent<HTMLFormElement>) => {
//     const url=`${API_ENDPOINT}${searchTerm}`;
//     setUrls(urls.concat(url));
//     setUrl(`${API_ENDPOINT}${searchTerm}`);
//     event.preventDefault();
//   };
//   const [stories, dispatchStories] = React.useReducer(
//     storiesReducer,
//     {data:[],isLoading:false,isError:false}
//   );
//   console.log('B:App');
//   // const [isLoading, setIsLoading] = React.useState(false);
//   // const [isError, setIsError] = React.useState(false);

//   // React.useEffect(() => {
//   //   // setIsLoading(true);
//   //    if(!searchTerm) return;
//   //   dispatchStories({type:'STORIES_FETCH_INIT'});
//   //   // getAsyncStories()
//   //   //   .then(result => {
//   //   //     dispatchStories({
//   //   //       type: 'STORIES_FETCH_SUCCESS',
//   //   //       payload: result.data.stories,
//   //   //     });
//   //   //     // setIsLoading(false);
//   //   //   })
//   //     fetch(`${API_ENDPOINT}${searchTerm}`)
//   //     .then(response=>response.json())
//   //     .then(result=>{
//   //       dispatchStories({
//   //         type:'STORIES_FETCH_SUCCESS',
//   //         payload:result.hits
//   //       })
//   //     })
//   //     .catch(() => dispatchStories({type:'STORIES_FETCH_FAILURE'})
//   //     // setIsError(true));
//   // )}, [searchTerm]);

//   const sumComments=React.useMemo(()=>getSumComments(stories.data),[stories.data]);
//   // const sumComments=getSumComments(stories);
//   const handleFetchStories=React.useCallback(async () => {
//     // setIsLoading(true);
//      if(!searchTerm) return;
//     dispatchStories({type:'STORIES_FETCH_INIT'});
//     // getAsyncStories()
//     //   .then(result => {
//     //     dispatchStories({
//     //       type: 'STORIES_FETCH_SUCCESS',
//     //       payload: result.data.stories,
//     //     });
//     //     // setIsLoading(false);
//     //   })
//   //     fetch(url)
//   //     .then(response=>response.json())
//   //     .then(result=>{
//   //       dispatchStories({
//   //         type:'STORIES_FETCH_SUCCESS',
//   //         payload:result.hits
//   //       })
//   //     })
//   //     .catch(() => dispatchStories({type:'STORIES_FETCH_FAILURE'})
//   //     // setIsError(true));
//   // )}, [url]);
//   // axios
//   // .get(url)
//   // .then(result=>{
//   //   dispatchStories({
//   //     type:'STORIES_FETCH_SUCCESS',
//   //     payload:result.data.hits
//   //   })
//   // })
//   // .catch(() => dispatchStories({type:'STORIES_FETCH_FAILURE'})
//   // setIsError(true));
//   try {
//     const lastUrl=urls[urls.length-1];

//     const result=await axios.get(lastUrl);
//   dispatchStories({
//     type:'STORIES_FETCH_SUCCESS',
//     payload:result.data.hits, 
//   });
//   } catch (error) {
//     dispatchStories({type:'STORIES_FETCH_FAILURE'});
//   }

// }, [urls]);
// // const handleFetchStories=React.useCallback(async ()=>{})
// // const result=await axios.get(url);
//   React.useEffect(()=>{
//     handleFetchStories();
//   },[handleFetchStories]);

//   const handleRemoveStory = React.useCallback((item :Story)=> {
//     dispatchStories({
//       type: 'REMOVE_STORY',
//       payload: item,
//     });
//   },[]);
  

//   // const searchedStories = stories.data.filter(story =>
//   //   story.title.toLowerCase().includes(searchTerm.toLowerCase())
//   // );

//   return (
//     <div className={styles.container}> 
//       <h1 className={styles.headlinePrimary}>My Stories with {sumComments}</h1>

//       <SearchForm searchTerm={searchTerm}
//       onSearchInput={handleSearchInput}
//       onSearchSubmit={handleSearchSubmit}
//       />
//       <form onSubmit={handleSearchSubmit}>
//       <InputWithLabel
//         id="search"
//         value={searchTerm}
//         isFocused
//         onInputChange={handleSearchInput}
//       >
//         Search:
//       </InputWithLabel>
//       <button type='submit' disabled={!searchTerm}>Submit
//       </button>
//      </form>
//       <hr/>
//       {stories.isError && <p>Something went wrong ...</p>}

//       {stories.isLoading ? (
//         <p>Loading ...</p>
//       ) : (
//         <List
//           list={stories.data}
//           onRemoveItem={handleRemoveStory}
//         />
//       )}
//     </div>
//   );
// }

// const getSumComments=(stories:Stories)=>{
//   console.log('C');
//   return stories.reduce(
//     (result,value)=>result+value.num_comments,0
//   );
// }

// type InputLabelProps={
//   id:string,
//   value:string,
//   type?:string,
//   onInputChange:(event:React.ChangeEvent<HTMLInputElement>)=>void;
//   isFocused?:boolean,
//   children:React.ReactNode
// }
// const InputWithLabel = ({
//   id,
//   value,
//   type = 'text',
//   onInputChange,
//   isFocused,
//   children,
// }:InputLabelProps) => {
//   const inputRef = React.useRef<HTMLInputElement>(null!);

//   React.useEffect(() => {
//     if (isFocused) {
//       inputRef.current.focus();
//     }
//   }, [isFocused]);

//   return (
//     <>
//       <label htmlFor={id} className={styles.label}>{children}</label>
//       &nbsp;
//       <input
//         ref={inputRef}
//         id={id}
//         type={type}
//         value={value}
//         onChange={onInputChange}
//         className={styles.input}
//       />
//     </>
//   );
// };

// const SORTS={
//   'NONE':(list: string)=>list,
//   'TITLE':(list:string)=>sortBy(list,'title'),
//   'AUTHOR':(list:string)=>sortBy(list,'author'),
//   'COMMENT':(list:string)=>sortBy(list,'num_comments').reverse(),
//   'POINT':(list:string)=>sortBy(list,'points'),

// }
// const List = 
//   ({ list, onRemoveItem }:ListProps) =>
// {
//   const [sort,setSort]=React.useState('NONE');
//   const handleSort=(sortKey: React.SetStateAction<any>)=>{
//     setSort(sortKey);
//   }

//   // const sortFunction=SORTS['NONE'];
//   // const sortedList=sortFunction(list);
//   return (
//     <div>
//     {/* <div style={{display:'flex'}}>
//       <span style={{width:'40%'}}>Title</span>
//       <span style={{width:'30%'}}>Author</span>
//       <span style={{width:'10%'}}>Comments</span>
//       <span style={{width:'10%'}}>Points</span>
//       <span style={{width:'10%'}}>Actions</span>


//     </div> */}

//     <div>
//       <span>
//         <button type='button' onClick={()=>handleSort('TITLE')}>
//          Title
//         </button>
//       </span>
//       <span>
//         <button type='button' onClick={()=>handleSort('AUTHOR')}>
//          Author
//         </button>
//       </span>
//       <span>
//         <button type='button' onClick={()=>handleSort('COMMENT')}>
//          Comments
//         </button>
//       </span>
//       <span>
//         <button type='button' onClick={()=>handleSort('POINT')}>
//          Points
//         </button>
//       </span>
//       <span>
//         Actions
//       </span>
//     </div>

//     {
//       list.map(item => (
//         <Item
//           key={item.objectID}
//           item={item}
//           OnRemoveItem={onRemoveItem}
//         />
//       )
//     )
//     }
//     </div>
//   );
// }

  
// const Item = ({ item, OnRemoveItem }:ItemProps) => (
//   <div className={styles.item} style={{display:'flex'}}>
//     <span style={{width:'40%'}}>
//       <a href={item.url}>{item.title}</a>
//     </span>
//     <span style={{width:'30%'}}>{item.author}</span>
//     <span style={{width:'10%'}}>{item.num_comments}</span>
//     <span style={{width:'10%'}}>{item.points}</span>
//     <span style={{width:'10%'}}>
//       <button type="button" onClick={() => OnRemoveItem(item)} className={`${styles.button}${styles.buttonSmall}`}>
//       <Check height='20px' width='20px'/>
//       </button>
//     </span>
//   </div>
// );
// export default App;

// export { storiesReducer, SearchForm, InputWithLabel, List, Item };
// //   export type { ItemProps };
// export type { StoriesAction };
