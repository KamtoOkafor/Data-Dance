import React, { Component } from 'react';
import "../css/home.css"

class Home extends Component {
    constructor() {
        super();
        this.state = {
          songData: [
                { song: "Hallelujah", artist: "Chief Keef", producer: "Young Chop", album: "Finally Rich", link:"https://www.youtube.com/watch?v=uHo_XKH_iTY"},
                { song: "Overtime", artist: "Nipsey Hussle", producer: "Ralo Stylez & 1500 or Nothin’", album: "Mailbox Money", link:"https://www.youtube.com/watch?v=BXff-FgNdy4"},
                { song: "Legal Money", artist: "ElCamino", producer: "38 Spesh", album: "Martyr's Prayer", link:"https://www.youtube.com/watch?v=gJFBOkSVJiI"},
                { song: "Dropout", artist: "Maxo Kream & OMB Bloodbath", producer: "BBY KODIE", album: "N/A", link:"https://www.youtube.com/watch?v=NNt9IQlGT9A"},
                { song: "Lifetime Income", artist: "Larry June", producer: "Jake One", album: "Numbers", link:"https://www.youtube.com/watch?v=luIhlZBrJos"},
                { song: "Mr. T", artist: "Westside Gunn", producer: "Apollo Brown", album: "FLYGOD", link:"https://www.youtube.com/watch?v=kiZWaWXubIw"},
                { song: "MOOD", artist: "Lex Amor", producer: "False Ego", album: "N/A", link:"https://youtu.be/qG-wifcSuAM"},
                { song: "Pray", artist: "Al-Doms", producer: "FAKE UZUMI", album: "N/A", link:"https://www.youtube.com/watch?v=Ood48zrJO10"},
                { song: "Neighbourhood", artist: "DC (UK)", producer: "TobiShyBoy", album: "In The Loop", link:"https://youtu.be/zSIB9EEynh4"},
                { song: "Malaysia ft Larry June", artist: "Premo Rice", producer: "N/A", album: "A Night at the Chateau", link:"https://www.youtube.com/watch?v=yWY6DIqh5UU"},
                { song: "Mac Roni", artist: "Cousin Stizz", producer: "Young Fyre", album: "N/A", link:"https://www.youtube.com/watch?v=H_Yegr1FGZI"},
                { song: "What Typa Time", artist: "Woodie Smalls", producer: "Tedd Boyd", album: "In Between Spaces", link:"https://youtu.be/hS2Z0JjhIW8"},
            ],
        }
    }

    componentDidMount() { 
       try {
            this.postData(this.state.songData)
       } catch (err) {
            console.log("this is the error: " + err)
       }
    }

    postData(data) {
        // event.preventDefault();
        let options ={
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        }

        return fetch('http://localhost:3001/datadance/postinfo/', options)
            .then(res=> res.json())
            .then(info=> {
                console.log(info)
            })
            // .catch(err => console.log(err))
    }

    render() {
        return (
            <div className="back">
    
               <div className="container">
                    <div className="child">Welcome to Data Dance <br /> </div>
                    <div className="sub"> <br/><br/> Where your music data comes to life </div>
                </div>
      
                <div className="footer">
                    <p> Music Make you Lose Control </p>
                </div>
            </div>
        )
    }
}

export default Home
