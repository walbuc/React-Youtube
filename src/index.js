import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash'
import Search from './components/search_bar'
import YTSearch from 'youtube-api-search'
import VideoList from './components/video_list'
import VideoDetail from './components/video_detail'

const API_KEY = 'AIzaSyDejtsRDWuEnPTZiWxhlnHR9xOiurWTH4U'

class App extends Component {
    constructor(props) {
      super()
      this.state = {
        videos: [],
        selectedVideo: null
      }
      this.videoSearch('surfboards')
    }

    videoSearch(term){
      YTSearch({key: API_KEY, term}, (videos) => {
        this.setState({
          videos: videos,
          selectedVideo: videos[0]
        })
      })
    }

    render() {
      const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300)
        return (
        <div>
          <h2 className="display-3">Real Time Youtube Search</h2>
          <Search onSearchTermChange={ videoSearch }/>
          <VideoDetail video={ this.state.selectedVideo } />
          <VideoList onVideoSelect={ selectedVideo => this.setState({selectedVideo})} videos={ this.state.videos } />
        </div>
      )
    }
}

ReactDOM.render(<App />, document.querySelector('.container'))
