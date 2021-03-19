import React, { Component } from 'react';

class HomePage extends Component {
    state = {
        error: null,
        quote: "",
        author: "",
    }

    componentDidMount(){
        fetch('http://quotes.rest/qod.json?category=inspire')
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
                    quote: data.contents.quotes[0].quote,
                    author: data.contents.quotes[0].author,
                })
            })
            .catch(error => {
                this.setState({ error })
            })
    }
    
    render() {
        return (
            <div className="homepage">
                <section>
                    <h2>mind·ful·ness</h2>
                    <p><small>/ˈmīn(d)f(ə)lnəs/</small></p>
                    <p>A mental state achieved by focusing one's awareness on the present moment, while calmly acknowledging and accepting one's feelings, thoughts, and bodily sensations.</p>
                    <h2>Welcome to mindFULL</h2>
                    <p>In an age of endless deadlines, constant distractions, and mountains of stress, we often forget to find the time to stop and smell the roses. Modern life can be overwhelming, but you have the power to slow down and start enjoying the day to day again through the practice of mindfulness. </p>
                    <p>mindFULL is here to help you to take a break, reflect on your day, and re-evaluate what's truly important in your life. With guided daily journal entries, you can get those racing thoughts out of your head and increase awareness of the present moment. Mindfulness is a skill you can develop over time, and by spending just a few minutes every day logging your journal entries, you will become a mindfulness master in no time! </p>
                    <p>Let's Get Started</p>
                </section>
                <section>
                    <button onClick={() => this.props.history.push('/entry')}>Link to Daily Entry</button>
                    <button onClick={() => this.props.history.push('/journal')}>Link to Journal</button>
                </section>
                <section>
                    <p><i>"{this.state.quote}"</i> - {this.state.author}</p>
                </section>
            </div>
        )
    }
}

export default HomePage;