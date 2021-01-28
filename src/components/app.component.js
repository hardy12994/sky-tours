import '../index.css';

const keysToDisplay = {
  people: ['name', 'height'],
  planets: ['name', 'population'] 
}

const AppComponent = (props) => {
  const {
    activeCategory, changeCategoryHandler, history,
    categoryItems, pageNumber, totalPages, pageShiftHandler,
    totalCount, isLoading, searchText, searchHandler,
    categories,
  } = props;
  const keysVisible = keysToDisplay[activeCategory] || [];
  const isPeoplePresentInSearchedResult = categories.includes('peoples');
  const isPlanetsPresentInSearchedResult = categories.includes('planets');

  if (isLoading) {
    return (
      <div className="inCenter">
        <div className="loader"/>
      </div>
    );
  }

  const capsFirstLetterOfWord = (word = '') => {
    if (!word) return;
    return word.trim().replace('_',' ').replace(/^./, word[0].toUpperCase());
  };

  const redirectToDetail = (index) => {
    const pageSize = 10;
    const itemId = ((pageNumber - 1) * pageSize) + (index + 1);
    history.push(`/${activeCategory}/${itemId}`);
  }

  return (
    <div className="app">
      <div id="head">
        <input 
          placeholder="Search Category"
          value={searchText}
          onChange={searchHandler}
          id="search"
        />
        {isPeoplePresentInSearchedResult && <button
          onClick={() => changeCategoryHandler('people')}
          className={activeCategory === 'people' ? "btn btnActive" : "btn"}>
          Peoples
        </button>}
        {isPlanetsPresentInSearchedResult && <button
          onClick={() => changeCategoryHandler('planets')}
          className={activeCategory === 'planets' ? "btn btnActive" : "btn"} >
          Planets
        </button>}
      </div>
      <h3 id="subHeading">
        {capsFirstLetterOfWord(activeCategory) + ' List '}
        <small>({totalCount} Records)</small>
      </h3>
      <div id="categoryData">
        <table className="table">
          <thead>
            <tr>
              {keysVisible.map((item, index) => 
                <th key={index}>{capsFirstLetterOfWord(item)}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {categoryItems.map((item, index) =>
              <tr key={index} className="dataRows" onClick={() => redirectToDetail(index)}>
                {keysVisible.map((key, index) => 
                  <td key={index}>{capsFirstLetterOfWord(item[key])}</td>
                )}
              </tr>
            )}
          </tbody>
        </table>
        <div id="pagination">
          <button
            disabled={pageNumber === 1}
            onClick={() => pageShiftHandler(-1)}
            className={pageNumber !== 1 ? "havePage paginationBtn" : "paginationBtn"}
          >
            Previous
          </button>
          <button
            disabled={pageNumber === totalPages}
            onClick={() => pageShiftHandler(1)}
            className={pageNumber !== totalPages ? "havePage paginationBtn" : "paginationBtn"}
          >
            Next
          </button>
        </div> 
      </div>
    </div>
  );
}

export default AppComponent;
