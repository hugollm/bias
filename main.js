ReactDOM.render(<Main/>, document.getElementById('main'));

function Main() {
    let [state, setState] = React.useState({
        criteria: {},
        options: {},
        ranking: [],
    });
    return <main>
        <CritSection state={state} setState={setState}/>
        <OptionSection state={state} setState={setState}/>
        <RankedSection state={state}/>
    </main>
}

function CritSection({ state, setState }) {
    return <section>
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
        {Object.keys(state.criteria).map(name => <CritCard
            key={name} crit={state.criteria[name]} state={state} setState={setState}
        />)}
    </ul>
}

function CritCard({ crit, state, setState }) {
    return <li className="crit-card">
        <h3>{crit.name}</h3>
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

function onChangeCritWeight(crit, weight, state, setState) {
    state.criteria[crit.name].weight = weight;
    updateRanking(state, setState);
}

function OptionSection({ state, setState }) {
    return <section>
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
        {Object.keys(state.options).map(name => <OptionCard
            key={name} option={state.options[name]} state={state} setState={setState}
        />)}
    </ul>
}

function OptionCard({ option, state, setState }) {
    return <li className="option-card">
        <h3>{option.name}</h3>
        {Object.keys(state.criteria).map(critName => <div key={critName}>
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

function onChangeOptionScore(option, critName, score, state, setState) {
    state.options[option.name].scores[critName] = score;
    updateRanking(state, setState);
}

function RankedSection({ state }) {
    return <section>
        <h2>Ranking</h2>
        <RankedList state={state}/>
    </section>
}

function RankedList({ state }) {
    return <ol>
        {state.ranking.map((name, i) => <li key={name}>{i+1}. {name}</li>)}
    </ol>
}

function updateRanking(state, setState) {
    state.ranking = Object.keys(state.options).map(name => name);
    setState(JSON.parse(JSON.stringify(state)));
    console.log('Ranking updated!', state);
}
