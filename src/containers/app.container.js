import React from 'react';
import AppComponent from "../components/app.component";

class AppContainer extends React.Component {
  state = {
    activeCategory: 'people',
    baseURL: 'https://swapi.py4e.com/api/',
    categories: ['peoples', 'planets'],
    categoryItems: [],
    pageNumber: 1,
    totalPages: 0, 
    totalCount: 0,
    isLoading: true,
    searchText: '',
  };

  componentDidMount() {
    this.fetchData();
  }

  searchHandler = (e) => {
    const { value = '' } = e.target;
    const searchFrom = ['peoples', 'planets'];
    const getSearchedResults = [...searchFrom.filter(item => item.includes(value.toLowerCase()))];
    const categories = value === '' ? searchFrom : getSearchedResults;

    this.setState({
      searchText: value,
      categories
    });
  }

  fetchData = () => {
    const { baseURL, activeCategory, pageNumber } = this.state;
    const apiURL = `${baseURL}${activeCategory}?page=${pageNumber}`;
    
    fetch(apiURL)
      .then(res => res.json())
      .then(data => {
        const totalPages = data.count % 10 > 0 ? ((data.count - (data.count % 10)) / 10 ) + 1 : ((data.count - (data.count % 10)) / 10 );
        this.setState({ 
          categoryItems: data.results, 
          totalCount: data.count,
          totalPages, 
          isLoading: false,
        });
      })
      .catch(err => {
        this.setState({ 
          isLoading: false
        });
        console.error(err);
        alert('ERROR on fetching category data.');
      })
  }

  // action will be +1 or -1
  pageShiftHandler = (action) => {
    this.setState({
      pageNumber: (this.state.pageNumber + action),
      isLoading: true,
    }, () => this.fetchData());
  }

  changeCategoryHandler = (category) => {
    this.setState({
      activeCategory: category,
      pageNumber: 1, // back to default
      totalPages: 0,
      isLoading: true
    }, () => this.fetchData());
  }
  
  render() {
    const props = {
      changeCategoryHandler: this.changeCategoryHandler,
      pageShiftHandler: this.pageShiftHandler,
      searchHandler: this.searchHandler,
      activeCategory: this.state.activeCategory,
      categoryItems: this.state.categoryItems,
      totalCount: this.state.totalCount,
      pageNumber: this.state.pageNumber,
      totalPages: this.state.totalPages,
      history: this.props.history,
      isLoading: this.state.isLoading,
      searchText: this.state.searchText,
      categories: this.state.categories,
    }

    return <AppComponent {...props} />
  }
}

export default AppContainer;