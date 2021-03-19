import React, { Component } from 'react';

class AboutPage extends Component {
    render() {
        return (
            <div className="aboutpage">
                <section>
                    <h2>What is mindfulness?</h2>
                    <p>Mindfulness is simply being fully present in the moment. You aren't dwelling over past events, you aren't worrying about the future, you are just experiencing the NOW. </p>
                    <p>Sometimes it's easy to get caught up in our thoughts and to start living on autopilot mode. It might be easy and comfortable to live this way, but it's not very fulfilling. Practicing mindfulness can help you take back the wheel and switch off the "cruise control".</p>
                    <p>Take a moment and pause. Are you aware of the sights around you? The sounds? What about the smells? Take it all in! What are you thinking about right now? How are you feeling? By making these observations, you are practicing mindfulness right now!</p>
                    <h3>So why should I practice it?</h3>
                    <p>The benefits of mindfulness practice are numerous and include reducing stress levels and gaining control over our emotions. Have you ever lost your cool when you were angry? Mindfulness can help us identify our emotions and our responses to these emotions. By increasing this awareness, we can understand why we act a certain way and prepare new, healthier strategies for when we are in the heat of the moment.</p>
                    <p>A mindfulness journal is one simple way to automatically start increasing your awareness and help ground you in the present moment!</p>
                </section>
                <hr></hr>
                <section>
                    <h2>How are you feeling?</h2>
                    <p>We all experience different moods, and while we can't always control how we are feeling, we can keep track of our moods as a sort of mental health checkup. By monitoring our moods, we can see when things are "off" and take actions as needed. </p>
                    <p>For your journal entries, you will be asked to identify your primary mood for the day. Although there are many ways to break down and categorize our feelings, we will be focusing on the following seven basic moods for our entries:</p>
                    <ol>
                        <li> Excited</li>
                        <li> Happy</li>
                        <li> Calm</li>
                        <li> Bored</li>
                        <li> Sad</li>
                        <li> Nervous</li>
                        <li> Angry</li>
                    </ol>
                </section>
                <hr></hr>
                <section>
                    <h2>Tips / Exercises</h2>
                    <p>Want more? Here are some additional mindfulness practices you can try out:</p>
                    <ul>
                        <li>Sensory Meditation: go through all five senses one by one. Identify what you are experiencing for each sense (taste, touch, smell, sight, sound)</li>
                        <li>Take a hike in the woods. Pay close attention to your surroundings, especially when your mind starts to wander</li>
                        <li>Focus on only your breathing for a minute straight</li>
                        <li>Listen to a song. Try to identify all the different instruments being played. Focus on how the song makes you feel</li>
                        <li>Practice mindful eating. Turn off the TV and any other distractions. Focus on the taste, smell, and texture of each bite</li>
                    </ul>
                </section>
                <hr></hr>
                <section>
                    <h2>Disclaimer</h2>
                    <p>This app is not intended to treat or prevent any mental health condition. This should only be used as a supplemental tool and not as a replacement for professional help. </p>
                </section>
            </div>
        )
    }
}

export default AboutPage;