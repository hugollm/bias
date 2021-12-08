ReactDOM.render(<Main/>, document.getElementById('main'));

function Main() {
    let [state, setState] = React.useState({
        criteria: {
            'Margin': {name: 'Margin', weight: 5},
            'Dividends': {name: 'Dividends', weight: 4},
            'Expectation': {name: 'Expectation', weight: 4},
            'Safety': {name: 'Safety', weight: 4},
        },
        options: {
            'B3SA3': {name: 'B3SA3', scores: {'Margin': 2, 'Dividends': 3, 'Expectation': 5, 'Safety': 4}},
            'BBAS3': {name: 'BBAS3', scores: {'Margin': 5, 'Dividends': 4, 'Expectation': 4, 'Safety': 5}},
            'WIZS3': {name: 'WIZS3', scores: {'Margin': 4, 'Dividends': 5, 'Expectation': 4, 'Safety': 3}},
            'JHSF3': {name: 'JHSF3', scores: {'Margin': 5, 'Dividends': 5, 'Expectation': 5, 'Safety': 1}},
            'ITSA4': {name: 'ITSA4', scores: {'Margin': 4, 'Dividends': 5, 'Expectation': 4}},
        },
        ranking: ['B3SA3', 'BBAS3', 'WIZS3', 'JHSF3', 'ITSA4'],
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
        <NewForm/>
        <CritList state={state} setState={setState}/>
    </section>
}

function NewForm() {
    return <form>
        <input type="text"/>
        <button type="submit">ADD</button>
    </form>
}

function CritList({ state, setState }) {
    return <ul>
        {Object.keys(state.criteria).map(name => <CritCard
            key={name} crit={state.criteria[name]} setState={setState}
        />)}
    </ul>
}

function CritCard({ crit, setState }) {
    return <li className="crit-card">
        <h3>{crit.name}</h3>
        <div>
            <label>Weight </label>
            {[1, 2, 3, 4, 5, 6, 7].map(n => {
                return <input key={n} name={crit.name} type="radio" value={n}
                    defaultChecked={(crit.weight || 5) == n}/>
            })}
        </div>
    </li>
}

function OptionSection({ state, setState }) {
    return <section>
        <h2>Options</h2>
        <NewForm/>
        <OptionList state={state} setState={setState}/>
    </section>
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
                return <input key={n} name={option.name + '|' + critName} type="radio" value={n}
                    defaultChecked={(option.scores[critName] || 5) == n}/>
            })}
        </div>)}
    </li>
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
