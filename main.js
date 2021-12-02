ReactDOM.render(<Main/>, document.getElementById('main'));

function Main() {
    return <main>
        <CritSection/>
        <OptionSection/>
        <RankedSection/>
    </main>
}

function CritSection() {
    return <section>
        <h2>Criteria</h2>
        <NewForm/>
        <CritList/>
    </section>
}

function NewForm() {
    return <form>
        <input type="text"/>
        <button type="submit">ADD</button>
    </form>
}

function CritList() {
    return <ul>
        <CritCard/>
        <CritCard/>
        <CritCard/>
    </ul>
}

function CritCard() {
    return <li className="crit-card">
        <span>Margin </span>
        <input type="radio"/>
        <input type="radio"/>
        <input type="radio"/>
        <input type="radio"/>
        <input type="radio"/>
    </li>
}

function OptionSection() {
    return <section>
        <h2>Options</h2>
        <NewForm/>
        <OptionList/>
    </section>
}

function OptionList() {
    return <ul>
        <OptionCard/>
        <OptionCard/>
        <OptionCard/>
    </ul>
}

function OptionCard() {
    return <li className="option-card">
        <div>TSLA</div>
        <div>
            <span>Margin </span>
            <input type="radio"/>
            <input type="radio"/>
            <input type="radio"/>
            <input type="radio"/>
            <input type="radio"/>
        </div>
        <div>
            <span>Margin </span>
            <input type="radio"/>
            <input type="radio"/>
            <input type="radio"/>
            <input type="radio"/>
            <input type="radio"/>
        </div>
        <div>
            <span>Margin </span>
            <input type="radio"/>
            <input type="radio"/>
            <input type="radio"/>
            <input type="radio"/>
            <input type="radio"/>
        </div>
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
