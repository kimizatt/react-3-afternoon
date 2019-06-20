import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import Post from './Post/Post'
import Header from './Header/Header';
import Compose from './Compose/Compose';
import { SSL_OP_TLS_BLOCK_PADDING_BUG } from 'constants';
import { toast } from 'react-toastify';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios.get('https://practiceapi.devmountain.com/api/posts')
    .then( results => {
      console.log(results)
      this.setState({ posts: results.data})
    })
    .catch( error => toast.error('Error'))
  }

  updatePost(id, text) {
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, {text})
    .then( results => {
      console.log('Results in updatePost ', results)
      this.setState({
        posts: results.data 
      })
    })
    .catch( error => toast.error('Error'))
  }

  deletePost(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`)
    .then (results => {
    console.log('Results in deletePost')
    this.setState({
      posts: results.data
    })
    })
  }

  createPost(text) {
    axios.post(`https://practiceapi.devmountain.com/api/posts`, {text})
    .then( results => {
      this.setState({ 
        posts: results.data
    })
    })

  }

  render() {
    const { posts } = this.state;
    // console.log(posts)
    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose createPostFn={this.createPost}/>

          {
            posts.map(post => (
              <Post key={post.id}
                    text={post.text}
                    date={post.date} 
                    id={post.id}
                    updatePostFn = {this.updatePost}
                    deletePostFn = {this.deletePost}/>
            ))
          } 
          
        </section>
      </div>
    );
  }
}

export default App;
