import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
export class News extends Component {
  static defaultProps = {
    country:'in',
    category:'general'
  }
  static propTypes = {
    country:PropTypes.string,
    category:PropTypes.string
  }
    constructor(){
    super();
    this.state={
      articles: [],
      loading:false,
      page:1
    }
  }
  async componentDidMount(){ 
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=db51c76a95e14749a8399eebedee439e&page=1&pageSize=18`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData); 
    this.setState({
    articles: parsedData.articles, 
    totalResults : parsedData.totalResults,
    loading:false
  });
}

 handleprevclick = async ()=>{
    console.log("Previous");
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=db51c76a95e14749a8399eebedee439e&page=${this.state.page - 1}&pageSize=18`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);  
    this.setState({
        page: this.state.page - 1,
        articles: parsedData.articles,
        loading:false
    })

}

 handlenextclick = async ()=>{
    console.log("Next"); 
    if (this.state.page + 1 > Math.ceil(this.state.totalResults/18)){

    }
    else{
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=db51c76a95e14749a8399eebedee439e&page=${this.state.page + 1}&pageSize=18`;
        this.setState({loading:true});
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);  
        this.setState({
            page: this.state.page + 1,
            articles: parsedData.articles,
            loading:false
        })
}
}
  render() {
    return (
      <div className='container my-3'>
        <h1 className='text-center'>News App - Top Headlines</h1>
        {/* {this.state.articles.map((element)=>{console.log(element)})} */}
        {this.state.loading && <Spinner/>}
        <div className="row">
        {!this.state.loading && this.state.articles.map((element)=>{
             return <div className="col-md-4" key = {element.url}>
                  <NewsItem title = {element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl = {element.url}/>
            </div>
        })}
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handleprevclick}>&larr; Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/18)} type="button" className="btn btn-dark"   onClick={this.handlenextclick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
