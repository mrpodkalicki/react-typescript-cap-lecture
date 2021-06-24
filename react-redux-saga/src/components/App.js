import {useState} from 'react';
import {connect} from 'react-redux';
import {addItemRequest, resetList} from '../actions/handleToDoList';


function App({toDoListState, addItemRequest, resetList}) {

    const [value, setValue] = useState('');

    return (
        <div className="App">
          <header className="App-header">
              <input value={value} onChange={(e) => setValue(e.currentTarget.value)} />
              <button onClick={() => addItemRequest(value)}>Add item</button>
              <button onClick={() => resetList()}>Reset list</button>
          </header>
            {
                toDoListState.loadingStatus ?
                    <div>loading...</div>
                    :
                    <div>
                        <div>{toDoListState.error + ''}</div>
                        <ul>
                            {toDoListState.listItem ? toDoListState.listItem.map((item, index) => {
                                return <li key={index}>{item}</li>
                            }) : ''}
                        </ul>
                    </div>
            }
        </div>
  );
}

const mapStateToProps = state => {
    return {toDoListState: state.toDoList,}
}

const mapDispatchToProps = (dispatch) => ({
    addItemRequest: (item) => dispatch(addItemRequest(item)),
    resetList: () => dispatch(resetList())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
