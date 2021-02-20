




import React from 'react';

import App,{storiesReducer,SearchForm,InputWithLabel,List,Item} from './App';

import {render,screen,fireEvent,act} from '@testing-library/react';
import { type } from 'os';

// import type {StoriesAction} from './App';
import { servicesVersion } from 'typescript';

import axios from 'axios';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });


jest.mock('axios');

// const mockedAxios = axios as jest.Mocked<typeof axios>;

const storyOne={
  title:'React',
  url:'https://react.js/org/',
  author:'Jordan Walke',
  num_comments:3,
  points:4,
  objectID:0
};

const storyTwo={
  title:'Redux',
  url:'https://redux.js/org/',
  author:'Dan Abramov, Andrew Clark',
  num_comments:2,
  points:5,
  objectID:1
};

describe('App',()=> {
  test('succeeds fetching data', async ()=>{
    const promise=Promise.resolve({
      data:{
        hits:stories,
      },
    }); 
  axios.get.mockImplementationOnce(()=> promise);
  render(<App/>);
  expect(screen.queryAllByText(/Loading/)).toBeInTheDocument();
  screen.debug();
  await act(()=>promise);
  // screen.debug();
  expect(screen.queryByText(/Loading/)).toBeNull();
  expect(screen.getByText('React')).toBeInTheDocument();
  expect(screen.getByText('Redux')).toBeInTheDocument();
  expect(screen.getAllByText('Dismiss').length).toBe(2);

  });
});






describe('something truthy and falsy',()=>{
  test('true to be true',()=>{
    expect(true).toBeTruthy();
  })
  test('false top be false',()=>{
    expect(true).toBe(true)
  })
});




const stories=[storyOne,storyTwo];
// interface StoriesRemoveAction{
//   type:'REMOVE_STORY';
// };
// type StoriesAction=|StoriesFetchInitAction|StoriesFetchSuccessAction|StoriesFetchFailureAction|StoriesRemoveAction;


describe('storiesReducer',()=>{
  test('removes a story from all stories',()=>{

    

    const action={ type: 'REMOVE_STORY', payload: storyOne }

   
    
const state={data:stories,isLoading:false,isError:false};
const newState=storiesReducer(state,action);
const expectedState={
  data:[storyTwo],
  isLoading:false,
  isError:false
};


expect(newState).toStrictEqual(expectedState);
  });
});

describe('Item',()=>{
  test('render all properties',()=>{
    render(<Item item={storyOne} OnRemoveItem={()=>{}} />);
    expect(screen.getByText('Jordan Walke')).toBeInTheDocument();
    expect(screen.getByText('React')).toHaveAttribute(
      'href','https://react.js/org/'
    );
    // screen.debug();
  });
  test('render a clickable dismiss button',()=>{
    render(<Item item={storyOne} OnRemoveItem={()=>{}}/>)
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
  test('clicking the dismiss button call the callback handler',()=>{
    const handleRemoveItem=jest.fn();
    render(<Item item={storyOne} OnRemoveItem={handleRemoveItem}/>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleRemoveItem).toHaveBeenCalledTimes(1);
  });
});

describe('SearchForm',()=>{
  const searchFormProps={
    searchTerm:'React',
    onSearchSubmit:jest.fn(),
    onSearchInput:jest.fn()
  };

test('Render the input feilds with its value',()=>{
  render(<SearchForm {...searchFormProps}/>);
expect(screen.getByDisplayValue('React')).toBeInTheDocument();

  // screen.debug();
});

test('renders the  correct labels',()=>{
  render(<SearchForm {...searchFormProps}/>);
  expect(screen.getByLabelText(/Search/)).toBeInTheDocument();
})

test('calls onSearchInput on input feild change',()=>{
  render(<SearchForm {...searchFormProps}/>);
  
  fireEvent.change(screen.getByDisplayValue('React'),{
    target:{
      value:'Redux'
    }
  });
  expect(searchFormProps.onSearchInput).toHaveBeenCalledTimes(1);

});

test('calls onSerachSubmit on button submit clicked',()=>{
  render(<SearchForm {...searchFormProps}/>);
  fireEvent.submit(screen.getByRole('button'));
   expect(searchFormProps.onSearchSubmit).toHaveBeenCalledTimes(1);
});

test('renders snapshot',()=>{
  const {container} =render(<SearchForm {...searchFormProps}/>);
  expect(container.firstChild).toMatchSnapshot();
})

});



