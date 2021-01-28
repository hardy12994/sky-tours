
const keysToDisplay = {
  people: ['name', 'height', 'skin_color', 'birth_year', 'eye_color', 'gender', 'hair_color', 'height', 'mass'],
  planets: ['name', 'climate', 'population', 'rotation_period', 'orbital_period', 'diameter', 'gravity', 'surface_water'] 
}

const DetailComponent = (props) => {
  const { categoryItem, categoryType, history, isLoading } = props;
  const keysVisible = keysToDisplay[categoryType] || [];
  
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

  return (
    <div>
      <h3 id="subHeading">
        {capsFirstLetterOfWord(categoryItem.name)}&nbsp;
        <small>({capsFirstLetterOfWord(categoryType)} Category)</small>
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
            <tr className="dataRows">
              {keysVisible.map((key, index) => 
                <td key={index}>{capsFirstLetterOfWord(categoryItem[key])}</td>
              )}
            </tr>
          </tbody>
        </table>
        <div id="pagination">
          <button
            onClick={() => history.goBack()}
            className="havePage paginationBtn"
          >
            Go Back
          </button>
        </div> 
      </div>
    </div>
  );
}

export default DetailComponent;