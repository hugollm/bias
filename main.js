ReactDOM.render(<Main/>, document.getElementById('main'));

function Main() {
    let [state, setState] = React.useState({ criteria: {}, options: {}, ranking: [] });
    React.useEffect(() => restoreState(setState), []);
    return <main>
        <section className="left-section">
            <CritSection state={state} setState={setState}/>
            <RankedSection state={state}/>
        </section>
        <section className="right-section">
            <OptionSection state={state} setState={setState}/>
        </section>
    </main>
}

function CritSection({ state, setState }) {
    return <section className="crit-section">
        <h2>Criteria</h2>
        <NewForm onSubmit={e => onSubmitNewCrit(e, state, setState)}/>
        <CritList state={state} setState={setState}/>
    </section>
}

function NewForm({ onSubmit }) {
    return <form onSubmit={e => {
        e.preventDefault();
        onSubmit(e);
    }}>
        <input type="text"/>
        <button type="submit">ADD</button>
    </form>
}

function onSubmitNewCrit(e, state, setState) {
    let critName = e.target.children[0].value;
    e.target.children[0].value = '';
    state.criteria[critName] = {name: critName, weight: 4};
    Object.keys(state.options).map(optName => {
        state.options[optName].scores[critName] = 4;
    });
    updateRanking(state, setState);
}

function CritList({ state, setState }) {
    return <ul>
        {Object.keys(state.criteria).sort().map(name => <CritCard
            key={name} crit={state.criteria[name]} state={state} setState={setState}
        />)}
    </ul>
}

function CritCard({ crit, state, setState }) {
    return <li className="crit-card">
        <h3>{crit.name} <i onClick={() => deleteCrit(crit, state, setState)}>🗑</i></h3>
        <div>
            <label>Weight </label>
            {[1, 2, 3, 4, 5, 6, 7].map(n => {
                return <input key={n} name={crit.name} type="radio"
                    value={n} defaultChecked={(crit.weight || 5) == n}
                    onChange={e => onChangeCritWeight(crit, n, state, setState)}
                />
            })}
        </div>
    </li>
}

function deleteCrit(crit, state, setState) {
    delete state.criteria[crit.name];
    updateRanking(state, setState);
}

function onChangeCritWeight(crit, weight, state, setState) {
    state.criteria[crit.name].weight = weight;
    updateRanking(state, setState);
}

function OptionSection({ state, setState }) {
    return <section className="option-section">
        <h2>Options</h2>
        <NewForm onSubmit={e => onSubmitNewOption(e, state, setState)}/>
        <OptionList state={state} setState={setState}/>
    </section>
}

function onSubmitNewOption(e, state, setState) {
    let optName = e.target.children[0].value;
    e.target.children[0].value = '';
    state.options[optName] = {name: optName, scores: {}};
    Object.keys(state.criteria).map(critName => state.options[optName].scores[critName] = 4);
    updateRanking(state, setState);
}

function OptionList({ state, setState }) {
    return <ul>
        {Object.keys(state.options).sort().map(name => <OptionCard
            key={name} option={state.options[name]} state={state} setState={setState}
        />)}
    </ul>
}

function OptionCard({ option, state, setState }) {
    return <li className="option-card">
        <h3>{option.name} <i onClick={() => deleteOption(option, state, setState)}>🗑</i></h3>
        {Object.keys(state.criteria).sort().map(critName => <div key={critName}>
            <label>{critName} </label>
            {[1, 2, 3, 4, 5, 6, 7].map(n => {
                return <input key={n} name={option.name + '|' + critName} type="radio"
                    value={n} defaultChecked={(option.scores[critName] || 5) == n}
                    onChange={e => onChangeOptionScore(option, critName, n, state, setState)}
                />
            })}
        </div>)}
    </li>
}

function deleteOption(option, state, setState) {
    delete state.options[option.name];
    updateRanking(state, setState);
}

function onChangeOptionScore(option, critName, score, state, setState) {
    state.options[option.name].scores[critName] = score;
    updateRanking(state, setState);
}

function RankedSection({ state }) {
    return <section className="ranked-section">
        <h2>Ranking</h2>
        <hr/>
        <RankedList state={state}/>
    </section>
}

function RankedList({ state }) {
    return <ol>
        {state.ranking.map((name, i) => <li key={name}>
            {i+1}. {name} <small>({state.options[name].acc})</small>
        </li>)}
    </ol>
}

function updateRanking(state, setState) {
    Object.keys(state.options).map(optName => {
        let option = state.options[optName];
        option.acc = 0;
        Object.keys(state.criteria).map(critName => {
            option.acc += option.scores[critName] * state.criteria[critName].weight;
        });
    });
    let options = Object.keys(state.options).map(name => state.options[name]);
    state.ranking = options.sort((a, b) => b.acc - a.acc).map(option => option.name);
    setState(JSON.parse(JSON.stringify(state)));
    persistState(state);
    console.log('Ranking updated!', state);
}

function persistState(state) {
    localStorage.setItem('state', JSON.stringify(state));
}

function restoreState(setState) {
    let stateJson = localStorage.getItem('state');
    if (stateJson) {
        setState(JSON.parse(stateJson));
        console.log('State restored!');
    }
}
