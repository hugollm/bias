ReactDOM.render(<Main/>, document.getElementById('main'));

function Main() {
    let [criteria, setCriteria] = React.useState([
        {name: 'Margin', score: 5},
        {name: 'Dividends', score: 4},
        {name: 'Expectation', score: 4},
        {name: 'Safety', score: 4},
    ]);
    let [options, setOptions] = React.useState([
        {name: 'B3SA3', scores: {'Margin': 2, 'Dividends': 3, 'Expectation': 5, 'Safety': 4}},
        {name: 'BBAS3', scores: {'Margin': 5, 'Dividends': 4, 'Expectation': 4, 'Safety': 5}},
        {name: 'WIZS3', scores: {'Margin': 4, 'Dividends': 5, 'Expectation': 4, 'Safety': 3}},
        {name: 'JHSF3', scores: {'Margin': 5, 'Dividends': 5, 'Expectation': 5, 'Safety': 1}},
        {name: 'ITSA4', scores: {'Margin': 4, 'Dividends': 5, 'Expectation': 4}},
    ]);
    return <main>
        <CritSection criteria={criteria} setCriteria={setCriteria}/>
        <OptionSection options={options} setOptions={setOptions} criteria={criteria}/>
        <RankedSection/>
    </main>
}

function CritSection({ criteria, setCriteria }) {
    return <section>
        <h2>Criteria</h2>
        <NewForm/>
        <CritList criteria={criteria}/>
    </section>
}

function NewForm() {
    return <form>
        <input type="text"/>
        <button type="submit">ADD</button>
    </form>
}

function CritList({ criteria }) {
    return <ul>
        {criteria.map(crit => <CritCard key={crit.name} crit={crit}/>)}
    </ul>
}

function CritCard({ crit }) {
    return <li className="crit-card">
        <h3>{crit.name}</h3>
        <div>
            <label>Weight </label>
            <input name={crit.name} type="radio" value={1} defaultChecked={(crit.score || 3) == 1}/>
            <input name={crit.name} type="radio" value={2} defaultChecked={(crit.score || 3) == 2}/>
            <input name={crit.name} type="radio" value={3} defaultChecked={(crit.score || 3) == 3}/>
            <input name={crit.name} type="radio" value={4} defaultChecked={(crit.score || 3) == 4}/>
            <input name={crit.name} type="radio" value={5} defaultChecked={(crit.score || 3) == 5}/>
        </div>
    </li>
}

function OptionSection({ options, setOptions, criteria }) {
    return <section>
        <h2>Options</h2>
        <NewForm/>
        <OptionList options={options} criteria={criteria}/>
    </section>
}

function OptionList({ options, criteria }) {
    return <ul>
        {options.map(option => <OptionCard key={option.name} option={option} criteria={criteria}/>)}
    </ul>
}

function OptionCard({ option, criteria }) {
    return <li className="option-card">
        <h3>{option.name}</h3>
        {criteria.map(crit => <div key={crit.name}>
            <label>{crit.name} </label>
            <input name={option.name + '|' + crit.name} type="radio" value={1} defaultChecked={(option.scores[crit.name] || 3) == 1}/>
            <input name={option.name + '|' + crit.name} type="radio" value={2} defaultChecked={(option.scores[crit.name] || 3) == 2}/>
            <input name={option.name + '|' + crit.name} type="radio" value={3} defaultChecked={(option.scores[crit.name] || 3) == 3}/>
            <input name={option.name + '|' + crit.name} type="radio" value={4} defaultChecked={(option.scores[crit.name] || 3) == 4}/>
            <input name={option.name + '|' + crit.name} type="radio" value={5} defaultChecked={(option.scores[crit.name] || 3) == 5}/>
        </div>)}
    </li>
}

function RankedSection() {
    return <section>
        <h2>Ranking</h2>
        <RankedList/>
    </section>
}

function RankedList() {
    return <ol>
        <li>FB</li>
        <li>AMZN</li>
        <li>BABA</li>
        <li>AAPL</li>
        <li>TSLA</li>
    </ol>
}
