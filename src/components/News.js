import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import NewsItems from './NewsItems'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroller';

const News = (props)=> {


 const [articles, setarticles] = useState([]) 
 const [loader, setloader] = useState(true)
 const [page, setpage] = useState(1)
 const [totalResults, settotalResults] = useState(0)

  News.defaultProps ={
country: "in",
category:"general"
  }

  News.propTypes ={
    country: PropTypes.string,
    category:PropTypes.string
  }

const capital = (string)=>{
  return string.charAt(0).toUpperCase() + string.slice(1);
} 
  
const update = async ()=>{
  props.setProgress(10)
  // const url = `https://newsdata.io/api/1/news?apikey=${props.apiKey}&country=${props.country}&category=${props.category}  &page=${page}&pageSize=5`;
  const url = ` https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}
  &page=${page}&pageSize=5`;
  setloader(true)
  let data = await fetch(url);
  props.setProgress(50)
  let parsedData = await data.json()
  props.setProgress(70)
  setarticles(parsedData.articles)
  settotalResults(parsedData.totalResults)
  setloader(false)

props.setProgress(100)
}

useEffect(() => {
  update()
document.title = `${capital(props.category)}  Z+News`

}, [])


 const next =  async()=>{
update()
setpage(page + 1)

    }

  const  prev = async()=>{
    update()
    setpage(page + 1)

    }

 const   loadFunc = async()=> {
   const url =   ` https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}
   &page=${page+1}&pageSize=5`;
   setpage(page + 1)
  let data = await fetch(url);
  let parsedData = await data.json()
  setarticles(articles.concat(parsedData.articles))
  settotalResults(parsedData.totalResults)
  setloader(false)

}; 
    
    return (
      <div className='container my-3'>
        <h2>Top Headlines</h2>
       {loader && <Loader/> } 
       {/* <InfiniteScroll
    pageStart={articles.length}
    loadMore={loadFunc}
    hasMore={articles.length !== totalResults}
    loader={<Loader/>}
> */}


        <div className="row my-5">

        {!loader && articles.map((elem)=>{
        return    <div className="col-md-4" key={elem.url} >
          <NewsItems title={elem.title.slice(0,100)} 
           description = {elem.description}
             imageurl = {elem.urlToImage}
              newsUrl ={elem.url} 
              author={elem.author} 
              date={elem.publishedAt}
              source={elem.source.name} />
             
            </div>
            })}

      
   
          </div>
          {/* </InfiniteScroll> */}
             <div className="container d-flex justify-content-between">
              <button disabled={page<=1} className='btn btn-dark' onClick={prev}> &larr; Previous</button>
              <button disabled={page + 1 > Math.ceil(totalResults/5)} className='btn btn-dark' onClick={next}>Next  &rarr;</button>
             </div>
      </div>
    )
  
}

export default News