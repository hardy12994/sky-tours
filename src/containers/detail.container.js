import React from 'react';
import DetailComponent from "../components/detail.component";

class DetailContainer extends React.Component {
  state = {
    baseURL: 'https://swapi.py4e.com/api/',
    categoryItem: {},
    isLoading: true,
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    const { categoryId, categoryType } = this.props.match.params;
    const prevCategoryType = prevProps.match.params.categoryType;
    const prevCategoryId = prevProps.match.params.categoryId;

    if (categoryId !== prevCategoryId || categoryType !== prevCategoryType) {
      // fetch on updating of id or type
      this.setState({ isLoading: true }, () => this.fetchData());
    }
  }

  fetchData = () => {
    const { baseURL } = this.state;
    const { categoryId, categoryType } = this.props.match.params;
    const apiURL = `${baseURL}${categoryType}/${categoryId}`;

    fetch(apiURL)
      .then(res => res.json())
      .then(data => {
        this.setState({ 
          categoryItem: data, 
          isLoading: false
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

  render () {
    const { history } = this.props;
    const { categoryItem, isLoading } = this.state;
    const { categoryId, categoryType } = this.props.match.params;
    const props = {
      categoryId,
      categoryType,
      categoryItem,
      history,
      isLoading
    };

    return <DetailComponent {...props} />
  }
}

export default DetailContainer;