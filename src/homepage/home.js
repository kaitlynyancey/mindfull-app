import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSeedling, faHandSparkles } from '@fortawesome/free-solid-svg-icons';

class HomePage extends Component {
    state = {
        error: null,
        quote: "",
        author: "",
    }

    componentDidMount() {
        const proxy = ` https://murmuring-scrubland-19112.herokuapp.com/`
        fetch(proxy + 'https://zenquotes.io/api/today')
            .then(res => {
                if (!res.ok) {
                    // get the error message from the response,
                    return res.json().then(error => {
                        // then throw it
                        throw error
                    })
                }
                return res.json()
            })
            .then(data => {
                this.setState({
                    quote: data[0].q,
                    author: data[0].a,
                })
            })
            .catch(error => {
                this.setState({ error })
            })
    }

    render() {
        //get font awesome icons
        const wave = <FontAwesomeIcon icon={faHandSparkles} />
        const seedling = <FontAwesomeIcon icon={faSeedling} />

        return (
            <div className="homepage wrapper fade-in">
                <div className="intro">
                    <section>
                        <h2>{wave} Welcome to mindFULL</h2>
                        <p>In an age of endless deadlines, constant distractions, and mountains of stress, we often forget to find the time to stop and smell the roses. Modern life can be overwhelming, but you have the power to slow down and start enjoying the day to day again through the practice of mindfulness. </p>
                    </section>
                    <section>
                        <p>mindFULL is here to help you take a break, reflect on your day, and re-evaluate what's truly important in your life. With guided daily journal entries, you can get racing thoughts out of your head and increase awareness of the present moment. Mindfulness is a skill you can develop over time, and by spending just a few minutes every day logging your journal entries, you will become a mindfulness master in no time. </p>
                        <br></br>
                        <p>{seedling}<b>Let's Get Started!</b></p>
                        <ul>
                            <li><b>Step 1 (optional):</b> Create a new user account by clicking the "Login | Signup" button in the top right corner if you want to save your personal entries. Otherwise, feel free to play around in demo mode to get a feel for the app. You can access all features of the app in demo mode!</li>
                            <li><b>Step 2:</b> Click on the "Link to Entry" button to access the daily journal entry form. Fill out all the fields and hit "Submit" to save the entry to your journal.</li>
                            <li><b>Step 3:</b> Access your journal at anytime to view your progress and re-visit previously saved journal entries. Click on "Link to Journal" below or the "Journal" link in the navigation bar.</li>
                            <li><b>Step 4:</b> Be mindFULL!</li>
                        </ul>

                    </section>
                    <section className="center">
                        <button onClick={() => this.props.history.push('/entry')}>Link to Entry</button>
                        <button onClick={() => this.props.history.push('/journal')}>Link to Journal</button>
                    </section>
                </div>
                <br></br>
                <section className="center">
                    <p><b>Quote of the day...</b></p>
                    <p><i>{this.state.quote}</i> - {this.state.author}</p>
                    <p><small>Inspirational quotes provided by <a href="https://zenquotes.io/" target="_blank" rel="noreferrer" >ZenQuotes API</a></small></p>
                </section>
            </div>
        )
    }
}

export default HomePage;